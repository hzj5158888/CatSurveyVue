import {Message, MessageBox} from 'element-ui'

export function msgError (message) {
  Message({
    message: message,
    type: 'error',
    duration: 5 * 1000
  })
}
export function msgInfo (message) {
  Message({
    message: message,
    type: 'info',
    duration: 5 * 1000
  })
}

export function msgNoLogin () {
  Message({
    message: '尚未登录，即将跳转至登录页面',
    type: 'error',
    duration: 1.2 * 1000,
    onClose: () => {
      window.location.href = '/#/login'
    }
  })
}

export function msgNoRole () {
  Message({
    message: '账号没有相关操作权限, 即将跳转至首页',
    type: 'error',
    duration: 1.2 * 1000,
    onClose: () => {
      window.location.href = '/#/'
    }
  })
}

export function msgBoxNoLogin () {
  MessageBox.confirm('未登录状态，是否重新登录', '系统提示', {
    confirmButtonText: '重新登录',
    cancelButtonText: '取消',
    type: 'warning'
  }
  ).then(() => {
    window.location.href = '/#/login'
  }).catch(() => {})
}

export function msgBoxNoRole () {
  MessageBox.confirm('账号没有相关操作权限', '系统提示', {
    confirmButtonText: '确认',
    showCancelButton: false,
    showClose: false,
    type: 'warning'
  }
  ).then(() => {
    window.location.href = '/#/'
  }).catch(() => {})
}
