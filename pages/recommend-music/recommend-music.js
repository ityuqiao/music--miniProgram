// pages/recommend-music/recommend-music.js
import {
  getRanking
} from '../../services/music'
import {
  createStoreBindings
} from 'mobx-miniprogram-bindings'
import {
  store
} from '../../store/store'
Page({
  data: {
    musicList: null,
    title: '',
    id: null,
    menuInfo: {}
  },
  onMusicItemTap(e) {
    const id = e.currentTarget.dataset.item.id
    const index = e.currentTarget.dataset.index
    this.updateSongList(this.data.musicList)
    this.updateIndex(index)
    wx.navigateTo({
      url: `/pages/music-player/music-player?id=${id}`,
    })
  },
  onLoad(options) {
    this.storeBindings = createStoreBindings(this, {
      store,
      fields: ['songList', 'currentSongIndex'],
      actions: ['updateSongList', 'updateIndex'],
    })
    this.setData({
      title: options.title
    })
    if (options.id) {
      this.setData({
        id: options.id
      })
    }
    this.getRankingFn()
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.on('eventBus', (data) => {
      this.setData({
        musicList: data
      })
    })
    wx.setNavigationBarTitle({
      title: this.data.title
    })
  },
  async getRankingFn() {
    const res = await getRanking(this.data.id)
    this.setData({
      musicList: res.playlist.tracks
    })
    this.setData({
      menuInfo: res
    })
  }
})