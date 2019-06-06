<template>
  <div class="success">
    <div class="out">
      <div class="true-border"></div>
    </div>
    <div v-if="type===2" class="text"> {{$route.query.info}}</div>
     <el-button
     v-if="type===2&&$route.query.id"
      class="loginBtn"
      @click="download()">选民证下载</el-button>
      <span
        v-if="type===2"
        class="quit"
        @click="quit">返回</span>
      <div  v-if="type===3" class="text">申诉提交成功！</div>
      <div  v-if="type===3" class="complain">{{$route.query.info}}</div>
      <div  v-if="type===1" class="text">提交成功！</div>
      <div v-if="type===1" class="register">{{$route.query.info}}后续可通过<span class="search" @click="jup">[在线查询]</span>及时了解进度</div>
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
      this.$confirm('确认返回首页？')
        .then(()=> {
          this.$router.push({ path: '/' })
        })
        .catch(()=> {})
    },
    jup () {
      this.$router.push({path: '/search'})
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
  width: 105px;
  height: 106px;
  background: url("../../assets/img/success.png") top left no-repeat;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
}
.true-border {
  width: 27px;
  height: 37px;
  border-bottom: 5px solid #fff;
  border-right: 5px solid #fff;
  transform: rotate(45deg);
  margin-bottom:5px;
}
.text {
  text-align: center;
  margin-top: 17px;
  color: #000;
  font-size: 24px;
}
.loginBtn {
  margin-top: 23px;
  width: 150px;
  height: 34px;
  text-align: 34px;
  border-radius: 4px;
  margin-right: 19px;
  color:#d41c1a;
}
.quit {
  color:#d41c1a;
  padding-top: 23px;
  cursor: pointer;
}
.complain {
  color: #333333;
  padding-top: 17px;
}
.register {
  color: #333333;
  margin-top: 23px;
  & .search {
    color: #d41c1a;
    cursor: pointer;
  }
}

</style>
<style>
.success .el-button {
  padding: 0px 0px;
}
</style>
