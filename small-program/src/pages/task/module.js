import { getList, getListPc, answerQuestion, answerQuestionPc, getResultList, getResultListPc, getMedicineList, uploadGeoPostion} from './service'
import router from '../../router'

export default {
  namespaced: true,
  state: {
    taskList: [],
    loading: false,
    allData: {},
    gps: null,
    resultData: {}, // 结果总数据
    resultList: [], // 和taskList类似，没有分页
    medicineItem: {},
    medicineList: [],
    currentItem: {},
    type: ''
  },
  mutations: {
    clearState (state) {
      state.taskList = []
      state.loading = false
      state.allData = {}
      state.resultData = {}
      state.resultList = []
      state.medicineItem = {}
      state.medicineList = []
      state.currentItem = {}
    },
    showLoading (state) {
      state.loading = true
    },
    hideLoading (state) {
      state.loading = false
    },
    updateGps (state, payload) {
      state.gps = payload
    },
    updateList (state, payload) {
      const {content = {}} = payload.data
      const {app_frontend_config = '{}', questions = []} = content
      const orderArr = JSON.parse(app_frontend_config).order || []
      state.taskList = orderArr.map(obj => {
        obj = obj.map(obj2 => {
          const item = questions.find(item => item.frontend_id === obj2)
          if (item) {
            item.question = JSON.parse(item.question)
            if (item.type === 1) {
              if (item.question.hasNoknow) {
                item.question.options && item.question.options.push({
                  label: '不清楚',
                  value: '不清楚',
                  visibles: item.question.hasNoknow_visibles
                })
              }
            } else if (item.type === 2) {
              if (item.question.hasNoknow) {
                item.question.options && item.question.options.push({
                  label: '不清楚',
                  value: '不清楚',
                  visibles: item.question.hasNoknow_visibles
                })
              }
              if (item.question.hasNoAll) {
                item.question.options && item.question.options.push({
                  label: '以上都不是',
                  value: '以上都不是',
                  visibles: item.question.hasNoAll_visibles
                })
              }
            } else if (item.type === 5) {
              item.question.html = item.question.html.replace(/(?=[^>])[^<>]*(?=[<$])/g, function(match){
                return match.replace(/ /g, '&nbsp;').replace(/\n/g, '<br/>')
              })
              item.question.isRequired = false
            }
            item.error = '' // 报错信息
            if (item.type === 1 || item.type === 2) { // 单选和多选是数组
              item.value = item.default_answer || item.label_default_answer || null // 可能为数组，可能为字符串
            } else {
              item.value = (item.default_answer && item.default_answer[0]) || (item.label_default_answer && item.label_default_answer[0]) || null // 可能为数组，可能为字符串
            }
            if (item.type === 8 && item.value) { // 药品是json字符串
              item.value = JSON.parse(item.value)
            }
            return item
          } else {
            return null
          }

        }).filter(obj => obj)
        return obj
      }).filter(obj => obj && obj.length > 0)
      state.allData = payload.data
    },
    updateResults(state, payload) {
      const {answers = [], content={}} = payload.data
      const {questions = []} = content
      let showArr = []
      state.resultList = questions.map(item => {
        item.question = JSON.parse(item.question)
        const {answer = []} = answers.find(obj => obj.frontend_id === item.frontend_id) || {}
        if (answer && answer.length > 0) {
          if (item.type === 1 || item.type === 2) { // 单选和多选是数组
            item.value = answer
          } else {
            item.value = answer[0]
          }
        } else {
          item.value = null
        }
        if (item.type === 8 && item.value) { // 药品是json字符串
          item.value = JSON.parse(item.value)
        }
        if ((item.type === 1 || item.type === 2) && item.value && item.value.length > 0) {
          for (let value of item.value) {
            if (item.question.options && item.question.options.length > 0) {
              for (let item of item.question.options) {
                if (item.value === value) {
                  if (item.visibles) showArr = showArr.concat(item.visibles)
                  break
                }
              }
            }
          }
        }
        item.error = '' // 报错信息
        return item
      }).filter(obj2 => obj2.question.isVisible || showArr.find(index => index === obj2.frontend_id))
      state.resultData = payload.data
    },
    saveMedicine (state, payload) {
      state.medicineItem = payload.payload
    },
    updateMedicineList (state, payload) {
      state.medicineList = payload.data.list
    },
    saveCurrentItem (state,payload) {
      for (let i of state.taskList) {
        for(let item of i) {
          if(item.frontend_id === payload) {
            let newItem = JSON.parse(JSON.stringify(item))
            let aa = (newItem.value && newItem.value.dosage_num) || 0
            let bb = (newItem.value && newItem.value.frequency_num) || 0
            let value1 = JSON.parse(JSON.stringify(item.value))
            let value = {
              menu: newItem.question.medicineMenu,
              id: '', //手动没有id
              name: '',
              typeName: '',
              type: '',
              pow: '',
              pow_label: '',
              spec: '',
              spec_label: '',
              dosage_num: '',
              dosage: '',  //  用药剂量单位value
              dosage_label: '',
              frequency_num: '',
              frequency: '',  // 频度
              frequency_label: '',
              dosage_num1: {value: aa},
              frequency_num1: {value: bb},
              ...value1
            }
            newItem.value = JSON.parse(JSON.stringify(value))
            state.type = newItem.value.type
            state.currentItem = JSON.parse(JSON.stringify(newItem))
            break
          }
        }
      }
    },
    savequetions (state,payload) {
      state.taskList = state.taskList.map(i => {
        i = i.map(item => {
          if(item.frontend_id === payload) {
            item = JSON.parse(JSON.stringify(state.currentItem))
          }
          return item
        })
        return i
      })
    },
    savecurrent (state) {
      state.currentItem.value.type = state.type
    }
  },
  actions: {
    async getListData ({ commit }, payload) {
      commit({
        type: 'showLoading'
      })
      try {
        let data
        if (payload.source === 'app') {
          data  = await getList(payload)
        } else if (payload.source === 'h5') {
          data  = await getListPc(payload)
        }
        commit({
          type: 'updateList',
          data: data.data
        })
      } finally {
        commit({
          type: 'hideLoading'
        })
      }
    },
    async submitData ({ commit }, payload) {
      commit({
        type: 'showLoading'
      })
      try {
        let data
        const {source = 'app', title, serve_order_id, task_index} = payload.query
        if (source === 'app') {
          data  = await answerQuestion({
            citizen_id: payload.citizen_id,
            result: payload.result,
            serve_order_id,
            task_index
          })
          router.push({
            path: '/result',
            query: {
              resultId: data.data.gauge_answer_id,
              title,
              source,
              citizen_id: payload.citizen_id,
              serve_order_id,
              task_index
            }
          })
        } else if (source === 'h5') {
          data  = await answerQuestionPc({
            result: payload.result,
            gauge_id: serve_order_id
          })
          commit({
            type: 'updateResults',
            data: data.data
          })
          router.push({
            path: '/result',
            query: {
              title,
              source,
              citizen_id: payload.citizen_id,
              serve_order_id,
              task_index
            }
          })
        }
      } finally {
        commit({
          type: 'hideLoading'
        })
      }
    },
    async searchResultList ({ state, commit }, payload) {
      commit({
        type: 'showLoading'
      })
      try {
        let data = null
        if (payload.source === 'app') {
          data  = await getResultList({
            gauge_result_id: payload.gauge_result_id,
            serve_order_id: payload.serve_order_id,
            task_index: payload.task_index,
            citizen_id: payload.citizen_id
          })
          if (state.gps) { // 上传gps
            let hasNextTask = false
            for (let obj of data.data.script_result) {
              if (obj.task_index) {
                hasNextTask = true
                break
              }
            }
            if (!hasNextTask) {
              try {
                uploadGeoPostion({
                  lng: state.gps.longitude,
                  lat: state.gps.latitude,
                  type: 2,
                  serve_id: payload.serve_order_id
                })
              } catch (e) {
                console.log('gps上传失败')
              }
            }
          } else {
            console.log('获取gps失败')
          }
        } else if (payload.source === 'h5') {
          data  = await getResultListPc({
            gauge_result_id: payload.gauge_result_id,
            serve_order_id: payload.serve_order_id,
            task_index: payload.task_index,
            citizen_id: payload.citizen_id
          })
        }
        commit({
          type: 'updateResults',
          data: data.data
        })
      } finally {
        commit({
          type: 'hideLoading'
        })
      }
    },
    async searchMedicineList ({commit }, payload) {
      commit({
        type: 'showLoading'
      })
      try {
        const { data } = await getMedicineList({menu:payload.menu})
        commit({
          type: 'updateMedicineList',
          data
        })
        let list = {medicine_name: payload.item.name, medicine_id: ''}
        for (let i of data.list) {
          if(i.medicine_id === payload.item.id) {
            list = i
          }
        }
        commit({
          type: 'saveMedicine',
          payload: list
        })
      } finally {
        commit({
          type: 'hideLoading'
        })
      }
    }

  }
}
