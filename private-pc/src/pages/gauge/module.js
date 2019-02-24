import { createGaugeTemplate, getGaugeContentById, editGaugeTemplate, getTagList, getMedicine, getDefaultValue } from './service'
import { renderTree } from './config'
import { Notification } from 'element-ui'

export default {
  namespaced: true,
  state: {
    loading: false,
    tagList: [],
    medicineList: [],
    defaultValue: [],
    saveData: {}, // 用于页面中更新时间和二维码更新
    renderTree: renderTree()
  },
  mutations: {
    showLoading (state) {
      state.loading = true
    },
    hideLoading (state) {
      state.loading = false
    },
    clearState (state) {
      state.loading = false
      state.renderTree = renderTree()
      state.saveData = {}
    },
    updateRenderTree (state, payload) {
      state.renderTree = payload.renderTree
    },
    updateTagList (state, payload) {
      state.tagList = payload.data
    },
    updateSaveData (state, payload) {
      state.saveData = payload.data
    },
    updateMedicineList (state, payload) {
      state.medicineList = payload.data
    },
    updateDefaultValue (state, payload) {
      state.defaultValue = payload.val
    }
  },
  actions: {
    async getMedicineList ({commit}) {
      commit({
        type: 'showLoading'
      })
      const {data} = await getMedicine()
      commit({
        type: 'updateMedicineList',
        data
      })
      commit({
        type: 'hideLoading'
      })
    },
    async getDefaultValue ({commit}) {
      const {data} = await getDefaultValue()
      let val = {}
      data.forEach((item) => {
        const {question_type, data} = item
        val[question_type] = data
      })
      commit({
        type: 'updateDefaultValue',
        val
      })
    },
    async getTagList ({commit}) {
      commit({
        type: 'showLoading'
      })
      const {data} = await getTagList()
      commit({
        type: 'updateTagList',
        data
      })
      commit({
        type: 'hideLoading'
      })
    },
    async getGaugeContent ({commit}, payload) {
      const {data} = await getGaugeContentById (payload)
      const {app_frontend_config, questions, name, script, script_name, print_templates} = data
      let obj = {}
      const order = []
      questions.forEach((question) => {
        question.question = JSON.parse(question.question)
        obj[question.frontend_id] = question
        order.push(+question.frontend_id)
      })
      const config = JSON.parse(app_frontend_config)
      const pages = config.order.map((arr) => {
        const newArr = arr.map((o) => {
          console.log(obj[o])
          return obj[o]
        })
        return newArr
      })
      const renderTree = {
        pages,
        name,
        script,
        script_name,
        validate: config.validate ? config.validate : [],
        currentIndex: 0,
        maxIndex: order.length ? Math.max.apply(null, order) + 1 : 1,
        print_templates
      }
      commit({
        type: 'updateSaveData',
        data
      })
      commit({
        type: 'updateRenderTree',
        renderTree
      })
    },
    async createGaugeTemplate ({ commit, state }, payload) {
      const renderTree = JSON.parse(JSON.stringify(state.renderTree))
      const {script_name, script, print_templates, name} = renderTree
      if (!name) {
        Notification.error({
          title: '提示',
          message: '量表名称不能为空！'
        })
        return false
      }
      if (/select|update|delete|exec|count|'|"|=|;|>|<|%/gi.test(name)) {
        Notification.error({
          title: '提示',
          message: '量表名称不能包含非法字符和SQL关键字！'
        })
        return false
      }
      if (!script) {
        Notification.error({
          title: '提示',
          message: '脚本不能为空！'
        })
        return false
      }
      if (!script_name) {
        Notification.error({
          title: '提示',
          message: '脚本名称不能为空！'
        })
        return false
      }
      if (/select|update|delete|exec|count|'|"|=|;|>|<|%/gi.test(script_name)) {
        Notification.error({
          title: '提示',
          message: '脚本名称不能包含非法字符和SQL关键字！'
        })
        return false
      }
      const questions = []
      // 将脚本极值放入每个题中
      let flag = true
      let errMsg = ''
      renderTree.validate.forEach(item => {
        if (item.type === 1) {
          if (!item.items[0]) {
            errMsg = '请选择极值校验题目！'
            flag = false
            return false
          }
          if (item.items[1] === null || item.items[1] === undefined) {
            errMsg = '请填写极值校验最大值！'
            flag = false
            return false
          }
          if (item.items[2] === null || item.items[2] === undefined) {
            errMsg = '请填写极值校验最小值！'
            flag = false
            return false
          }
          if (item.items[1] <= item.items[2]) {
            errMsg = '极值校验最大值必须大于最小值'
            flag = false
            return false
          }
        }
        if (item.type === 2) {
          if (!item.items[0] || !item.items[1] || !item.items[2]) {
            errMsg = '请选择BMI题目！'
            flag = false
            return false
          }
        }
        if (item.type === 3) {
          if (!item.items[0] || !item.items[1]) {
            errMsg = '请选择数值比较题目！'
            flag = false
            return false
          }
        }
      })

      if (!flag) {
        Notification.error({
          title: '提示',
          message: errMsg
        })
        return false
      }

      const order = renderTree.pages.map(arr => {
        const newArr = arr.map(obj => {
          obj.question = JSON.stringify(obj.question)
          if (obj.default_answer_config === '') {
            delete obj.default_answer_config
          }
          if (obj.default_answer_type === '') {
            delete obj.default_answer_type
          }
          questions.push(obj)
          return obj.frontend_id
        })
        return newArr
      })
      const params = {
        app_frontend_config:JSON.stringify(
          {
            order,
            validate: renderTree.validate
          }
        ),
        print_templates,
        name,
        questions,
        script,
        script_name
      }
      commit({
        type: 'showLoading'
      })
      try {
        if (payload) {
          const {id} = payload
          const {data} = await editGaugeTemplate({id, params})
          commit({
            type: 'updateSaveData',
            data
          })
        } else {
          const {data} = await createGaugeTemplate(params)
          commit({
            type: 'updateSaveData',
            data
          })
        }
      } finally {
        commit({
          type: 'hideLoading'
        })
      }
    }
  }
}
