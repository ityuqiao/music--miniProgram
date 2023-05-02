// pages/recommend-music/recommend-music.js
import { getRanking } from '../../services/music'
Page({
  data: {
    musicList: null,
    title: '',
    id: null,
    menuInfo: {}
  },
  onMusicItemTap(e) {
    const id = e.currentTarget.dataset.item.id
    wx.navigateTo({
      url: `/pages/music-player/music-player?id=${id}`,
    })
  },
  onLoad(options) {
    this.setData({ title: options.title })
    if(options.id) {
      this.setData({ id: options.id })
    }
    this.getRankingFn()
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.on('eventBus', (data) => {
      this.setData({ musicList: data })
    })
    wx.setNavigationBarTitle({
      title: this.data.title
    })
  },
  async getRankingFn() {
    const res = await getRanking(this.data.id)
    this.setData({ musicList: res.playlist.tracks })
    this.setData({ menuInfo: res })
  }
})