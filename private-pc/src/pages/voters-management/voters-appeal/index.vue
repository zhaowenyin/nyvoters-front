<template>
  <div class="view">
    <div class="view-content">
      <el-menu
        :default-active="activeIndex"
        class="add-menu-x"
        @select="change"
        active-text-color="#d41c1a"
        background-color="#f8f8f8"
        mode="horizontal">
        <el-menu-item
          index='/voters-apeal'>
          待处理
        </el-menu-item>
        <el-menu-item
          index="/voters-apeal/history">
         处理记录
        </el-menu-item>
      </el-menu>
      <router-view class="content" />
    </div>
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
  .view{
    display: flex;
  }
  .view-left {
    width: 270px;
    background-color: #ffffff;
    border-right: 1px solid #ddd;
    height: 100%;
    overflow: auto;
    padding-top: 6px;
  }
  .view-content {
    background: #f8f8f8;
    height: 100%;
    flex: 1;
    display: flex;
    flex-direction: column;
    position: relative;
    padding: 0px 20px;
    overflow: auto;
  }
</style>
