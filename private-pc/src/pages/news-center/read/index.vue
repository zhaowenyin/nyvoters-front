<template>
  <div class="news">
    <CommonNew :news="news" />
  <div
    v-show="total"
    class="add_pagination">
    <el-pagination
      @current-change="handleCurrentChange"
      :page-size="params.pageSize"
      background
      :current-page="params.pageNum"
      layout="prev, pager, next"
      :total="total" />
    </div>
  </div>
</template>
<script>
import { formatDate } from '../../../utils/format.js'
import {getNews} from '../service'
import CommonNew from '../../../components/CommonNew'
export default {
  data() {
    return{
      news: [],
      params: {
        pageNum: 1,
        pageSize: 20,
        isRead: 1,
      },
      total: 0,
      timer: null
    }
  },
  computed: {
  },
  components: {
    CommonNew
  },
  created () {
    this.timer = setInterval(() => {
      this.searchNews(this.params)
    }, 10000)
    this.searchNews({...this.params})
  },
  destroyed() {
    clearInterval(this.timer)
  },
  methods: {
    formatDate,
    async searchNews(val){
      const {data} = await getNews(val)
      this.news = data.content.data
      this.total=data.content.total
    },
    handleCurrentChange (val) {
      clearInterval(this.timer)
      this.timer = setInterval(() => {
        this.searchNews({...this.params,pageNum: val})
      }, 10000)
    }
  }
}
</script>
<style scoped>
  .news {
    padding-top: 16px;
    & .item{
      padding-bottom: 8px;
      padding:10px;
      border-bottom: 1px solid #ddd;
      margin-bottom: 12px;
      background-color: #fff;
      cursor: pointer;
      & .top {
        display: flex;
        justify-content: space-between;
        & .text {
          padding-bottom: 8px;
          font-weight: bold;
          color: #000;
        }
      }
    }
    & .news-center {
      margin-top: 30px;
      height: 40px;
      width: 100%;
      line-height: 40px;
      text-align: center;
      background-color: #ddd;
      color: #000;
      cursor: pointer;
    }
  }
</style>
