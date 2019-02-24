<template>
  <div>
    <el-tabs
      v-model="activeName"
      type="border-card"
      class="tabs"
      @tab-click="handleClick">
      <el-tab-pane label="量表校验与计算" name="first">
        <div class="btn-box">
          <el-button @click="create(1)" class="btn">极值校验</el-button>
        </div>
        <div class="btn-box">
          <el-button @click="create(3)" class="btn">数值比较</el-button>
        </div>
        <div class="btn-box">
          <el-button @click="create(2)" class="btn">BMI</el-button>
        </div>
      </el-tab-pane>
      <el-tab-pane label="量表结果计算" name="second">
        <h3 class="result-title">当前脚本：</h3>
        <div>
          <el-input readonly v-model="oldName"></el-input>
        </div>
        <div class="result-table">
          <el-input
            placeholder="请输入脚本名称"
            maxlength="16"
            v-model="script_name"
            @input="search"></el-input>
          <ul>
            <li
              v-for="(item, index) in scriptList"
              @click="check(item)"
              class="script-item"
              :key="index">{{item.script_name}}</li>
          </ul>
        </div>
      </el-tab-pane>
    </el-tabs>
    <el-dialog center :visible.sync="showScript">
      <div class="script-dialog">
        <el-input type="textarea" readonly v-model="check_script" :rows="15"></el-input>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import {getScript} from '../service'
export default {
  data () {
    return {
      activeName: 'first',
      script_name: '',
      oldName: '',
      check_script: '',
      showScript: false,
      scriptList: []
    }
  },
  computed: {
    ...mapState('gauge', {
      renderTree: state => state.renderTree
    })
  },
  created () {
    this.search()
    this.oldName = this.renderTree.script_name
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
      if (tab.name === 'first') {
        this.$router.push('/gauge/script')
      } else if (tab.name === 'second') {
        this.$router.push('/gauge/script/result')
      }
    },
    check (item) {
      this.check_script = item.script
      this.showScript = true
    },
    create(type) {
      let obj = {
        type,
        items: []
      }
      this.renderTree.validate.push(obj)
    },
    async search () {
      const {script_name} = this
      const params = {
        name: script_name
      }
      const {data} = await getScript(params)
      this.scriptList = data
    }
  }
}
</script>
<style scoped>
  .tabs{
    height: 100%;
    box-shadow: inherit;
    overflow: auto;
  }
  .btn-box {
    margin-bottom: 20px;
  }
  .btn{
    width: 100%;
  }
  .result-title {
    text-align: center;
    margin-bottom: 5px;
  }
  .result-table {
    margin: 10px auto;
    & ul {
      padding: 10px 0;
      & li {
        border: 1px solid #dcdfe6;
        padding: 10px;
        border-radius: 5px;
        cursor: pointer;
        margin-bottom: 10px;
      }
    }
  }
  .script-dialog {
    overflow: auto;
    min-height: 300px;
  }
</style>
