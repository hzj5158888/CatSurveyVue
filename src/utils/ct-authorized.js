export default {
  getUserName () {
    let userInfo = localStorage.getItem('userInfo');
    return JSON.parse(userInfo)["userName"];
  },
  getUserId() {
    let userInfo = localStorage.getItem('userInfo');
    return JSON.parse(userInfo)["userId"];
  },
  getUserInfo() {
    return JSON.parse(localStorage.getItem('userInfo'));
  },
  setToken (accessToken) {
    localStorage.setItem('accessToken', accessToken)
  },
  getToken () {
    if (localStorage.hasOwnProperty('accessToken')) {
      return localStorage.getItem('accessToken')
    }

    return 'none'
  },
  setUserInfo(data) {
      localStorage.setItem("userInfo", JSON.stringify(data));
  },
  setAuthority (authority) {
    const ctAuthority = typeof authority === 'string' ? [authority] : authority
    localStorage.setItem('ct_oss_authority', JSON.stringify(ctAuthority))
  },
  getAuthority () {
    let authority = []
    if (localStorage.hasOwnProperty('ct_oss_authority')) {
      const authorityString = localStorage.getItem('ct_oss_authority')
      try {
        if (authorityString) {
          authority = JSON.parse(authorityString)
        }
      } catch (e) {
        authority = authorityString
      }
      if (typeof authority === 'string') {
        return [authority]
      }
    }
    return authority
  }
}

