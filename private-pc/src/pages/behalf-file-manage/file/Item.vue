<template>
  <div class="out" v-loading="loading">
    <InitialCandidate
    :belongAreaId="belongAreaId"
    v-if="+type===1 || +type===2"
    :type="type"
    :data="data"/>
    <OfficialCandidate
    :belongAreaId="belongAreaId"
    v-if="+type===3 || +type===4"
    :type="type"
    :data="data"/>
    <OfficialBehalf
    :belongAreaId="belongAreaId"
    v-if="+type===6"
    :type="type"
    :data="data"/>
    <Announcement
    :belongAreaId="belongAreaId"
    :type="type"
    :data="data"
    v-if="+type===5"/>
  </div>
</template>
<script>
import {getInfo,getAnnouncement} from '../service'
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
      const {type} = this.$route.query
      if(+type===5) {
        this.searchAnnouncement({belongAreaId: this.belongAreaId,})
      } else {
        let statusList = this.handerstatus(+type)
        this.searchInfo({belongAreaId: this.belongAreaId,statusList})
      }
    }
  },
  created(){
    const {type} = this.$route.query
    let statusList = this.handerstatus(+type)
    this.type = this.$route.query.type
    if (this.belongAreaId === '') {
      return
    }
    if(+type===5) {
      this.searchAnnouncement({belongAreaId: this.belongAreaId,statusList})
    } else {

      this.searchInfo({belongAreaId: this.belongAreaId,statusList})
    }

  },
  methods: {
    async searchInfo (val) {
      this.loading = true
      const{data} = await getInfo(val)
      this.data = data.content
      this.loading = false
    },
    async searchAnnouncement (val) {
      this.loading = true
      const{data} = await getAnnouncement(val)
      this.data = data.content
      this.loading = false
    },

    handerstatus(fileName) {
      let text = []
      switch(fileName) {
      case 1:
        text = ['PRELIMINARY_CANDIDATE']
        break
      case 2:
        text = ['PRELIMINARY_CANDIDATE','FORMAL_CANDIDATE']
        break
      case 3:
        text = ['FORMAL_CANDIDATE']
        break
      case 4:
        text = ['FORMAL_CANDIDATE']
        break
      case 6:
        text = ['FORMAL_REPRESENTATIVE']
        break
      case 5:
        text = ['WAIT_SUBMIT']
        break
      default:
        text = []
      }
      return text
    },
  }
}
</script>
<style scoped>
  .out {
    height: 100%;
  }
</style>


