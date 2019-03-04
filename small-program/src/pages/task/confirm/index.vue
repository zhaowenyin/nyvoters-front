<template>
  <div class="view">
    <CommonHeader
      :back="onBack"
      :title="query.title"/>
    <div class="content">
      <div
        v-if="title"
        class="title">{{ title }}</div>
      <div
        v-for="(currentItem, index) in taskList"
        :key="index">
        <Item
          v-for="(obj, index2) in currentItem"
          :key="index2"
          :data="obj"/>
      </div>
    </div>

    <div
      class="footer">
      <div
        @click="submit"
        class="next finish">确认提交</div>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import Item from '../Item2'
import CommonHeader from '../../../components/CommonHeader'
import { getImgUrl } from '../service.js'

export default {
  data () {
    return {
      params: {}
    }
  },
  computed: {
    ...mapState('task', {
      taskList: state => { // 显示隐藏
        let showArr = []
        for (const obj of state.taskList) {
          for (const obj2 of obj) {
            if ((obj2.type === 1 || obj2.type === 2) && obj2.value && obj2.value.length > 0) {
              for (let value of obj2.value) {
                if (obj2.question.options && obj2.question.options.length > 0) {
                  for (let item of obj2.question.options) {
                    if (item.value === value) {
                      if (item.visibles) showArr = showArr.concat(item.visibles)
                      break
                    }
                  }
                }
              }
            }
          }
        }
        return state.taskList.map(obj => {
          return obj.filter(obj2 => obj2.question.isVisible || showArr.find(index => index === obj2.frontend_id))
        }).filter(obj => obj && obj.length > 0)
      },
      allData: state => state.allData
    }),
    query () {
      return this.$route.query || {}
    },
    title () {
      return this.allData.content && this.allData.content.name
    },
  },
  components: {
    Item,
    CommonHeader
  },
  watch: {

  },
  created () {
    this.result = this.resultList
    this.params = this.$route.query
  },
  methods: {
    ...mapActions('task', [
      'submitData'
    ]),
    onBack () {
      this.$router.go(-1)
    },
    async submit () {
      const data = JSON.parse(JSON.stringify(this.taskList))
      const citizen_id = this.allData.citizen_id
      const result = []
      for (const obj of data) {
        for (const obj2 of obj) {
          const question_id = obj2.id
          const frontend_id = obj2.frontend_id
          const type = obj2.type
          let value = obj2.value
          if (obj2.type === 6 && /^data:image/g.test(value)) {
            const {data} = await getImgUrl({
              file: value
            })
            value = data.url
          }
          if (obj2.type === 8) {
            value = JSON.stringify(obj2.value)
          }
          let answer = []
          if (toString.call(value) === '[object Array]') {
            answer = value
          } else if (value){
            answer = [value]
          }
          result.push({
            question_id,
            frontend_id,
            label_id: obj2.label_id,
            type,
            answer
          })
        }
      }
      this.submitData({
        query: this.$route.query,
        citizen_id,
        result
      })
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
  .title{
    font-size: 16px;
    font-weight:600;
    padding: 12px 18px;
    color:rgba(51,51,51,1);
    line-height:20px;
    background: #fff;
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
