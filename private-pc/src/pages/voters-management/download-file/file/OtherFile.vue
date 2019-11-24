<template>
  <div class="other" v-loading="loading">
    <div class="top-title">
      <div class="title">>> {{$route.query.title}}</div>
      <el-button
        v-if="$route.query.title==='选举委员会关于选民名单公告（2）'"
        type="primary"
        @click="fomatDownload"
        size="small">{{data1.button}}</el-button>
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
import {getOther,getInfo} from '../service.js'
import output from '../../../../utils/output.js'
export default {
  data () {
    return {
      data: {},
      loading: false,
      data1 :{}
    }
  },
  created() {
    if(this.belongAreaId) {
      this.searchOther()
    }
    if(this.$route.query.title==='选举委员会关于选民名单公告（2）') {
      this.searchInfo()
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
      if(this.$route.query.title==='选举委员会关于选民名单公告（2）') {
        this.searchInfo()
      }
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
        console.log(122,{id: this.$route.query.id,belongAreaId: this.belongAreaId,fileName: this.$route.query.title,button: this.data1.button})
        output({url: '/doc/download', param: {id: this.$route.query.id,belongAreaId: this.belongAreaId,fileName: this.$route.query.title,button: this.data1.button}})
      } catch (err) {
        console.log(err)
      }
    },
    async searchInfo () {
      const{data} = await getInfo({type:1,belongAreaId: this.belongAreaId,fileName: this.$route.query.title})
      this.data1 = data
      console.log(12222,this.data1)
    },
  }
}
</script>
<style scoped>
.other {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.content {
  overflow: auto;
  flex:1;
}
.top-title {
  padding: 15px;
  display: -webkit-box;
  justify-content:space-between;
}
</style>

