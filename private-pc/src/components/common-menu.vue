<template>
  <div class="menu-wrapper">
    <el-menu
      :default-active="activeIndex"
      class="add-menu"
      background-color="#f4f4f4"
      @select="change">
      <el-submenu index="">
        <template slot="title">
          <img src="../assets/img/11.png" class="icon"/>
          <span>选民登记</span>
        </template>
        <el-menu-item class="item" index="/voter-register">选民在线登记</el-menu-item>
        <el-menu-item class="item" index="/voter-registers">选民批量导入</el-menu-item>
        <el-menu-item class="item" index="/voter-info">选民信息查询</el-menu-item>
      </el-submenu>
       <el-submenu index="1">
        <template slot="title">
          <img src="../assets/img/22.png" class="icon"/>
          <span>选民管理</span>
        </template>
        <el-menu-item class="item" index="/voters-qualification">选民资格审查</el-menu-item>
        <el-menu-item class="item" index="/voters-transfer">选民转移管理</el-menu-item>
        <el-menu-item class="item" index="/voters-input">选民划入管理</el-menu-item>
        <el-menu-item class="item" index="/voters-draw">选民划出管理</el-menu-item>
        <el-menu-item class="item" index="/voters-apeal">选民申诉管理</el-menu-item>
        <el-menu-item class="item" index="/voters-down">文件资料</el-menu-item>
      </el-submenu>
       <el-submenu index="2">
        <template slot="title">
          <img src="../assets/img/33.png" class="icon"/>
          <span>选区管理</span>
        </template>
          <el-menu-item class="item" index="/committee/manage">选委会管理</el-menu-item>
          <el-menu-item class="item" index="/district/manage">选区管理</el-menu-item>
          <el-menu-item class="item" index="/voter-group">选民小组</el-menu-item>
          <el-menu-item class="item" index="/cut-power">剥权人管理</el-menu-item>
          <el-menu-item class="item" index="/down-file">文件资料</el-menu-item>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">
          <img src="../assets/img/44.png" class="icon"/>
          <span>代表事务管理</span>
        </template>
        <el-menu-item class="item" index="/qual-review">资格审查</el-menu-item>
        <el-menu-item class="item" index="/behalf-recommended">代表推荐</el-menu-item>
        <el-menu-item class="item" index="/initial-candidate">初步候选人</el-menu-item>
        <el-menu-item class="item" index="/official-candidate">正式候选人</el-menu-item>
        <el-menu-item class="item" index="/official-behalf">正式代表</el-menu-item>
        <el-menu-item class="item" index="/behalf-file">资料管理</el-menu-item>

      </el-submenu>
       <el-submenu index="4">
        <template slot="title">
          <img src="../assets/img/66.png" class="icon"/>
          <span>报表中心</span>
        </template>
        <el-menu-item class="item" index="/report-analysis">报表分析</el-menu-item>
        <el-menu-item class="item" index="/report-file">报表文件</el-menu-item>
      </el-submenu>
       <el-submenu index="5">
        <template slot="title">
          <img src="../assets/img/77.png" class="icon"/>
          <span>系统管理</span>
        </template>
        <el-menu-item class="item" index="/region">行政区管理</el-menu-item>
        <el-menu-item class="item" index="/basic">基础设置</el-menu-item>
        <el-menu-item class="item" index="/file">文件资料管理</el-menu-item>
        <el-menu-item class="item" index="/operate">操作日志</el-menu-item>
      </el-submenu>
      <el-menu-item class="item" index="/news"> <i class="el-icon-bell icon"/>消息中心</el-menu-item>
    </el-menu>

  </div>
</template>
<script>
export default {
  data () {
    return {
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
