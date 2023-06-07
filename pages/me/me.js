// pages/me/me.js
import {
  request
} from '../../utils/request/index'
Page({
  data: {
    userInfo: null,
    cityList: null,
    name: 'wyq',
    age: 18,
    title: 'hello world'
  },
  getLocation() {
    wx.getLocation().then(res => {
      console.log(res);
    })
  },
  navigateTo() {
    let name = this.data.name
    let age = this.data.age
    wx.navigateTo({
      url: `/pages/nevPage/nevPage?name=${name}&age=${age}`,
      events: {
        getData(data) {
          console.log(data);
        }
      },
      success: (res) => {
        console.log(res);
      }
    })
  },
  setStorage() {
    wx.setStorage({
      key: 'name',
      data: 'wyq',
      encrypt: true
    })
  },
  async onLoad() {
    const appInstance = getApp()
    const userInfo = appInstance.globalData.userInfo
    this.setData({
      userInfo
    })
    // console.log(this);
    console.log(appInstance.globalData.userInfo);
    // wx.request({
    //   url: 'http://123.207.32.32:1888/api/city/all',
    //   success: (res) => {
    //     let cityList = res.data.data
    //     this.setData({ cityList })
    //   }
    // })

    const res = await request({
      url: 'http://123.207.32.32:1888/api/city/all'
    })
    this.setData({
      cityList: res.data
    })
  },
  onShareAppMessage() {
    return {
      title: '分享',
      path: '/pages/me/me',
      imageUrl: '/assets/tabbar/cart_active.png'
    }
  }
})