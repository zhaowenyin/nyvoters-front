<template>
  <div v-loading="loading" class="view-wrapper">
    <div
      class="header-box">
      <el-menu
        :default-active="activeIndex"
        class="view-header"
        @select="change"
        mode="horizontal">
        <el-menu-item
          class="item"
          index="/gauge">
          量表
        </el-menu-item>
        <el-menu-item
          class="item"
          index="/gauge/script">
          脚本
        </el-menu-item>
        <el-menu-item class="item"
                      index="/gauge/show">显示跳转设置</el-menu-item>
      </el-menu>
      <p class="time" v-if="saveData.id">更新时间：{{updateTime}}</p>
      <el-button @click="save" class="btn" type="primary">保存</el-button>
      <el-button @click="back" class="back-btn">返回</el-button>
    </div>
    <router-view class="view-content" />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import {formatDateMinute} from "../../utils/format"

export default {
  data () {
    const {id = ''} = this.$route.query
    return {
      id
    }
  },
  computed: {
    ...mapState('gauge', {
      loading: state => state.loading,
      saveData: state => state.saveData
    }),
    updateTime () {
      const {saveData} = this
      return formatDateMinute(saveData.update_time)
    },
    activeIndex () {
      return this.$route.path
    }
  },
  watch: {
    'saveData.id' (val) {
      if (val) {
        this.id = val
        this.$router.push({path: '/gauge', query: {id: val}})
      }
    }
  },
  created () {
    const {id} = this
    this.getTagList()
    this.getMedicineList()
    this.getDefaultValue()
    if (id) {
      this.getGaugeContent({id})
    }
  },
  components: {
  },
  methods: {
    ...mapActions('gauge', [
      'createGaugeTemplate',
      'getGaugeContent',
      'getTagList',
      'getMedicineList',
      'getDefaultValue'
    ]),
    save () {
      const {saveData} = this
      if (saveData.id) {
        this.createGaugeTemplate({id: saveData.id})
      } else {
        this.createGaugeTemplate()
      }
    },
    back () {
      this.$router.push('/gaugeManage')
    },
    change (index) {
      const {id} = this
      this.$router.push({ path: index, query: {id} })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .view-wrapper {
    height: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
  }
  .uploadBtn{
    position: absolute;
    top: 10px;
    right: 30px;
  }
  .time {
    position: absolute;
    top: 10px;
    right: 200px;
    padding: 12px 20px;
  }
  .header-box{
    height: 60px;
    position: relative;
    & .btn{
      position: absolute;
      right: 100px;
      bottom: 10px;
    }
    & .back-btn {
      position: absolute;
      right: 20px;
      bottom: 10px;
    }
  }
  .view-header {
  }
  .view-content {
    flex: 1;
    overflow: auto;
  }
  .item{
    padding:0px 100px;
  }
</style>
