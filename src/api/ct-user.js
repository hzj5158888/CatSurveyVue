import request from '@/utils/request'
import API from '@/api/index.js'

// 登录方法
export function ctUserInfo () {
  return request({
    url: API.user,
    method: 'get'
  })
}

export function ctUserModify (data) {
  return request({
    url: API.user,
    method: 'put',
    data
  })
}

// 退出方法
export function ctUserPwd (curpwd, pwd) {
  const data = {
    'oldPassword': curpwd,
    'password': pwd
  }
  return request({
    url: API.user,
    method: 'put',
    data
  })
}

