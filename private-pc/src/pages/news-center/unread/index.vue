<template>
  <ul class="news">
    <li
      class="item"
      :key="index"
      v-for="(i, index) in news">
      <div class="top">
        <div class="text">{{i.messageType}}</div>
        <div class="time">{{formatDate(i.createTime)}}</div>
      </div>
      <div>{{i.messageContent}}</div>
    </li>
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
  </ul>
</template>
<script>
import { formatDate } from '../../../utils/format.js'
import {getNews} from '../service'
export default {
  data() {
    return{
      news: [],
      params: {
        pageNum: 1,
        pageSize: 20,
        isRead: 0,
      },
      total: 0,
      timer: null
    }
  },
  computed: {
  },
  created () {
    this.searchNews(this.params)
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
      this.searchNewsNot({...this.params,pageNum: val})
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
