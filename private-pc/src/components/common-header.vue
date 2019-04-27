<template>
  <div class="header-wrapper">
    <div class="header-title">
      <i class="logo"></i>
      <span class="header-home">南阳市选民登记系统</span>
      <i class="line" />
      <i class="icon-home" @click="$router.push('/')"></i>
    </div>
    <div class="user">
      <span class="time">{{ currentTime }}</span>
      <el-popover
      placement="bottom"
      width="350"
      trigger="click">
        <ul class="news">
          <!-- <li
          class="item"
          :key="index"
          click="look(i)"
            v-for="(i, index) in news">
            <div class="top">
              <div class="text">{{i.messageType}}</div>
              <div class="time">{{formatDate(i.createTime)}}</div>
            </div>
            <div>{{i.messageContent}}</div>
          </li> -->
          <CommonNew :news="news"/>
          <li class="news-center" @click="jupNews">通知中心</li>
        </ul>
      <el-badge :value="12" slot="reference" class="item">
        <i class='el-icon-bell icon-news'></i>
      </el-badge>
    </el-popover>
      <span class="username">{{ userInfo.name }}</span>
      <span
        class="quit"
        @click="quit">退出</span>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { formatDateTimeZn,formatDate } from '../utils/format.js'
// import{logout} from '../pages/login/service.js'
import CommonNew from './CommonNew'

export default {
  data () {
    return {
      currentTime: null,
      timer: null,
      timeout: null
    }
  },
  computed: {
    ...mapState('commonData', {
      userInfo: state => state.userInfo,
      news:state => state.news
    })
  },
  components: {
    CommonNew
  },
  created () {
    this.getUserInfo()
    this.currentTime = this.formatDateTimeZn(Date.now())
    this.getNews({isRead: null})
    this.timeout = setInterval(() => {
      this.getNews({isRead: null})
    }, 10000)
    this.timer = setInterval(() => {
      this.currentTime = this.formatDateTimeZn(Date.now())
    }, 1000)
  },
  destroyed() {
    clearInterval(this.timer)
    clearInterval(this.timeout)
  },
  methods: {
    ...mapActions('commonData', [
      'getUserInfo',
      'getNews'
    ]),
    quit () {
      this.$confirm('确认退出？')
        .then(async ()=> {
          // await logout()
          // clearSession()
          this.$router.push({ path: '/login' })
        })
        .catch(()=> {})
    },
    jupNews () {
      this.$router.push({path: '/news'})
    },
    formatDateTimeZn,
    formatDate
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
    padding:0px 30px 0 25px;
    background: url("../assets/img/bg.jpg") center center no-repeat;
    background-size: 100% 100%;
    box-shadow:0px 2px 6px 0px rgba(0,0,0,0.22);
    display: flex;
    align-items: center;
    justify-content:space-between;
    color: #06D3D3;
  }
  .logo {
    background: url("../assets/img/logo.png") center center no-repeat;
    background-size: 100% 100%;
    width: 48px;
    height: 51px;
    display: inline-block;
    margin-right: 16px;
  }
  .line {
    width: 1px;
    height: 14px;
    background: #fff;
    margin-left: 24px;
  }
  .icon-home {
    background: url("../assets/img/home.png") center center no-repeat;
    background-size: 100% 100%;
    width: 20px;
    height: 19px;
    display: inline-block;
    margin-left: 16px;
  }
  .header-home {
    font-size: 28px;
    color: #fdf4f4;
  }
  .user{
    &>span{
      margin-left:20px;
    }
    & .time {
      color: #fff;
      font-size: 12px;
    }
    & .username{
      color: #fff;
      margin-left: 40px;
      font-size: 12px;
    }
    & .quit{
      color: #ffc9c9;
      font-size: 12px;
      cursor: pointer;
    }
  }
  .icon-news {
    font-size: 26px;
    color: #000;
    cursor: pointer;
  }
  .news {
    & .item{
      padding-bottom: 8px;
      border-bottom: 1px solid #ddd;
      margin-bottom: 12px;
      cursor: pointer;
      & .top {
        display: flex;
        justify-content: space-between;
        & .text {
          padding-bottom: 8px;
          font-weight: bold;
          color: #000;
        }
      }
    }
    & .news-center {
      margin-top: 30px;
      height: 40px;
      width: 100%;
      line-height: 40px;
      text-align: center;
      background-color: #ddd;
      color: #000;
      cursor: pointer;
    }
  }

</style>
