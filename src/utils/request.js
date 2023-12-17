import axios from 'axios'
import {msgNoLogin, msgNoRole, msgError} from './ct-msg'

// 全局的 axios 默认值
axios.defaults.baseURL = process.env.CT_API_URL
// 请求超时时间
axios.defaults.timeout = 10000

var service = axios.create({
  // axios中请求配置有baseURL选项，表示请求URL公共部分
  baseURL: process.env.CT_API_URL,
  // 超时
  timeout: 10000,
  headers: {
    'accessToken': localStorage.getItem('accessToken'),
    'Content-Type': 'application/json;charset=UTF-8'
  }
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    return config
  },
  error => {
    console.log('request-error:'+error)
    return Promise.error(error)
  })

// 响应拦截器
service.interceptors.response.use(
  response => {
    if (response.status === 200) {
      const data = response.data;
      if (data.status !== undefined) {
        if (data.status === 401) {
          msgNoLogin()
        } else if (data.status === 403) {
          msgNoRole()
        } else if (data.status !== 200) {
          let message = `异常码：${data.status}`
          if (data.hasOwnProperty('message')) {
            message = `${data.message}，异常码：${data.status}`
          }
          msgError(message)
        }
      }
      return Promise.resolve(response.data)
    } else {
      return Promise.reject(response)
    }
  },
  error => {
    // 服务器状态码不是200的情况
    console.log('err' + error)
    let {message} = error
    if (message.includes('Network Error')) {
      message = '后端接口连接异常'
    } else if (message.includes('timeout')) {
      message = '系统接口请求超时'
    } else if (message.includes('Request failed with status code')) {
      const code = message.substr(message.length - 3)
      if (code === '401' || code === '403') {
        message = null
        if (code === '401') {
          msgNoLogin()
        } else if (code === '403') {
          msgNoRole()
        }
      } else {
        message = '系统接口' + message.substr(message.length - 3) + '异常'
      }
    }
    if (message != null) {
      msgError(message)
    }
    return Promise.reject(error)
  }
)
export default service
