import axios from 'axios'
import { Toast } from 'mint-ui'
import { getSession } from './session'
import { getBaseURL } from '../../config'

// 只显示一个错误提示
let networkError = false
const warn = (message) => {
  if (!message) return
  if (!networkError) {
    networkError = true
    Toast({
      message,
      position: 'top',
      duration: 3000
    })
    setTimeout(() => { networkError = false }, 3000)
  }
}

export const CancelToken = axios.CancelToken // 取(请求
export const baseURL = getBaseURL()
const api = axios.create({
  timeout: 0
})

// 添加请求拦截器
api.interceptors.request.use((config) => {
  config.baseURL = getBaseURL()

  // 带上用户token
  const authToken = getSession()
  if (authToken) {
    config.headers['Authorization'] = authToken.token
  }

  // 清除不需要的参数
  if (typeof config.params === 'object') {
    config.params = JSON.parse(JSON.stringify(config.params)) // 清除与原数据的引用关联
    for (const i in config.params) {
      if (config.params[i] === undefined ||
        config.params[i] === null ||
        config.params[i] === '') {
        delete config.params[i]
      } else {
        if (typeof config.params[i] === 'string') { // 针对[]做特殊处理，后台必须转译两次
          config.params[i] = config.params[i].replace('[', '%5B').replace(']', '%5D')
        }
      }
    }
  }
  return config
})

// 添加响应拦截器
api.interceptors.response.use(response => response, (err) => {
  if (err.noWarn) return Promise.reject(err)
  if (err && err.response) {
    switch (err.response.status) {
    case 400:
      err.message = '请求错误'
      break

    case 401:
      err.message = '未授权，请登录'
      window.postMessage(JSON.stringify({
        name: 'login'
      }))
      break

    case 403:
      err.message = '拒绝访问'
      window.postMessage(JSON.stringify({
        name: 'login'
      }))
      break

    case 404:
      err.message = `请求地址出错: ${err.response.config.url}`
      break

    case 408:
      err.message = '请求超时'
      break

    case 500:
      err.message = '服务器内部错误'
      break

    case 501:
      err.message = '服务未实现'
      break

    case 502:
      err.message = '网关错误'
      break

    case 503:
      err.message = '服务不可用'
      break

    case 504:
      err.message = '网关超时'
      break

    case 505:
      err.message = 'HTTP版本不受支持'
      break

    default:
    }
  } else if (err.message === 'Network Error') {
    err.message = '网络错误，请稍后再试！'
  }
  if (err && err.response && err.response.data && err.response.data.message) {
    warn(err.response.data.message)
  } else {
    warn(err.message)
  }
  return Promise.reject(err)
})

// 离线
export const offline = () => async config => {
  try {
    const response = await axios.defaults.adapter(config)
    return Promise.resolve(response)
  } catch (err) {
    if (err.message === 'Network Error') {
      err.noWarn = true
    }
    return Promise.reject(err)
  }
}

// 没有提示
export const noWarn = () => async config => {
  try {
    const response = await axios.defaults.adapter(config)
    return Promise.resolve(response)
  } catch (err) {
    err.noWarn = true
    return Promise.reject(err)
  }
}

export default api
