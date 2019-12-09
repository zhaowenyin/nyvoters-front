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
      <div class="announcement1">{{data.countyName}}选举委员会公告</div>
      <div class="announcement2">(第xx号)</div>
       &nbsp;&nbsp;{{data.countyName}}{{data.belongAreaName}}于xxxx年x月x日按照{{data.countyName}}人大代表选举办法，并采用无记名投票的方式，选举产生{{data.countyName}}第{{data.sessionNum}}届人民代表大会代表{{data.list&&data.list.length || 0}}名，经县选举委员会审核，符合选举法和省选举实施细规有关规定，确定选举结果有效，现将各候选人名单以得票多少顺序公告如下：
        <Tabel2 style="margin: 20px 0;" class="message" :list="data.list"/>
        <div>
          &nbsp;&nbsp;根据有关法律规定及代表选举办法，确认<span :key="index" v-for="(i,index) in data.list">{{i.recommendedPerson}},</span>当选为{{data.countyName}}第{{data.sessionNum}}届人民代表大会代表。
        </div>
        <div class="mark mark1">{{data.countyName}}选举委员会</div>
        <div class="mark">{{`${data.year}年${data.month}月${data.day}日`}}</div>
    </div>
  </div>
</template>
<script>
import Tabel2 from './Tabel2'
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
    },
  },
  components: {
    Tabel2
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
    width: 800px;
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


