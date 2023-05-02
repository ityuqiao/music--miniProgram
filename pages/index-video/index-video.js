// pages/index-video/index-video.js
import { getVideoList } from '../../services/video'
Page({
  data: {
    videoList: [],
    offset: 0,
    hasMore: true
  },
  onLoad() {
    this.getVideo()
  },
   async getVideo() {
    const res = await getVideoList(this.data.offset)
    let newArr = [...this.data.videoList, ...res.data]
    this.setData({
      videoList: newArr
    })
    this.data.offset = this.data.videoList.length
    this.data.hasMore = res.hasMore
  },
  onReachBottom() {
    if (this.data.hasMore) {
      this.getVideo()
    }
  },
  onPullDownRefresh() {
    this.setData({
      videoList: [],
      offset: 0,
      hasMore: true
    })
    this.getVideo().then(() => {
      setTimeout(() => {
        wx.stopPullDownRefresh()
      }, 500)
    })
  },
  onItemTap(e) {
    // console.log(22);
    const item = e.currentTarget.dataset.item
    // console.log(item);
    wx.navigateTo({
      url: '/pages/video-detail/video-detail?id=' + item.id
    })
  }
})