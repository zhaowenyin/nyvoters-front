<template>
  <div class="question">
    <el-input
      placeholder="输入题目名称"
      maxlength="24"
      @input="search"
      v-model="questionName"></el-input>
    <ul>
      <li v-for="(item, index) in questionList" :key="'que' + index" @click="addQuestion(item)">
        <p class="question-content">{{item.name}}</p>
        <el-button type="text" @click.stop="del(item)" icon="el-icon-close"></el-button>
      </li>
    </ul>
    <div>
      <pagination @current-change="handleCurrentChange"
                  :current-page="currentPage"
                  :page-size="pageSize"
                  layout="total, prev, pager, next"
                  :total="total"></pagination>
    </div>
  </div>
</template>
<script>
import {getQuestions, deleteQuestion} from '../service'
import Pagination from '../../../components/Pagination'
import {mapState} from 'vuex'
export default {
  data () {
    return {
      questionName: '',
      pageSize: 10,
      currentPage: 1,
      total: 0,
      questionList: []
    }
  },
  created () {
    this.getList()
  },
  components: {
    Pagination
  },
  computed: {
    ...mapState('gauge', {
      renderTree: state => state.renderTree
    })
  },
  methods: {
    addQuestion (item) {
      let question = JSON.parse(item.question)
      let obj = {
        ...item,
        frontend_id: `${this.renderTree.maxIndex++}`,
        question,
        id: undefined,
        create_time: undefined,
        update_time: undefined
      }
      this.renderTree.pages[this.renderTree.currentIndex].push(obj)
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.getList()
    },
    search () {
      this.currentPage = 1
      this.getList()
    },
    async getList () {
      const {questionName, pageSize, currentPage} = this
      const params = {
        name: questionName,
        page_size: pageSize,
        page: currentPage - 1
      }
      const {data} = await getQuestions(params)
      this.questionList = data.data
      this.total = data.total_elements
    },
    del (item) {
      this.$confirm(`是否确认删除${item.name}`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.confirmDel(item)
      }).catch(() => {})
    },
    async confirmDel (item) {
      const {id} = item
      await deleteQuestion({id})
      this.getList()
      // const index = this.questionList.indexOf(item)
      // this.questionList.splice(index, 1)
    }
  }
}
</script>
<style scoped>
  .question {
    & ul {
      padding: 10px 0;
      & li {
        border: 1px solid #dcdfe6;
        padding: 10px;
        border-radius: 5px;
        margin-bottom: 10px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
      }
    }
  }
  .question-content {
    flex: 1;
    cursor: pointer;
  }
</style>
