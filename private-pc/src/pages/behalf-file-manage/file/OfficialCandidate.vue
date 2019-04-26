<template>
  <div class="info">
    <div class="top-title">
      <div>>> {{$route.query.title}}</div>
      <el-button
      type="primary"
      size="small">下载</el-button>
    </div>
    <div class="content">
      <div v-if="+type === 3" class="announcement-title">公告</div>
      <div v-if="+type===4" class="announcement1">{{data.countyName}}选举委员会公告</div>
      <div v-if="+type===4" class="announcement2">第xx号</div>
      <div>
        &nbsp;&nbsp;根据《选举法》的规定，经{{data.countyName}} 第{{data.belongAreaName}}选民酝酿协商，
        根据较多数选民意见，确定下列人员为第{{data.belongAreaName}}{{data.countyName}}第{{data.sessionNum}}届人民代表大会正式代表候选人。
        现以姓名笔画排序公告如下：
        <ul v-if="+type === 3" class="message">
          <li
            :key="index"
            v-for="(i,index) in data.list">
              {{`${i.name || '暂无名字'}，${i.gender}，${i.age}，${i.nation}，${i.workUnit+i.post}`}}
          </li>
        </ul>
      </div>
      <div v-if="+type===4" style="margin: 20px 0;" >
        <Tabel :list="data.list"/>
      </div>
       <div>
        &nbsp;&nbsp;xx选区的选举大会定于xxxx年x月x日x时，在xx召开，请全体
        请全体选民提前做好准备，按时参加选举大会，并到制定地点参加投票。
      </div>
      <div class="mark mark1">{{data.countyName}}选举委员会</div>
      <div  v-if="+type===4" class="mark">{{`${data.year}年${data.month}月${data.day}日`}}</div>

    </div>
  </div>
</template>
<script>
import Tabel from './Tabel'
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
    Tabel
  },
  created(){

  },
  methods: {

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
    align-items: center;
    letter-spacing: 4px;
    color: #55585f;
    & .announcement-title {
      font-size: 24px;
      color: #000;
      font-weight: bold;
      padding-bottom: 40px;
    }
    & .message {
       display: flex;
      flex-direction: column;
      padding-left: 50px;
      margin: 20px 0;
    }
  }
  .announcement1,.announcement2{
    font-size: 24px;
    color: #000;
    font-weight: bold;
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
</style>


