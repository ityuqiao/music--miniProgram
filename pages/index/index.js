// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    value: '你好啊',
    imgPath: null,
    list: ['a', 'b', 'c'],
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName') // 如需尝试获取用户信息可改为false
  },
  btnClick(e) {
    console.log(e.target.dataset);
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad() {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
  getUserInfo(e) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    console.log(e)
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  onPullDownRefresh() {
    setTimeout(() => {
      wx.stopPullDownRefresh({
        success() {
          console.log("成功");
        }
      })
    }, 1000)
  },
  onReachBottom() {
    // console.log(222);
  },
  getUserProfile() {
    wx.getUserProfile({
      desc: 'desc',
    }).then(res => {
      console.log(res);
    })
  },
  getPhoneNumber(e) {
    console.log(e);
  },
  chooseImg() {
    wx.chooseMedia({
      mediaType: ['image']
    }).then( res => {
      this.setData({
        imgPath: res.tempFiles[0].tempFilePath
      })
    })
  }
})
