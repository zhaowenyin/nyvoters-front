<template>
  <div class="other" v-loading="loading">
    <div class="top-title">
      <div>>> {{$route.query.title}}</div>
      <el-button
      type="primary"
      @click="download"
      size="small">下载</el-button>
    </div>
    <div class="content">{{data&&data.name || '暂无数据'}}</div>
  </div>
</template>
<script>
import {getOther} from '../service.js'
import output from '../../../utils/output.js'
export default {
  data () {
    return {
      data: {}
    }
  },
  created() {
    this.searchOther()
  },
  props: {
    belongAreaId: {
      default: null,
      type: null
    },
    id: {
      default: '',
      type: String
    }
  },
  watch: {
    belongAreaId () {
      this.searchOther()
    }
  },
  methods: {
    async searchOther () {
      this.loading = true
      const{data} = await getOther({belongAreaId: this.belongAreaId,id: this.id})
      this.data = data.content
      this.loading = false
    },
    async download () {
      try {
        output({url: '/doc/download', param: {id: this.$route.query.id}})
      } catch (err) {
        console.log(err)
      }
    },
  }
}
</script>
<style scoped>
.other {
  height: 100%;
}
.content {
  margin-top: 50px;
  display: flex;
  justify-content: center;
}
.top-title {
  padding: 15px;
  display: flex;
  justify-content:space-between;
}
</style>

