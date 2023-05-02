// pages/music-player/music-player.js
Page({
  data: {
    id: ''
  },
  onLoad(options) {
    this.setData({ id: options.id })
  }
})