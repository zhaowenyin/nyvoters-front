<template>
  <div class="info">
    <div class="top-title">
      <div>>> {{$route.query.title}}</div>
      <el-button
      type="primary"
       @click="download"
      :disabled="!data.hasReport"
      size="small">下载</el-button>
    </div>
    <div class="content" v-if="data.hasReport">
      <div v-if="+type===3" class="announcement-title">公告</div>
      <div v-if="+type===4" class="announcement1">{{data.districtName}}选举委员会公告</div>
      <div v-if="+type===4" class="announcement2">(第xx号)</div>
      <div>
        &nbsp;&nbsp;根据《选举法》和《{{data.districtName}}省县、乡两级人民代表大会代表选举工作实施细则》的规定，现将<span style="text-decoration:underline;">{{data.precinctName}}</span>选区选民名单公告后的选民增减情况做如下补正：
      </div>
      <div class="message">
        <div>一、增加的选民：</div>
        <div>{{data.addVotersStr}}</div>
        <div>二、迁出除名的选民：</div>
        <div>{{data.cutOutVotersStr}}</div>
        <div>三、死亡除名的选民：</div>
         <div>{{data.dieVotersStr}}</div>
        <div>四、停止行使选举权利除名的选民：</div>
         <div>{{data.disempowerVotersStr}}</div>
        <div v-if="+type === 3">五、本选区原登记选民 {{data.regNum}}人，现实有选民{{data.voterNum}}人。</div>
        <div v-if="+type === 4">五、本选区原登记选民 {{data.regNum}}人，经补正现实有选民{{data.voterNum}}人。</div>
        <div>特此公告</div>
      </div>

      <div class="mark mark1">{{data.districtName}}选举委员会</div>
      <div class="mark">{{data.date}}</div>

    </div>
    <div class="not" v-else>{{data.message}}</div>
  </div>
</template>
<script>
import output from '../../../../utils/output.js'
import format from 'date-fns/format'
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
    },
  },
  components: {

  },
  created(){

  },
  methods: {
    async download () {
      try {
        output({url: '/doc/download', param: {id: this.$route.query.id,belongAreaId: this.belongAreaId,fileName: this.$route.query.title}})
      } catch (err) {
        console.log(err)
      }
    },
    formatDate (timestamp) {
      return this.data&&timestamp && {year:format(+timestamp, 'YYYY'),month: format(+timestamp, 'MM'),day: format(+timestamp, 'DD')}
    }
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
    width: 800px;
    overflow: auto;
    height: 100%;
    margin: 0 auto;
    background-color: #fff;
    padding: 30px;
    line-height: 40px;
    font-size: 18px;
    display: flex;
    flex-direction: column;
    letter-spacing: 4px;
    color: #55585f;
    & .announcement-title {
      font-size: 24px;
      color: #000;
      font-weight: bold;
      padding-bottom: 40px;
      text-align: center;
    }
    & .message {
      display: flex;
      flex-direction: column;
      padding-left: 50px;
      & div {
        padding: 10px 0;
      }
    }
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
    padding-top: 50px;
  }
  .date {
    text-decoration:underline;
  }
  .not {
    padding-top: 200px;
    text-align: center;
    font-size: 16px;

  }
</style>


