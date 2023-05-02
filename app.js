// app.js
App({
  onLaunch() {
    wx.getSystemInfo({
      success: (res) => {
        this.globalData.screenHeight = res.screenHeight
        this.globalData.screenWidth = res.screenWidth
      }
    })
  },
  globalData: {
    screenWidth: null,
    screenHeight: null
  }
})
