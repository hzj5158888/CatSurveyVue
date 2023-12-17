import request from '@/utils/request'
import API from '@/api/index.js'

// 登录方法
export function ctLogin (userName, password) {
  const data = {
    userName,
    password
  }

  return request({
    url: API.loginIn,
    method: 'post',
    data
  })
}

// 退出方法
export function logout () {
  return request({
    url: API.logOut,
    method: 'post',
  })
}

export function signup (user) {
  return request({
    url: API.user,
    method: 'post',
    data: user
  })
}

