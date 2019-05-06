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
      <div v-if="+type===1" class="announcement1">{{data.countyName}}选举委员会公告</div>
      <div v-if="+type===1" class="announcement2">(第xx号)</div>
      <div v-if="+type === 1">
        &nbsp;&nbsp;根据《选举法》的规定，现将XX选区选民名单列表公告如下，如有不同意见，可依照选举法第二十八条规定，向县选举委员会提出申诉。
        <div v-if="+type===1" class="announcement1">{{data.countyName}}选举委员会公告</div>
        <ul class="message">
          <li style="font-weight: bold;" class="person">
            <div
            :key="index"
            v-for="(i,index) in list">
              {{i}}
            </div>
          </li>
          <li
            :key="index"
            class="person"
            v-for="(i,index) in data.list">
              <div>{{i.name || '暂无名字'}}</div>
              <div>{{handlegender(i.gender)}}</div>
              <div>{{i.q || '1993年12月'}}</div>
              <div>{{i.q || '2018-12-01'}}</div>
          </li>
        </ul>
      </div>
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
      loading: false,
      list: ['姓名','年龄','出生日期','登记日期']
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
        output({url: '/doc/download', param: {id: item, module: 2}})
      } catch (err) {
        console.log(err)
      }
    },
    handlegender(module) {
      let text = ""
      switch(module) {
      case 0:
        text = '未设置'
        break
      case 1:
        text = '男'
        break
      case 2:
        text = '女'
        break
      default:
        text = '其他'
      }
      return text
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
      margin: 20px 0;
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
  .person {
    display: flex;
    & div {
      flex: 1;
      text-align: center;
    }
  }
</style>


