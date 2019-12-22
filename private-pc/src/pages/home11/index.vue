<template>
  <div class="view">
    <ul class="top-info">
      <li>
        <div class="small-text">总人口数</div>
        <div class="number">{{data.peopleNum}}</div>
      </li>
       <li>
        <div class="small-text">已登记选民数</div>
        <div class="number">{{data.regVotersNum	}}</div>
      </li>
      <li class="last">
        <div class="small-text">正式选民数</div>
        <div class="number">{{data.votersNum}}</div>
      </li>
    </ul>
    <div class="content-title">选民统计图</div>
    <CenbterChart :data="data.votersCounts" height="300px"/>
    <Tabel :list="data.votersCounts"/>
    <div class="content-title">登记情况综合统计</div>
    <el-row :gutter="20">
      <el-col :span="12" class="pie">
        <div class="text">登记类型</div>
        <Pie :data="data.registerTypeGraphs"/>
      </el-col>
      <el-col :span="12" class="pie">
        <div class="text">参选地</div>
        <Pie :data="data.candidateTypeGraphs"/>
      </el-col>
      <!-- <el-col :span="8" class="pie">
        <div class="text">采集方式</div>
        <Pie :data="data.idTypeGraphs"/>
      </el-col> -->
    </el-row>
    <el-row :gutter="20">
        <el-col :span="12" class="pie">
          <div class="text">对比不通过人次</div>
          <Pie :data="data.verifyFailGraphs"/>
        </el-col>
        <el-col :span="12" class="pie">
          <div class="text">未通过资格审查</div>
          <Pie :data="data.reviewFailGraphs"/>
        </el-col>
    </el-row>
  </div>
</template>
<script>
import { mapMutations } from 'vuex'
import CenbterChart from './CenbterChart'
import Tabel from './Tabel'
import Pie from './Pie'
import {getList, bindPhone} from './service.js'
import { getSession } from '../../utils/session'
export default {
  data () {
    const authToken = getSession()
    return {
      list: [],
      data: {},
      bindLoading: false,
      authToken
    }
  },
  computed: {

  },
  components: {
    CenbterChart,
    Pie,
    Tabel
  },
  created () {
    // 初始化清除数据
    if(!this.authToken.phoneNum) {
      this.isfirstLogin()
    }

    this.clearState()
    this.Searchlist()
  },
  methods: {
    ...mapMutations('home', [
      'clearState'
    ]),
    isfirstLogin () {
      this.$prompt('手机号','绑定手机号', {
        confirmButtonText: '确定',
        showClose: false,
        showCancelButton: false,
        closeOnClickModal: false,
        inputPattern: /^1[34578]\d{9}$/,
        inputErrorMessage: '手机号格式不正确',
        beforeClose: (action,instance, done) => {
          if (action === 'confirm') {
            instance.confirmButtonLoading = true
            instance.confirmButtonText = '执行中...'
            if(!this.bindLoading) {
              instance.confirmButtonLoading = false
              done()
            }
          } else {
            done()
          }
        }

      }).then(({ value }) => {
        this.bindPhone(value)
      }).catch(() => {

      })
    },
    async Searchlist() {
      const {data} = await getList()
      this.data = data.content
    },
    async bindPhone(val) {
      this.bindLoading = true
      await bindPhone({phoneNum: val})
      this.bindLoading = false
    },
  }
}
</script>
<style scoped>
  .view{
    padding: 24px 23px;
    /* height:100%; */
    width: 100%;
    color: #000000;
    & .top-info {
      display: flex;
      & li {
        height: 183px;
        border: solid 1px #dddddd;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        flex: 1;
        margin-right: 51px;
      }
      & .last {
         margin-right: 0px;
      }
    }
  }
  .small-text {
    font-size: 20px;
    line-height: 25px;
    margin-bottom: 25px;
  }
  .number {
    font-size: 36px;
    line-height: 25px;

  }
  .content-title {
    font-size: 20px;
	line-height: 25px;
    padding: 34px 0 24px 0;
    text-align: center;
  }
  .pie {
    /* height:400px; */
  }
  .text {
    text-align: center;
    font-size: 20px;
    margin: 10px;
  }
</style>
