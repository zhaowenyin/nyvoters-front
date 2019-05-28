<template>
  <div class="menu-wrapper">
    <el-menu
      :default-active="activeIndex"
      class="add-menu"
      background-color="#f4f4f4"
      @select="change">
      <el-submenu index="" v-if="/['1'|'2'|'3']/g.test(power.join(','))">
        <template slot="title">
          <img src="../assets/img/11.png" class="icon"/>
          <span>选民登记</span>
        </template>
        <el-menu-item v-if="power.indexOf('1')>-1" class="item" index="/voter-register">选民在线登记</el-menu-item>
        <el-menu-item v-if="power.indexOf('2')>-1" class="item" index="/voter-registers">选民批量导入</el-menu-item>
        <el-menu-item v-if="power.indexOf('3')>-1" class="item" index="/voter-info">选民信息查询</el-menu-item>
      </el-submenu>
       <el-submenu index="1" v-if="/['4'|'5'|'6'|'7'|'8']/g.test(power.join(','))">
        <template slot="title">
          <img src="../assets/img/22.png" class="icon"/>
          <span>选民管理</span>
        </template>
        <el-menu-item v-if="power.indexOf('4')>-1" class="item" index="/voters-qualification">选民资格审查</el-menu-item>
        <el-menu-item v-if="power.indexOf('5')>-1" class="item" index="/voters-transfer">选民转移管理</el-menu-item>
        <el-menu-item v-if="power.indexOf('6')>-1" class="item" index="/voters-input">选民划入管理</el-menu-item>
        <el-menu-item v-if="power.indexOf('7')>-1" class="item" index="/voters-draw">选民划出管理</el-menu-item>
        <el-menu-item v-if="power.indexOf('8')>-1" class="item" index="/voters-apeal">选民申诉管理</el-menu-item>
        <el-menu-item class="item" index="/voters-down">文件资料</el-menu-item>
      </el-submenu>
       <el-submenu v-if="/['9'|'10'|'11'|'12'|'13']/g.test(power.join(','))" index="2">
        <template slot="title">
          <img src="../assets/img/33.png" class="icon"/>
          <span>选区管理</span>
        </template>
          <el-menu-item v-if="power.indexOf('9')>-1" class="item" index="/committee/manage">选委会管理</el-menu-item>
          <el-menu-item v-if="power.indexOf('10')>-1" class="item" index="/district/manage">选区管理</el-menu-item>
          <el-menu-item v-if="power.indexOf('11')>-1" class="item" index="/voter-group">选民小组</el-menu-item>
          <el-menu-item v-if="power.indexOf('12')>-1"  class="item" index="/cut-power">剥权人管理</el-menu-item>
          <el-menu-item v-if="power.indexOf('13')>-1" class="item" index="/down-file">文件资料</el-menu-item>
      </el-submenu>
      <el-submenu v-if="/['15'|'16'|'17'|'18'|'19'|'20']/g.test(power.join(','))" index="3">
        <template slot="title">
          <img src="../assets/img/44.png" class="icon"/>
          <span>代表事务管理</span>
        </template>
        <el-menu-item v-if="power.indexOf('15')>-1" class="item" index="/qual-review">资格审查</el-menu-item>
        <el-menu-item v-if="power.indexOf('16')>-1" class="item" index="/behalf-recommended">代表推荐</el-menu-item>
        <el-menu-item v-if="power.indexOf('17')>-1" class="item" index="/initial-candidate">初步候选人</el-menu-item>
        <el-menu-item v-if="power.indexOf('18')>-1" class="item" index="/official-candidate">正式候选人</el-menu-item>
        <el-menu-item v-if="power.indexOf('19')>-1" class="item" index="/official-behalf">正式代表</el-menu-item>
        <el-menu-item v-if="power.indexOf('20')>-1" class="item" index="/behalf-file">资料管理</el-menu-item>

      </el-submenu>
       <el-submenu index="4" v-if="/['21'|'22']s/g.test(power.join(','))">
        <template slot="title">
          <img src="../assets/img/66.png" class="icon"/>
          <span>报表中心</span>
        </template>
        <el-menu-item v-if="power.indexOf('21')>-1" class="item" index="/report-analysis">报表分析</el-menu-item>
        <el-menu-item v-if="power.indexOf('22')>-1" class="item" index="/report-file">报表文件</el-menu-item>
      </el-submenu>
       <el-submenu index="5" v-if="/['23'|'24'|'25'|'26'|'27'|'28']/g.test(power.join(','))">
        <template slot="title">
          <img src="../assets/img/77.png" class="icon"/>
          <span>系统管理</span>
        </template>
        <el-menu-item v-if="power.indexOf('23')>-1" class="item" index="/region">行政区管理</el-menu-item>
        <el-menu-item v-if="power.indexOf('24')>-1" class="item" index="/basic">基础设置</el-menu-item>
        <el-menu-item v-if="power.indexOf('25')>-1" class="item" index="/file">文件资料管理</el-menu-item>
        <el-menu-item v-if="power.indexOf('26')>-1" class="item" index="/operate">操作日志</el-menu-item>
        <el-menu-item v-if="power.indexOf('27')>-1" class="item" index="/authorization-config">人员配置</el-menu-item>
        <el-menu-item v-if="power.indexOf('28')>-1" class="item" index="/address-book">通讯录</el-menu-item>
      </el-submenu>
      <el-menu-item v-if="power.indexOf('29')>-1" class="item" index="/news"> <i class="el-icon-bell icon"/>消息中心</el-menu-item>
    </el-menu>

  </div>
</template>
<script>
import { getSession } from '../utils/session'
export default {

  data () {
    const authToken = getSession()

    let power = authToken.powers
    // let powers = ['1','2']
    // console.log(11,/['1'|'2'|'3']/g.test(powers.join(',')))
    return {
      power: power
    }
  },
  computed: {
    activeIndex () {
      return this.$route.path
    }
  },
  components: {
  },
  methods: {
    change (index) {
      this.$router.push({ path: index })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .icon {
    width: 18px;
    height: 19px;
    position: relative;
    left: -8px;
    margin-right: 2px;
  }
  .menu-wrapper{
    background-color: #f4f4f4;
    width: 195px;
    border-right:1px solid #ddd;
  }
  .item {
    height: 35px;
    line-height: 35px;
  }
</style>
