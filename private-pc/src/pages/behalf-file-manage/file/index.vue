<template>
  <div class="info">
    <div class="top-title">>> 选举委员会关于初步代表候选人名单公告（1）</div>
    <div class="content" v-if="+type === 1">
      <div class="announcement-title">公告</div>
      <div>
        &nbsp;&nbsp;&nbsp;&nbsp;根据《选举法》的规定，现将{{data.a}} 县第{{data.b}}选区政党、
        人民团体推荐和选民10人以上联名推荐的{{data.c}}县第六届人民代表大会初步代表候选人名单
        以姓名笔画排序公告如下。请选民依法进行酝酿讨论，以便协商确定本选区正式代表候选人。
        <ul class="message">
          <li
            :key="index"
            v-for="(i,index) in data.list">
              {{`${i.name}，${i.gender}，${i.age}，${i.nation}，${i.job}，${i.recommendedPerson}`}}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import {getInfo} from '../service'
export default {
  data(){
    return {
      type: null,
      data: '',
      loading: false
    }
  },
  created(){
    this.type = this.$route.query.type
    this.searchInfo()
  },
  methods: {
    async searchInfo () {
      this.loading = true
      const{data} = await getInfo()
      this.data = data
      this.loading = false
    }
  }
}
</script>
<style scoped>
  .info {
    background: #f8f8f8;
    & .top-title {
      padding: 15px;
    }
  }
  .content {
    width: 700px;
    margin: 0 auto;
    background-color: #fff;
    min-height: 90%;
    padding: 40px;
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
</style>


