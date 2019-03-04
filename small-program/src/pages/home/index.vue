<template>
<div class="home">
  <div class="img">
    <img src="../../assets/img/login-icon.png"/>
  </div>
  <div
    @click="onlineRegiste"
    class="btn register"><i class="icon-register">在线登记</i></div>
  <div
    @click="onlineSearch"
    class="btn search"><i class="icon-search">在线查询</i></div>
  <div
   @click="onlineComplaint"
    class="btn complait"><i class="icon-conplait">在线申诉</i></div>


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
    width:100%;
    height: 100%;
    padding: 0 23px;
  }
  .img {
    width: 100%;
    margin: 52px 0px 35px 0;
    padding: 0 19px;
    & img {
      width:100%;
    }
  }
  .btn {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .register {
    height: 50px;
    font-size: 18px;
    line-height: 50px;
    background-color: #009944;
    box-shadow: 0px 1.5px 3.5px 0px
      rgba(0, 0, 0, 0.35);
    border-radius: 1px;
    color: #fff;
  }
  .search {
    height: 50px;
    line-height: 50px;
    font-size: 18px;
    margin: 22px 0 35px 0;
    background-color: #00a0e9;
    box-shadow: 0px 1.5px 3.5px 0px
      rgba(0, 0, 0, 0.35);
    border-radius: 1px;
    color: #fff;
  }
  .complait {
    color: #000022;
    text-decoration:underline;
  }
  .icon-register {
    &:before {
      content: "";
      display: inline-block;
      background: url("../../assets/img/register.png") center center no-repeat;
      background-size: 100% 100%;
      width: 21px;
      height: 19px;
      margin-right: 4px;
      transform: translateY(3px);
    }
  }
  .icon-search {
    &:before {
      content: "";
      display: inline-block;
      background: url("../../assets/img/search.png") center center no-repeat;
      background-size: 100% 100%;
      width: 22px;
      height: 17px;
      margin-right: 4px;
      transform: translateY(3px);
    }
  }
  .icon-conplait {
    &:before {
    content: "";
      display: inline-block;
      background: url("../../assets/img/help.png") center center no-repeat;
      background-size: 100% 100%;
      width: 14px;
      height: 14px;
      margin-right: 4px;
      transform: translateY(3px);
    }
  }
</style>
