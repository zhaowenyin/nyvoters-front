<template>
  <div>
    <el-tabs
      v-model="activeName"
      type="border-card"
      class="tabs"
      @tab-click="handleClick">
      <el-tab-pane label="题目组件" name="first">
        <div class="btn-box">
          <el-button @click="create(1)" class="btn">单选题</el-button>
        </div>
        <div class="btn-box">
          <el-button @click="create(2)" class="btn">多选题</el-button>
        </div>
        <div class="btn-box">
          <el-button @click="create(3)" class="btn">填空题</el-button>
        </div>
        <div class="btn-box">
          <el-button @click="create(4)" class="btn">数字填空题</el-button>
        </div>
        <div class="btn-box">
          <el-button @click="create(5)" class="btn">富文本</el-button>
        </div>
        <div class="btn-box">
          <el-button @click="create(6)" class="btn">签字板</el-button>
        </div>
        <div class="btn-box">
          <el-button @click="create(7)" class="btn">时间</el-button>
        </div>
        <div class="btn-box">
          <el-button @click="create(8)" class="btn">药品</el-button>
        </div>
      </el-tab-pane>
      <el-tab-pane label="题库" name="second">
        <question ref="question"></question>
      </el-tab-pane>
      <el-tab-pane label="标签" name="third">
        <tag></tag>
      </el-tab-pane>
      <el-tab-pane label="打印" name="fourth">
        <print></print>
      </el-tab-pane>
    </el-tabs>
    <CreateQuestion
      v-if="createVisible"
      :type="type"
      :visible.sync="createVisible"/>
  </div>
</template>

<script>
import CreateQuestion from './CreateQuestion'
import Question from './question'
import Tag from './label'
import Print from './print'

export default {
  data () {
    return {
      activeName: 'first',
      type: 1,
      createVisible: false
    }
  },
  computed: {

  },
  components: {
    CreateQuestion,
    Question,
    Tag,
    Print
  },
  created () {
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    create(type) {
      this.type = type
      this.createVisible = true
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
</style>
