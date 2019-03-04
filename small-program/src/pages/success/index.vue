<template>
  <div class="success">
    <div class="out">
      <div class="true-border"></div>
    </div>
    <div v-if="type===2" class="text"> 该人员已登记成功！</div>
     <div
     v-if="type===2"
      class="loginBtn"
      @click="download()">选民证下载</div>
      <span
        v-if="type===2"
        class="quit"
        @click="quit">返回</span>
        <span
        v-if="type===1 || type===3"
        class="quit"
        @click="back">首页</span>
      <div v-if="type===3" class="text">申诉提交成功！</div>
      <div v-if="type===3" class="complain">您的在线申诉已成功提交，待工作人员进行处理核实！</div>
      <div v-if="type===1" class="text">提交成功！</div>
      <div v-if="type===1" class="register">您的选民信息已成功提交，待系统审核！后续可通过<span class="search">[在线查询]</span>及时了解进度</div>
  </div>
</template>

<script>
import {taskDownload} from './service.js'
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
    async download (item) {
      try {
        const { data = {} } = await taskDownload({id: item.result_id,citizen_name: item.citizen_name,operate_name: item.name,doctor_name: item.doctor_name})
        output({ data: data.data, download: data.filename, type: data.type })
      } catch (err) {
        console.log(err)
      }
    },
    quit () {
      this.$router.push({ path: '/' })
    },
    back() {
      this.$router.push({ path: '/' })
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
  padding: 0 56px;
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
  padding-top: 87px;
  cursor: pointer;
  text-decoration:underline;
}
.complain {
  text-align: center;
  color: #333333;
  padding-top: 17px;
  font-size: 15px;
}
.register {
  color: #333333;
  font-size: 15px;
  margin-top: 19px;
  text-align: center;
  & .search {
    color: #d41c1a;
  }
}

</style>
<style>
</style>
