// components/navBar/navBar.js
const app = getApp()
Component({
  options: {
    multipleSlots: true 
  },
  properties: {

  },
  data: {
    statusBarHeight: 20
  },
  lifetimes: {
    attached() {
      this.setData({ statusBarHeight: app.globalData.statusBarHeight }) 
    }
  }
})
