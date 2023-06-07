// app.js
import { getCode } from './utils/request/getCode'
import { HyLoginRequest } from './utils/request/index'
App({
  async onLaunch(options) {
    const token = wx.getStorageSync('token')
    let isExpired = null
    if(token) {
      const res = await HyLoginRequest.post({
        url: '/auth',
        header: {
          token
        }
      })
      isExpired = res.message
    }
    if(token && isExpired) {
      console.log('其他操作');
    } else {
      this.login()
    }
  },
   async login() {
    const code = await getCode()
     const res = await HyLoginRequest.post({
      url: '/login',
      data: { code }
    })
    wx.setStorageSync('token', res.token)
  },
  onShow(options) {
    console.log(options);
  },
  onHide() {
    console.log('hide');
  },
  globalData: {
    userInfo: {
      name: 'wyq',
      age: 20
    },
    
  }
})
