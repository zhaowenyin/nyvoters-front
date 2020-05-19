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
      <div v-if="+type === 3" class="announcement-title">公告</div>
      <div v-if="+type===4" class="announcement1">{{data.countyName}}选举委员会公告</div>
      <div v-if="+type===4" class="announcement2">第xx号</div>
      <div style="width: 100%">
        &nbsp;&nbsp;根据《选举法》的规定，经{{data.countyName}}{{data.belongAreaName}}选民酝酿协商，根据较多数选民意见（或经预选），确定下列人员为{{data.belongAreaName}}{{data.countyName}}第{{data.sessionNum}}届人民代表大会正式代表候选人。
        现以姓名笔画排序公告如下：
        <ul v-if="+type === 3" class="message">
          <li
            :key="index"
            class="list"
            v-for="(i,index) in data.list">
             <div class="name">{{i.recommendedPerson}}</div>
            <div class="gender">{{i.gender}}</div>
            <div class="gender">{{i.age}}</div>
            <div class="item">{{i.nation}}</div>
            <div class="item">{{i.workUnitAndPost || '无'}}</div>
              <!-- {{`${i.recommendedPerson}，${i.gender}，${i.age}，${i.nation}，${i.workUnitAndPost}`}} -->
          </li>
        </ul>
      </div>
      <div v-if="+type===4" style="margin: 20px 0;" >
        <Tabel :isoffice="true" :list="data.list"/>
      </div>
       <div style="width: 100%">
        &nbsp;&nbsp;{{data.belongAreaName}}的选举大会定于xxxx年x月x日上午x时，在xx召开，
        请全体选民提前做好准备，按时参加选举大会，并到指定地点参加投票。
      </div>
      <div class="mark mark1">{{data.countyName}}选举委员会</div>
      <div class="mark">{{`${data.year}年${data.month}月${data.day}日`}}</div>

    </div>
  </div>
</template>
<script>
import Tabel from './Tabel'
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
    Tabel
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
    width: 1000px;
    overflow: auto;
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
  .list {
    display: flex;
    & div {
      margin-right: 15px;
      line-height: 20px;
      margin-bottom: 15px;
       &.gender{
        width: 60px;
      }
      &.nation {
        width: 120px;
      }
      &.name{
        width: 150px;
      }
      &.item {
        flex:1;

      }
    }

  }
</style>


