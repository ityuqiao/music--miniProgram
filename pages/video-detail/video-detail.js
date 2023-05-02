// pages/video-detail/video-detail.js
import { getMVUrl, getMVInfo, getRelatedVideo } from '../../services/video'
Page({
  data: {
    id: null,
    MVUrl: '',
    MVInfo: '',
    relatedVideo: []
  },
  onLoad(options) {
    const id = options.id
    this.setData({ id })
    this.getUrl()
    this.getInfo()
    this.getRelated()
  },
   async getUrl() {
    const res = await getMVUrl(this.data.id)
    this.setData({ MVUrl: res.data.url })
    // console.log(res);
  },
  async getInfo() {
    const res = await getMVInfo(this.data.id)
    // console.log(res);
    this.setData({ MVInfo: res.data })
  },
  async getRelated() {
    const res = await getRelatedVideo(this.data.id)
    // console.log(res);
    this.setData({ relatedVideo: res.data })
  }
})