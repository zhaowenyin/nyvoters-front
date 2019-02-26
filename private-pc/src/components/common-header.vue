<template>
  <div class="header-wrapper">
    <div class="header-title">
      <i class="icon-home"></i>
      <span class="header-home">智慧全民健康管理平台</span>
    </div>
    <div class="user">
      <span class="username">{{ userInfo.name }}</span>
      <span
        class="quit"
        @click="quit">退出</span>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  data () {
    return {
    }
  },
  computed: {
    ...mapState('commonData', {
      userInfo: state => state.userInfo
    }),
  },
  created () {
    this.getUserInfo()
  },
  methods: {
    ...mapActions('commonData', [
      'getUserInfo'
    ]),
    quit () {
      this.$confirm('确认退出？')
        .then(async ()=> {
          // await logout()
          // clearSession()
          this.$router.push({ path: '/login' })
        })
        .catch(()=> {})
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .header-title {
    display: flex;
    align-items: center;
  }
  .header-wrapper{
    width: 100%;
    height: 60px;
    padding:0px 30px 0 20px;
    background:linear-gradient(180deg,rgba(250,254,255,1) 0%,rgba(239,248,248,1) 100%);
    box-shadow:0px 2px 6px 0px rgba(0,0,0,0.22);
    display: flex;
    align-items: center;
    justify-content:space-between;
    color: #06D3D3;
  }
  .icon-home {
    /* background: url("../assets/img/home.png") center center no-repeat; */
    background-size: 100% 100%;
    width: 36px;
    height: 37px;
    display: inline-block;
    margin-right: 16px;
  }
  .header-home {
    font-size: 18px;
    font-weight: 500;
  }
  .user{
    &>span{
      margin-left:20px;
    }
    & .username{
      color: #333;
      &:before {
        content: "";
        display: inline-block;
        /* background: url("../assets/img/user.png") center center no-repeat; */
        background-size: 100% 100%;
        width: 16px;
        height: 16px;
        margin-right: 6px;
        transform: translateY(3px);
      }
    }
    & .quit{
      cursor: pointer;
      text-decoration: underline;
    }
  }
</style>
