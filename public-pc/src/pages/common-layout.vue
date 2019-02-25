<template>
  <div class="view-wrapper">
    <common-header class="view-header" />
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
    '$route' (to, from) {
      let list = []
      to.matched.forEach((item) => {
        const {menuName} = item.meta
        if (menuName) {
          const names = menuName.split(',')
          list = list.concat(names)
        }
      })
      this.list = list
      console.log(from)
    }
  }
}
</script>
<style>
  .breadcrumb .el-breadcrumb__inner, .breadcrumb .el-breadcrumb__separator {
    color: #000 !important;
  }
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
  }
  .breadcrumb {
    display: flex;
    margin: 22px 42px 10px 42px;
    border-bottom: 1px dashed #D3D3D3;
    padding-bottom: 10px;
    align-items: center;
    min-height: 24px;
  }
  .breadcrumb-label {
    font-size: 14px;
    line-height: 1;
    color: #000;
  }
</style>
