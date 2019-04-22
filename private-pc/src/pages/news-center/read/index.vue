<template>
  <ul class="news">
    <li
      class="item"
      :key="index"
      v-for="(i, index) in news">
      <div
        v-if="index%2===0"
        class="top">
        <div class="text">{{i.a}}</div>
        <div class="time">{{formatDate(i.b)}}</div>
      </div>
      <div class="bottom-text" v-if="index%2===0">{{i.c}}</div>
    </li>
  </ul>
</template>
<script>
import { mapState } from 'vuex'
import { formatDate } from '../../../utils/format.js'
export default {
  data() {
    return{

    }
  },
  computed: {
    ...mapState('commonData', {
      news:state => state.news
    })
  },
  created () {

  },
  methods: {
    formatDate
  }
}
</script>
<style scoped>
  .news {
    padding-top: 16px;
    & .item{
      padding:0 10px;
      margin-bottom: 12px;
      cursor: pointer;
      background-color: #fff;
      & .top {
        display: flex;
        justify-content: space-between;
        padding-top: 10px;
        & .text {
          padding-bottom: 8px;
          font-weight: bold;
          color: #000;
        }
      }
      & .bottom-text {
        padding-bottom: 10px;
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
