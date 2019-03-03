<template>
  <div class="home">
    <div class="out">
      <img style="width: 83px;height:87px;" src="../../assets/img/guohui.png"/>
      <div class="title1">河南省南阳市选民登记系统</div>
      <el-form
      class="form"
      ref="loginForm">
        <el-form-item class="padding regist">
          <div class="register">
            <!-- <i class="icon-home1"/> -->
            <el-button
              type="primary"
              icon="el-icon-search"
              class="loginBtn"
              @click="onlineRegiste">在线登记</el-button>
            <img style="width:29px;height: 29px;" src="../../assets/img/code.png"/>
          </div>
        </el-form-item>
        <el-form-item class="padding search">
          <el-button
            icon="el-icon-search"
            type="primary"
            class="loginBtn search-btn"
            @click="onlineSearch">在线查询</el-button>
        </el-form-item>
        <el-form-item class="padding complaint">
          <el-button
            type="text"
            class="line"
            icon="el-icon-search"
            @click="onlineComplaint">在线申诉</el-button>
        </el-form-item>
      </el-form>
    </div>

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
    background: url("../../assets/img/pc-home.jpg") top left no-repeat;
    background-size: cover;
    & .form {
      width: 100%;
      margin-left: 48px;
    }
  }
  .out {
    width: 864px;
    padding: 66px 0 82px 0;
    box-shadow: 0px 0px 4px 0px
  rgba(34, 24, 21, 0.19);
   background-color: #ffffff;
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    opacity:0.9;
  }
  .register {
    display: flex;
    align-items: center;
  }
  .loginBtn {
    width: 307px;
    height: 60px;
    margin-right: 19px;
    font-size: 18px;
    color: #fff;
    border-radius: 2px;
   background-color: #00a0e9;
	box-shadow: 0px 3px 7px 0px
		rgba(0, 0, 0, 0.35);
    border: none;
  }
  .search-btn {
    background-color: #009944;
	box-shadow: 0px 3px 7px 0px
		rgba(0, 0, 0, 0.35);
  }
  .padding {
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .search {
    margin-right: 29px;
  }
  .line {
    width: 100%;
    text-decoration:underline;
    color: #000022;
    font-size: 14px;
  }
  .title1 {
    margin: 25px 0 110px 0;
    font-size: 45.3px;
    letter-spacing: -2.3px;
    color: #d02626;
  }
  .complaint {
    margin-right: 48px;
  }
</style>
<style>
.home .el-form-item {
  margin-bottom: 40px;
}
.home .regist .el-icon-search {
  &:before {
    content: "";
    display: inline-block;
    background: url("../../assets/img/register.png") center center no-repeat;
    background-size: 100% 100%;
    width: 21px;
    height: 19px;
    margin-right: 13px;
    transform: translateY(3px);
  }
}
.home .search .el-icon-search {
  &:before {
    content: "";
    display: inline-block;
    background: url("../../assets/img/search.png") center center no-repeat;
    background-size: 100% 100%;
    width: 24px;
    height: 19px;
    margin-right: 13px;
    transform: translateY(3px);
  }
}
.home .complaint .el-icon-search {
  &:before {
    content: "";
    display: inline-block;
    background: url("../../assets/img/help.png") center center no-repeat;
    background-size: 100% 100%;
    width: 20px;
    height: 20px;
    margin-right: 13px;
    transform: translateY(3px);
  }
}

</style>
