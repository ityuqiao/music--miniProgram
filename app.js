// app.js
App({
  onLaunch() {
    wx.getSystemInfo({
      success: (res) => {
        this.globalData.screenHeight = res.screenHeight
        this.globalData.screenWidth = res.screenWidth
        this.globalData.statusBarHeight = res.statusBarHeight
        this.globalData.contentHeight = res.windowHeight - res.statusBarHeight - 44
      }
    })
  },
  globalData: {
    screenWidth: null,
    screenHeight: null,
    statusBarHeight: null,
    contentHeight: null
  }
})
