<template>
  <div class="info">
    <div class="top-title">
      <div>>> {{$route.query.title}}</div>
      <el-button
      type="primary"
      @click="download"
      size="small">下载</el-button>
    </div>
    <div class="content">
      <div v-if="+type === 1" class="announcement-title">公告</div>
      <div v-if="+type === 1">
        &nbsp;&nbsp;根据《选举法》的规定，现将{{data.countyName}}{{data.belongAreaName}}政党、人民团体推荐和选民10人以上联名推荐的{{data.countyName}}第{{data.sessionNum}}届人民代表大会初步代表候选人名单
        以姓名笔画排序公告如下。请选民依法进行酝酿讨论，以便协商确定本选区正式代表候选人。
        <ul class="message">
          <li
            :key="index"
            class="list"
            v-for="(i,index) in data.list">
            <div class="item">{{i.recommendedPerson}}</div>
            <div class="gender">{{i.gender}}</div>
            <div class="gender">{{i.age}}</div>
            <div class="nation">{{i.nation}}</div>
            <div class="item">{{i.workUnitAndPost || '无'}}</div>
            <div class="item">{{i.recommendPersonList || '无'}}</div>
              <!-- {{`${i.recommendedPerson }，${i.gender}，${i.age}，${i.nation}，${i.workUnitAndPost}，${i.recommendPersonList || '无'}`}} -->
          </li>
        </ul>
      </div>
      <div v-if="+type===2" class="announcement1">{{data.countyName}}选举委员会公告</div>
      <div v-if="+type===2" class="announcement2">第xx号</div>
      <div v-if="+type===2">
         &nbsp;&nbsp;根据选举法的规定，现将{{data.belongAreaName}}政党、人民团体推荐和选民10人以上联名推荐的{{data.countyName}}第{{data.sessionNum}}届人民代表大会初步代表候选人名单以姓名笔画为序公告如下。请选民依法进行酝酿讨论以便协商确定本选区的正式代表候选人。
        <Tabel style="margin: 20px 0;"  :list="data.list"/>
      </div>
      <div class="mark mark1">{{data.countyName}}选举委员会</div>
      <div  v-if="+type===2" class="mark">{{`${data.year}年${data.month}月${data.day}日`}}</div>
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
    },
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
    overflow: auto;
    width: 800px;
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


