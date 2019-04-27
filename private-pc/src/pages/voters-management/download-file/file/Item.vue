<template>
  <div class="out" v-loading="loading">
    <VoterLists
    v-if="+type===1"
    :type="type"
    :data="data"/>
    <VoterListsRevised
    v-if="+type===3 || +type===4"
    :type="type"
    :data="data"/>
    <TimeRegistration
    :type="type"
    :data="data"
    v-if="+type===5"/>
  </div>
</template>
<script>
import {getInfo} from '../service'
import VoterLists from './VoterLists'
import VoterListsRevised from './VoterListsRevised'
import TimeRegistration from './TimeRegistration'
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
    VoterLists,
    VoterListsRevised,
    TimeRegistration
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


