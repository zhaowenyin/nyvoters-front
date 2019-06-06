<template>
  <div class="success">
    <div class="out">
      <div class="true-border"></div>
    </div>
    <div v-if="type===2" class="text"> {{$route.query.info}}</div>
     <div
      v-if="type===2&&$route.query.id"
      class="loginBtn"
      @click="download()">选民证下载</div>
      <div v-if="type===3" class="text">申诉提交成功！</div>
      <div v-if="type===3" class="complain">{{$route.query.info}}</div>
      <div v-if="type===1" class="text">提交成功！</div>
      <div v-if="type===1" class="register">{{$route.query.info}}后续可通过<span class="search" @click="search"> [在线查询]</span>及时了解进度</div>
       <span
        v-if="type===2"
        class="quit"
        @click="quit">返回</span>
        <span
        v-if="type===1 || type===3"
        class="quit1"
        @click="back">首页</span>
  </div>
</template>

<script>
import output from '../../utils/output.js'

export default {
  data(){
    return {
      type: null
    }
  },
  created() {
    this.type=+this.$route.query.type
  },
  methods:{
    async download () {
      try {
        output({url: '/doc/download', param: {id: this.$route.query.id, module: 4,fileName: '选民证'}})
      } catch (err) {
        console.log(err)
      }
    },
    quit () {
      this.$router.push({ path: '/' })
    },
    back() {
      this.$router.push({ path: '/' })
    },
    search () {
      this.$router.push({ path: '/search' })
    }
  }
}
</script>
<style scoped>
.success{
  height:100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

}
.out {
  margin-top: 80px;
  width: 53px;
  height: 53px;
  background: url("../../assets/img/success.png") top left no-repeat;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
}
.true-border {
  width: 14px;
  height: 19px;
  border-bottom: 5px solid #fff;
  border-right: 5px solid #fff;
  transform: rotate(45deg);
  margin-bottom:5px;
}
.text {
  padding: 0 90px;
  text-align: center;
  margin-top: 13px;
  color: #000;
  font-size:18px;
}
.loginBtn {
  margin-top: 19px;
  width: 155px;
  height: 40px;
  line-height: 40px;
  text-align: center;
	border-radius: 2px;
  border: solid 0.5px #d41c1a;
  color: #d41c1a;
  font-size: 15px;
}
.quit {
 font-size: 18px;
  margin-top: 86px;
  text-decoration:underline;
}
.quit1 {
 font-size: 18px;
  margin-top: 83px;
  text-decoration:underline;
}
.complain {
  padding: 0 90px;
  text-align: center;
  color: #333333;
  padding-top: 17px;
  font-size: 15px;
}
.register {
  color: #333333;
  font-size: 15px;
  margin-top: 19px;
  padding: 0 40px;
  text-align: center;
  & .search {
    color: #d41c1a;
  }
}

</style>
<style>
</style>
