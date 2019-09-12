<template>
  <div class="out" v-loading="loading">
    <VoterLists
    :belongAreaId="belongAreaId"
    v-if="+type===1"
    :type="type"
    :data="data"/>
    <VoterListsRevised
    :belongAreaId="belongAreaId"
    v-if="+type===3 || +type===4"
    :type="type"
    :data="data"/>
    <TimeRegistration
    :belongAreaId="belongAreaId"
    :type="type"
    :data="data"
    v-if="+type===5"/>
    <VoterCertificate
    @getlist="getlist"
    :type="type"
    :data="data"
    :belongAreaId="belongAreaId"
     v-if="+type===6 || +type===7"
    />
  </div>
</template>
<script>
import {getInfo} from '../service'
import VoterLists from './VoterLists'
import VoterListsRevised from './VoterListsRevised'
import TimeRegistration from './TimeRegistration'
import VoterCertificate from './VoterCertificate'
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
    TimeRegistration,
    VoterCertificate
  },
  watch: {
    belongAreaId () {
      this.searchInfo({belongAreaId: this.belongAreaId})
    }
  },
  created(){
    this.type = this.$route.query.type
    if (this.belongAreaId === '') {
      return
    }
    this.searchInfo({belongAreaId: this.belongAreaId})
  },
  methods: {
    async searchInfo (val) {
      this.loading = true
      const{data} = await getInfo({type:this.$route.query.type,...val,fileName: this.$route.query.title})
      this.data = data
      this.loading = false
    },
    getlist (val) {
      this.searchInfo({belongAreaId: this.belongAreaId,type:this.$route.query.type,button: val})
    }
  }
}
</script>
<style scoped>
  .out {
    height: 100%;
  }
</style>


