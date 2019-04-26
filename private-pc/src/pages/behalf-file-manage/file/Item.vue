<template>
  <div class="out">
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
  </div>
</template>
<script>
import {getInfo} from '../service'
import InitialCandidate from './InitialCandidate'
import OfficialCandidate from './OfficialCandidate'
import OfficialBehalf from './OfficialBehalf'
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
    OfficialBehalf
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


