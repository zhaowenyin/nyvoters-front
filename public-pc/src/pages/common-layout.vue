<template>
  <div class="view-wrapper">
    <common-header class="view-header" />
    <div class="out">
      <div class="breadcrumb">
        <el-breadcrumb class="view-breadcrumb" separator=">">
          <el-breadcrumb-item
            v-for="{path, name} in breadcrumb" :key="path" :to="{ path: path }">{{name}}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div v-if="$route.path==='/register'" class="remind-info">欢迎您在线自助提交选民登记信息，请确保所填信息的准确性，以免影响登记审核结果</div>
    </div>

    <div class="view-content">
       <router-view class="view-right-content" />
    </div>
  </div>
</template>

<script>
import CommonHeader from '../components/common-header'
import {mapState} from 'vuex'
export default {
  data () {
    return {
      breadcrumb: []
    }
  },
  components: {
    CommonHeader
  },
  computed: {
    ...mapState('commonData', {

    })
  },
  watch: {
    $route (route) {
      if (route.meta.history) {
        let isHas = true
        this.breadcrumb = this.breadcrumb.filter(({name}) => {
          if (name === route.name) isHas = false
          return isHas
        })
        this.breadcrumb.push({
          path: route.fullPath,
          name: route.meta.name
        })
        return
      }
      const newR = route.matched.filter(({ path, name }) => {
        return path !== '/' && name
      }).map(({ path, meta, name }) => {
        if (name === this.$route.name) path = this.$route.fullPath
        return { path,name: meta.name }
      })
      newR.unshift({
        path: '/',
        name: '首页'
      })
      this.breadcrumb = newR
    }
  },
  created () {
    const newR = this.$route.matched.filter(({ path, name }) => {
      return path !== '/' && name
    }).map(({ path, meta, name }) => {
      if (name === this.$route.name) path = this.$route.fullPath
      return { path, name: meta.name }
    })
    newR.unshift({
      path: '/',
      name: '首页'
    })
    this.breadcrumb = newR
  }
}
</script>
<style>
  /* .breadcrumb .el-breadcrumb__inner, .breadcrumb .el-breadcrumb__separator {
    color: #000 !important;
  } */
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .view-wrapper {
    height: 100%;
    display: flex;
    flex-direction: column;
    background-color: #f4f4f4;
  }
  .view-content {
    flex: 1;
    display: flex;
    overflow: auto;
  }
  .view-left {
    overflow: auto;
  }
  .view-right {
    display: flex;
    flex: 1;
    overflow: auto;
    flex-direction: column;
    &-content {
      flex: 1;
      overflow: auto;
    }
  }
  .out {
    padding-top: 10px;
    padding-bottom: 20px;
    width: 960px;
    margin:0 auto;
    display:flex;
    justify-content:space-between;

  }
  .breadcrumb {
    font-size: 18px;
  }
  .breadcrumb-label {
    line-height: 1;
    color: #000;
  }
  .remind-info {
    font-size: 16px;
	color: #d02626;
  }
  .view-wrapper .el-breadcrumb {
    font-size: 18px;
}
</style>
