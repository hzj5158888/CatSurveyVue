import request from '@/utils/request'
import API from '@/api/index.js'

// 登录方法
export function ctAdminUserList (pageSize, current, status, loginName) {
  const params = {
    pageSize,
    current,
    status,
    loginName
  }
  return request({
    url: API.adminUserList,
    method: 'get',
    params
  })
}

/**
 * 创建用户
 * @param data
 * @returns {*}
 */
export function ctUserCreate (data) {
  return request({
    url: API.adminUserCreate,
    method: 'post',
    data
  })
}

export function ctUserUpdate (data) {
  return request({
    url: API.adminUserUpdate,
    method: 'put',
    data
  })
}

export function ctUserDelete (data) {
  return request({
    url: API.adminUserDelete,
    method: 'delete',
    data
  })
}
