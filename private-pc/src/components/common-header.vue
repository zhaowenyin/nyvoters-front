<template>
  <div class="header-wrapper">
    <div class="header-title">
      <i class="icon-home"></i>
      <span class="header-home">智慧运营平台</span>
      <el-menu
        :default-active="activeIndex"
        class="header add-header"
        @select="change"
        text-color="#06D3D3"
        active-text-color="#06D3D3"
        mode="horizontal">
        <!-- <el-menu-item
          class="item"
          index="/service">
          服务管理
        </el-menu-item> -->
        <el-menu-item
          class="item"
          index="/gaugeManage">
          量表管理
        </el-menu-item>
      </el-menu>
    </div>
    <div class="user">
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
    activeIndex () {
      return this.$route.path
    }
  },
  created () {
    this.getUserInfo()
  },
  methods: {
    ...mapActions('commonData', [
      'getUserInfo'
    ]),
    change (index) {
      this.$router.push({ path: index })
    },
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
    background:linear-gradient(180deg,rgba(250,254,255,1) 0%,rgba(239,248,248,1) 100%);
    box-shadow:0px 2px 6px 0px rgba(0,0,0,0.22);
    display: flex;
    align-items: center;
    justify-content:space-between;
    color: #06D3D3;
  }
  .icon-home {
    background: url("../assets/img/home.png") center center no-repeat;
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
        background: url("../assets/img/user.png") center center no-repeat;
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
  .header {
    margin-left: 80px;
    background:linear-gradient(180deg,rgba(250,254,255,1) 0%,rgba(239,248,248,1) 100%);
  }
  .content {
    flex: 1;
    overflow: auto;
  }
  .item{
    padding:0px 30px;
  }
</style>
