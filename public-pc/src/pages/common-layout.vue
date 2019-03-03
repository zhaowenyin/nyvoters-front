<template>
  <div class="view-wrapper">
    <common-header class="view-header" />
    <div class="breadcrumb">
      <el-breadcrumb class="view-breadcrumb" separator=">">
        <el-breadcrumb-item
          v-for="{path, name} in breadcrumb" :key="path" :to="{ path: path }">{{name}}</el-breadcrumb-item>
      </el-breadcrumb>
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
  .view-breadcrumb {
    width: 960px;

  }
  .breadcrumb {
    display: flex;
    justify-content: center;
    padding-top: 22px;
  }
  .breadcrumb-label {
    font-size: 14px;
    line-height: 1;
    color: #000;
  }
</style>
