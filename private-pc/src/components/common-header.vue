<template>
  <div class="header-wrapper">
    <div class="header-title">
        <i class="icon-home"></i>
      <span class="header-home">南阳市选民登记系统</span>
    </div>
    <div class="user">
      <span>2018年12月23日 17:13:56 星期日</span>
      <span class="username">{{ userInfo.name, }}</span>
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
        .then(()=> {
          this.$router.push({ path: '/login' })
        })
        .catch(()=> {})
    }
  }
}
</script>
<style>
  .add-header {
    & .el-menu-item{
      &.is-active{
        border-bottom: none !important;
      }
      &:hover {
        background-color: inherit !important;
      }
    }
  }

</style>

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
    background-color: #d41c1a;
    display: flex;
    align-items: center;
    justify-content:space-between;
    font-size: 12px;
	color: #ffffff;
  }
  .icon-home {
    background: url("../assets/image/guohui.png") center center no-repeat;
    background-size: 100% 100%;
    width: 39px;
    height: 41px;
    display: inline-block;
    margin-right: 16px;
  }
  .header-home {
    font-size: 28px;
    color: #fdf4f4;
    box-shadow: 0px 0px 6px 0px
      rgba(34, 24, 21, 0.18);
  }
  .user{
    &>span{
      margin-left:20px;
    }
    & .username{
      color: #ffffff;
    }
    & .quit{
      cursor: pointer;
      text-decoration: underline;
    }
  }
  .content {
    flex: 1;
    overflow: auto;
  }
  .item{
    padding:0px 30px;
  }
</style>
