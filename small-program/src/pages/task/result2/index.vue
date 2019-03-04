<template>
  <div class="view">
    <CommonHeader
      :back="onBack"
      :title="query.title"/>
    <div class="content">
      <div class="results">
        <div class="title">结果：</div>
        <div
          class="li"
          v-for="(obj, index) in script_result"
          :key="index">
          {{ index + 1 }}、{{obj.result}}
        </div>
      </div>
      <div class="questions">
        <div
          v-if="title"
          class="title">{{ title }}</div>
        <Item
          v-for="(obj, index2) in resultList"
          :key="index2"
          :data="obj"/>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import Item from '../Item2'
import CommonHeader from '../../../components/CommonHeader'
import { Indicator } from 'mint-ui'
import { setSession, getSession } from '../../../utils/session.js'

export default {
  data () {
    return {
      params: {}
    }
  },
  computed: {
    ...mapState('task', {
      resultData: state => state.resultData,
      resultList: state => state.resultList,
      loading: state => state.loading
    }),
    query () {
      return this.$route.query || {}
    },
    title () {
      return this.resultData.content && this.resultData.content.name
    },
    script_result () {
      return this.resultData.script_result || []
    },
  },
  components: {
    Item,
    CommonHeader
  },
  watch: {
    loading (val) {
      val ? Indicator.open() : Indicator.close()
    }
  },
  created () {
    // 获取app传过来的数据
    document.addEventListener('message', (e) => {
      const {name = '', data = {}} = JSON.parse(e.data)
      if (name === 'gps') {
        this.updateGps(data)
      } else if (name === 'session') {
        setSession(data)
      }
    }, false)

    let {resultId, serve_order_id, task_index, citizen_id, source="app"} = this.$route.query
    if (source === "app") {
      let timer = setInterval(() => {
        const authToken = getSession()
        if (authToken) {
          clearInterval(timer)
          if(resultId) {
            this.searchResultList({
              gauge_result_id: resultId,
              serve_order_id,
              task_index,
              citizen_id,
              source
            })
          }
        }
      }, 500)
    } else {
      if(resultId) {
        this.searchResultList({
          gauge_result_id: resultId,
          serve_order_id,
          task_index,
          citizen_id,
          source
        })
      }
    }

  },
  methods: {
    ...mapActions('task', [
      'searchResultList'
    ]),
    onBack () {
      window.postMessage(JSON.stringify({
        name: 'goBack'
      }))
    }
  }
}
</script>
<style scoped>
  .view{
    border-top: 1px solid #D8D8D8;
    display: flex;
    flex-direction: column;
    background: #f2f2f2;
    height: 100%;
    font-size: 13px;
  }
  .content{
    flex: 1;
    padding: 0px 0px 12px;
    overflow: auto;
  }
  .results{
    margin-top: 8px;
    background: #fff;
    padding: 16px 18px 8px;
    & .title{
      font-size:18px;
      color:#333;
      line-height:24px;
      margin-bottom: 8px;
    }
    & .li{
      font-size:18px;
      color:#333;
      line-height:32px;
    }
  }
  .questions{
    margin-top: 8px;
    & .title{
      font-size: 16px;
      font-weight:600;
      padding: 12px 18px;
      color:rgba(51,51,51,1);
      line-height:20px;
      background: #fff;
    }
  }

  .footer{
    height: 48px;
    display: flex;
    align-items: center;
    border-top: 1px solid #D8D8D8;
    & .prev, & .next{
      height: 48px;
      line-height: 48px;
      flex: 1;
      text-align: center;
      color:rgba(51,51,51,1);
      font-size: 16px;
      font-weight:400;
      &.finish{
        background:rgba(6,211,211,1);
        color:rgba(255,255,255,1);

      }
      &.disabled{
       color:rgba(153,153,153,1);
      }
    }
    & .line{
      height: 36px;
      width: 1px;
      background: rgba(216,216,216,1);
    }
  }
</style>
