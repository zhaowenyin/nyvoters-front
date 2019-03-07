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
      <el-submenu index="">
        <template slot="title">
          <img src="../assets/img/44.png" class="icon"/>
          <span>代表事务管理</span>
        </template>
        <el-menu-item class="item" index="/qual-review">资格审查</el-menu-item>
        <el-menu-item class="item" index="/behalf-recommended">代表推荐</el-menu-item>
      </el-submenu>
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
