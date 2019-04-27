<template>
  <div class="out" v-loading="loading">
    <InitialCandidate
    v-if="+type===1 || +type===2"
    :type="type"
    :data="data"/>
    <OfficialCandidate
    v-if="+type===3 || +type===4"
    :type="type"
    :data="data"/>
    <OfficialBehalf
    v-if="+type===5"
    :type="type"
    :data="data"/>
    <Announcement
    :type="type"
    :data="data"
    v-if="+type===6"/>
  </div>
</template>
<script>
import {getInfo} from '../service'
import InitialCandidate from './InitialCandidate'
import OfficialCandidate from './OfficialCandidate'
import OfficialBehalf from './OfficialBehalf'
import Announcement from './Announcement'
export default {
  data(){
    return {
      type: null,
      data: '',
      loading: false
    }
  },
  props: {
    belongAreaId: {
      default: null,
      type: null
    },
  },
  components: {
    InitialCandidate,
    OfficialCandidate,
    OfficialBehalf,
    Announcement
  },
  watch: {
    belongAreaId () {
      this.searchInfo({belongAreaId: this.belongAreaId,statusList: [status]})
    }
  },
  created(){
    const {status} = this.$route.query
    this.type = this.$route.query.type
    this.searchInfo({belongAreaId: this.belongAreaId,statusList: [status]})
  },
  methods: {
    async searchInfo (val) {
      this.loading = true
      const{data} = await getInfo(val)
      this.data = data.content
      this.loading = false
    }
  }
}
</script>
<style scoped>
  .out {
    height: 100%;
  }
</style>


