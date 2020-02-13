<template>
  <div class="info">
    <div class="top-title">
      <div>>> {{$route.query.title}}</div>
      <el-button
      @click="download"
      type="primary"
      size="small">下载</el-button>
    </div>
    <div class="content">
      <div class="announcement1">{{data.belongAreaName}}选举大会公告</div>
        <div style="width: 100%">&nbsp;&nbsp;根据{{data.countyName}}选举委员会的统一要求，本选区定于xxxx年x月x日x时在xx处召开选举大会选举{{data.countyName}}第{{data.sessionNum}}届人民代表大会代表。请选民互相转告，届时请携带选民证（身份证），准时到会参加投票选举。</div>
        <div class="mark mark1">{{data.countyName}}选举委员会</div>
        <div class="mark">{{`${data.year}年${data.month}月${data.day}日`}}</div>
    </div>
  </div>
</template>
<script>
import output from '../../../utils/output.js'
export default {
  data(){
    return {
      loading: false
    }
  },
  props: {
    data: {
      default: null,
      type: null
    },
    type: {
      default: null,
      type: null
    },
    belongAreaId: {
      default: null,
      type: null
    }
  },
  components: {

  },
  created(){

  },
  methods: {
    async download () {
      console.log(1222)
      try {
        output({url: '/doc/download', param: {id: this.$route.query.id,belongAreaId: this.belongAreaId,fileName: this.$route.query.title}})
      } catch (err) {
        console.log(err)
      }
    },
  }
}
</script>
<style scoped>
  .info {
    background: #f8f8f8;
    font-family: SimSun;
     height: 100%;
    overflow: auto;
    & .top-title {
      padding: 15px;
      display: flex;
      justify-content:space-between;
    }
  }
  .content {
    overflow: auto;
    width: 700px;
    margin: 0 auto;
    background-color: #fff;
    padding: 30px;
    line-height: 40px;
    font-size: 18px;
    display: flex;
    flex-direction: column;
    letter-spacing: 4px;
    color: #55585f;
  }
  .announcement1,.announcement2{
    font-size: 24px;
    color: #000;
    font-weight: bold;
    text-align: center;
  }
  .announcement2 {
    padding-bottom: 30px;
  }
  .mark {
    display: flex;
    justify-content: flex-end;
    width: 100%;
  }
  .mark1 {
    padding-top: 60px;
  }
</style>


