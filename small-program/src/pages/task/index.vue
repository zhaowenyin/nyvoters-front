<template>
  <div class="view">
    {{ autoDataValidate }}
    <CommonHeader
      :back="onBack"
      :title="query.title || ''"/>
    <div
      ref="content"
      class="content">
      <div
        v-if="aiPrecent"
        class="warn">AI答题助手：检测您近期的服务记录，已为您完成了{{aiPrecent}}%问卷内容，请您审阅谢谢~</div>
      <div class="numIndex">
        <span class="index">{{ index + 1 }}</span>
        <span class="total">/{{ len }}</span>
      </div>
      <div
        v-if="title"
        class="title">{{ title }}</div>
      <Item
        v-for="(obj, index) in currentItem"
        :key="index"
        :data="obj"/>
      <IOSKeyboard />
    </div>
    <div
      class="footer">
      <div
        @click="prev"
        :class="['prev', {disabled: index === 0}]">上一页</div>
      <div class="line" />
      <div
        @click="submit"
        v-if="index === (len - 1)"
        :class="['next']">预览结果</div>
      <div
        @click="next"
        v-else
        class="next">下一页</div>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import { Indicator } from 'mint-ui'
import Item from './Item'
import CommonHeader from '../../components/CommonHeader'
import IOSKeyboard from '../../components/IOSKeyboard'
import { isEmpty } from '../../utils/validate.js'
import { setSession, getSession } from '../../utils/session.js'

export default {
  data () {
    return {
      index: 0
    }
  },
  computed: {
    ...mapState('task', {
      loading: state => state.loading,
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
    aiPrecent () {
      let index = 0
      let len = 0
      for (const obj of this.taskList) {
        for (const obj2 of obj) {
          len++
          if (obj2.default_answer && obj2.default_answer.length > 0) index++
        }
      }
      if (len) return (index / len * 100).toFixed(0)
      return 0
    },
    query () {
      return this.$route.query || {}
    },
    currentItem () {
      return this.taskList[this.index] || []
    },
    title () {
      return this.allData.content && this.allData.content.name
    },
    len () {
      return this.taskList.length
    },
    autoDataValidate () { // 前端校验
      const {content = {}} = this.allData
      const {app_frontend_config = '{}'} = content
      const validate = JSON.parse(app_frontend_config).validate || []
      for (const {type, items = []} of validate) {

        if (type === 1) { // 极值校验
          let A = null
          for (const obj2 of this.taskList) {
            for (const obj3 of obj2) {
              if (obj3.frontend_id === items[0]) {
                A = obj3
                break
              }
            }
            if (A) break
          }
          if (A) {
            const maxNumber = items[1]
            const minNumber = items[2]
            if (!isEmpty(maxNumber) && !isEmpty(A.value) && (+A.value) > (+maxNumber)) {
              A.error = `${A.name}的结果，不应大于${maxNumber}`
            } else if (!isEmpty(minNumber) && !isEmpty(A.value) && (+A.value) < (+minNumber)) {
              A.error = `${A.name}的结果，不应小于${minNumber}`
            } else if (A.error === `${A.name}的结果，不应大于${maxNumber}` || A.error === `${A.name}的结果，不应小于${minNumber}`) {
              A.error = ''
            }
          }
        } else if (type === 2) { // bmi
          let A = null
          let B = null
          let C = null
          for (const obj2 of this.taskList) {
            for (const obj3 of obj2) {
              if (obj3.frontend_id === items[0]) {
                A = obj3
              } else if (obj3.frontend_id === items[1]) {
                B = obj3
              } else if (obj3.frontend_id === items[2]) {
                C = obj3
              }
              if (A && B && C) break
            }
            if (A && B && C) break
          }
          if (A && B && C) {
            if (+A.value && +B.value) {
              C.value = (+B.value / ((+A.value / 100) * (+A.value / 100))).toFixed(2)
            } else {
              C.value = ''
            }
          }
        } else if (type === 3) { // 数值比较
          let A = null
          let B = null
          for (const obj2 of this.taskList) {
            for (const obj3 of obj2) {
              if (obj3.frontend_id === items[0]) {
                A = obj3
              } else if (obj3.frontend_id === items[1]) {
                B = obj3
              }
              if (A && B) break
            }
            if (A && B) break
          }
          if (A && B) {
            if (items[2] && (+A.value) > (+B.value)) {
              A.error = items[2]
              B.error = items[2]
            } else if (items[3] && (+A.value) === (+B.value)) {
              A.error = items[3]
              B.error = items[3]
            } else if (items[4] && (+A.value) < (+B.value)) {
              A.error = items[4]
              B.error = items[4]
            } else {
              if (A.error === items[2] || A.error === items[3] || A.error === items[4]) {
                A.error = ''
              }
              if (B.error === items[2] || B.error === items[3] || B.error === items[4]) {
                B.error = ''
              }
            }
          }
        }

      }
      return null
    }
  },
  components: {
    Item,
    CommonHeader,
    IOSKeyboard
  },
  watch: {
    loading (val) {
      val ? Indicator.open() : Indicator.close()
    },
    $route () {
      const {index = 0} = this.$route.query
      this.index = +index
    },
    index () {
      this.$refs.content.scrollTop = 0
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      const {index = 0, serve_id = '', task_index = '', source="app"} = vm.$route.query
      vm.index = +index
      if (from.path === '/html' || from.path === '/confirm' || from.path === '/medicine') return //确认返回不需要重新加载
      // 模拟登录，更新一下token
      // setSession({token: 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX3R5cGUiOjEsInVzZXJfaWQiOjMxLCJpYXQiOjE1NTE0MzA5MTcsImV4cCI6MTU1OTIwNjkxN30.0i5M_zjA6pMj2NTj-q3nVzEGhDkD4JUeHee_I4cd8AGIsFts3JNXcSJwOBYJsrsvHoKH_ePlMCzYKkEWsQ8Nsw'})
      // 通过 `vm` 访问组件实例
      vm.clearState()
      if (source === "app") {
        let timer = setInterval(() => {
          const authToken = getSession()
          if (authToken) {
            clearInterval(timer)
            vm.getListData({
              id: serve_id,
              task_index: task_index,
              source
            })
          }
        }, 500)
      } else {
        vm.getListData({
          id: serve_id,
          task_index: task_index,
          source
        })
      }

    })
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
  },
  methods: {
    ...mapMutations('task', [
      'clearState',
      'updateGps'
    ]),
    ...mapActions('task', [
      'getListData'
    ]),
    onBack () {
      if (this.index) {
        this.$router.go(-1)
      } else {
        window.postMessage(JSON.stringify({
          name: 'goBack'
        }))
      }
    },
    prev () {
      if (this.index > 0) {
        this.index--
        this.$router.push({query: {...this.$route.query, index: this.index}})
      }
    },
    nextVali () {
      for (const obj of this.currentItem) {
        if (obj.question && obj.question.isRequired) {
          if (!obj.value || (toString.call(obj.value) === '[object Array]' && obj.value.length === 0)) {
            obj.error = '该题为必填项'
          } else if (obj.error === '该题为必填项') {
            obj.error = ''
          }
        }
      }
      for (const obj of this.currentItem) {
        if (obj.error) {
          return false
        }
      }
      return true
    },
    next () {
      if (!this.nextVali()) return
      if (this.index < this.len - 1) {
        this.index++
        this.$router.push({query: {...this.$route.query, index: this.index}})
      }
    },
    submit () {
      if (!this.nextVali()) return
      this.$router.push({
        path: '/confirm',
        query: {
          title: this.$route.query.title,
          serve_order_id: this.$route.query.serve_id,
          task_index: this.$route.query.task_index,
          source: this.$route.query.source
        }
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
  .warn {
    background:rgba(255,236,206,1);
    padding: 8px 18px;
    text-align: center;
    font-size:14px;
    color:rgba(250,118,75,1);
    line-height:24px;
      }
  .numIndex{
    font-size: 16px;
    color:#333;
    font-weight: bold;
    padding: 12px 18px;
    line-height: 1;
    background: #fff;
  }
  .title{
    font-size: 16px;
    font-weight:600;
    padding: 0px 18px 12px;
    color:rgba(51,51,51,1);
    line-height:20px;
    background: #fff;
  }
  .footer{
    height: 48px;
    display: flex;
    align-items: center;
    background: #fff;
    border-top: 1px solid #D8D8D8;
    & .prev, & .next{
      flex: 1;
      text-align: center;
      color:rgba(51,51,51,1);
      font-size: 15px;
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
