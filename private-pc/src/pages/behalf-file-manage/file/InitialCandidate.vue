<template>
  <div class="info">
    <div class="top-title">
      <div>>> 选举委员会关于初步代表候选人名单公告（1）</div>
      <el-button
      type="primary"
      size="small">下载</el-button>
    </div>
    <div class="content" v-if="+type === 1">
      <div class="announcement-title">公告</div>
      <div>
        &nbsp;&nbsp;&nbsp;&nbsp;根据《选举法》的规定，现将{{data.countyName}} 第{{data.belongAreaName}}政党、
        人民团体推荐和选民10人以上联名推荐的{{data.countyName}}第{{data.sessionNum}}届人民代表大会初步代表候选人名单
        以姓名笔画排序公告如下。请选民依法进行酝酿讨论，以便协商确定本选区正式代表候选人。
        <ul class="message">
          <li
            :key="index"
            v-for="(i,index) in data.list">
              {{`${i.name || '暂无名字'}，${i.gender}，${i.age}，${i.nation}，${i.workUnit+i.post}，${i.recommendedPerson}`}}
          </li>
        </ul>

      </div>
      <div class="mark mark1">{{data.countyName}}选举委员会</div>
    </div>
    <div class="content content2" v-if="+type===2">
      <div class="announcement1">{{data.countyName}}选举委员会公告</div>
      <div class="announcement2">第xx号</div>
       &nbsp;&nbsp;&nbsp;&nbsp;根据选举法的规定，现将{{data.belongAreaName}}选区政党、人民团体推荐和选民10人以上
        联名推荐的{{data.countyName}}第{{data.sessionNum}}届人民代表大会初步代表候选人名单以姓名笔画为序公告如下。请选民依法进行酝酿讨论
        以便协商确定本选区的正式代表候选人。
        <Tabel style="margin-top: 20px;" :list="data.list"/>
        <div class="mark mark1">{{data.countyName}}选举委员会</div>
        <div class="mark">{{`${data.year}年${data.month}月${data.day}日`}}</div>
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
    & .top-title {
      padding: 15px;
      display: flex;
      justify-content:space-between;
    }
  }
  .content {
    width: 900px;
    margin: 0 auto;
    background-color: #fff;
    min-height: 90%;
    padding: 30px;
    line-height: 40px;
    font-size: 18px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 10px;
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
      align-items: center;
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


