// pages/menu-detail/menu-detail.js
import { getMenuTags, getHotList } from '../../services/music'
Page({
  data: {
    menuList: []
  },
  onLoad(options) {   
    this.getTags()
  },
  async getTags() {
    const res = await getMenuTags() 
    const resTags = res.tags
    const promiseArr = []
    for(let tag of resTags) {
      promiseArr.push(getHotList(tag.name))
    }
    Promise.all(promiseArr).then( res  => {
      this.setData({ menuList: res})
    })
  }
})