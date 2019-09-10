<template>
  <div class="other" v-loading="loading">
    <div class="top-title">
      <div class="title">>> {{$route.query.title}}</div>
      <el-button
        v-if="$route.query.title==='选举委员会关于选民名单公告（2）'"
        type="primary"
        @click="fomatDownload"
        size="small">正式公告</el-button>
      <el-button
      type="primary"
      @click="download"
      size="small">下载</el-button>
    </div>
    <div class="content">
      <div v-html="data"/>
    </div>
  </div>
</template>
<script>
import {getOther} from '../service.js'
import output from '../../../../utils/output.js'
export default {
  data () {
    return {
      data: {},
      loading: false
    }
  },
  created() {
    if(this.belongAreaId) {
      this.searchOther()
    }

  },
  props: {
    belongAreaId: {
      default: null,
      type: null
    },
    id: {
      default: '',
      type: String
    },
  },
  watch: {
    belongAreaId () {
      this.searchOther()
    }
  },
  methods: {
    async searchOther () {
      this.loading = true
      const{data} = await getOther({belongAreaId: this.belongAreaId,id: this.id,fileName: this.$route.query.title})
      this.data = data
      this.loading = false
    },
    async download () {
      try {
        output({url: '/doc/download', param: {id: this.$route.query.id,belongAreaId: this.belongAreaId,fileName: this.$route.query.title}})
      } catch (err) {
        console.log(err)
      }
    },
    async fomatDownload () {
      try {
        output({url: '/doc/download', param: {id: this.$route.query.id,belongAreaId: this.belongAreaId,fileName: this.$route.query.title}})
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
  overflow: auto;
}
.top-title {
  padding: 15px;
  display: flex;
  & .title {
    flex: 1;
  }
}
</style>

