<template>
  <div class="info">
    <div class="top-title">
      <div>>> {{$route.query.title}}</div>
      <el-button
      type="primary"
      size="small">下载</el-button>
    </div>
    <div class="content">
      <div class="announcement1">{{data.belongAreaName}}选举大会公告</div>
       <div class="announcement2">(第xx号)</div>
       &nbsp;&nbsp;根据《中华人民共和国全国人民代表大会和地方各级人民代表大会选举法》、《xxx县乡两集人民代表大会代表选举工作实施细则》以及我县人大常委会关于县人大换届是时间的决定及安排意见，经研究确定xxxx年x月x 日为县人大代表的选举日，选民工作从xx月x日起，到x月x日止。务请给喂选民在此期间积极做好选民登记工作。
         <br/>&nbsp;&nbsp;对于外来人员的选民登记问题作如下规定：凡常住户口不在本地
         的外来暂住人员，应当回原户口所在地或原工作单位的选区进行选民
         登记，参加选举。如本人要求参加现居住地和工作单位所在地选举的，必
         须向原户口所在地或原工作单位索取选民资格证明后，在选民登记载
         止日前到现所在单位或现暂住地的选区进行选民登记，列入选民名单，
         参加选举活动。
         <br/>&nbsp;&nbsp;特此公告。
        <div class="mark mark1">{{data.countyName}}选举委员会</div>
        <div class="mark">{{`${data.year}年${data.month}月${data.day}日`}}</div>
    </div>
  </div>
</template>
<script>
import output from '../../../../utils/output.js'
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
    }
  },
  components: {

  },
  created(){

  },
  methods: {
    async download (item) {
      try {
        output({url: '/doc/download', params: {id: item, module: 2}})
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
    height: 100%;
    width: 760px;
    margin: 0 auto;
    background-color: #fff;
    padding: 30px 50px ;
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
    padding-bottom: 50px;
  }
  .announcement1 {
    padding-bottom: 20px;
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


