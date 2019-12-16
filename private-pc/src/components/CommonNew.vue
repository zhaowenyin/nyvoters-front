<template>
  <ul class="news">
    <li
      class="item"
      :key="index"
      @click="look(i)"
      v-for="(i, index) in news">
      <div class="top">
        <div class="text">{{i.messageType}}</div>
        <div class="time">{{formatDate(i.createTime)}}</div>
      </div>
      <div>{{i.messageContent}}</div>
    </li>
  </ul>
</template>
<script>
import { formatDate } from '../utils/format.js'
import {setRead} from '../common-data/service.js'
export default {
  data() {
    return{

    }
  },
  computed: {
  },
  props: {
    news: {
      default: null,
      type: null
    }
  },
  created () {

  },
  destroyed() {

  },
  methods: {
    formatDate,
    async look(i) {
      if (i.isRead === 0) {
        await setRead({id: i.id})
      }
      if(i.messageType === '选民转移申请处理'){
        this.$router.push({path: '/voters-transfer'})
      } else if(i.messageType === '选民转移申请处理结果通知') {
        this.$router.push({path: '/voters-transfer/history'})
      }else if(i.messageType === '选民申诉处理') {
        this.$router.push({path: '/voters-apeal'})
      }
    }
  }
}
</script>
<style scoped>
  .news {
    padding-top: 16px;
    max-height: 300px;
    overflow: auto;
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
