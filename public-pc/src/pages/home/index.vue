<template>
  <div class="home">
    <el-form
      class="form"
      ref="loginForm">
      <el-form-item class="padding">
        <el-button
          type="primary"
          class="loginBtn"
          @click="onlineRegiste">在线登记</el-button>
      </el-form-item>
      <el-form-item class="padding">
        <el-button
          type="primary"
          class="loginBtn"
          @click="onlineSearch">在线查询</el-button>
      </el-form-item>
      <el-form-item class="padding">
        <el-button
          type="text"
          class="line"
          @click="onlineComplaint">在线申诉</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data () {
    return {

    }
  },
  methods: {
    onlineRegiste () {
      this.$router.push({path: '/register'})
    },
    onlineSearch () {
      this.$router.push({path: '/search'})
    },
    onlineComplaint () {
      this.$router.push({path: '/complaint'})
    }
  }
}
</script>
<style scoped>
  .home {
    width: 100%;
    height: 100%;
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    & .form {
      width: 546px;
    }
  }
  .loginBtn {
    width: 100%;
    height: 50px;
    border: 1px solid #e6a23c;
    background-color: #fff;
    border-radius: 10px;
    color: #333;
    margin-bottom: 50px;
  }
  .line {
    width: 100%;
    background-color: #fff;
    text-decoration:underline;
    color: #333;
  }
</style>
