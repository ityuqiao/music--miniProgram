// pages/music-player/music-player.js
import { getSongDeatil, getSongLyric } from '../../services/player'
import { throttle } from 'underscore'
const app = getApp()
const audioContext = wx.createInnerAudioContext()
Page({
  data: {
    id: '',
    songDetail: '',
    songLyric: '',
    currentPage: 0,
    contentHeight: 0,
    durationTime: 0,
    currentTime: 0,
    sliderValue: 0
  },
  onLoad(options) {
    this.setData({ contentHeight: app.globalData.contentHeight })
    // console.log(app.globalData.contentHeight);
    this.setData({ id: options.id })
    this.getSong()
    this.getLyric()
    audioContext.src = `https://music.163.com/song/media/outer/url?id=${this.data.id}.mp3`
    // const throttleListenTimeUpdata = _.throttle(this.listenTimeUpdata, 500)
    audioContext.onTimeUpdate(throttle(this.listenTimeUpdata, 700))
    audioContext.onCanplay(() => {
      // audioContext.play()
    })
  },
  async getSong() {
    const res = await getSongDeatil(this.data.id)
    this.setData({ 
      songDetail: res.songs[0],
      durationTime: res.songs[0].dt
     })
  },
  async getLyric() {
    const res = await getSongLyric(this.data.id)
    this.setData({ songLyric: res.lrc.lyric })
  },
  onBack() {
    wx.navigateBack()
  },
  onChange(e) {
    this.setData({ currentPage: e.detail.current })
  },
  changeIndex(e) {
    this.setData({ currentPage: e.currentTarget.dataset.index })
  },
  onSliderChange(e) {
    const seekTime = e.detail.value / 100 * this.data.durationTime / 1000
    this.setData({ currentTime: seekTime * 1000 })
    audioContext.seek(seekTime)
    audioContext.pause()
  },

  listenTimeUpdata() {
    const sliderValue = (audioContext.currentTime * 1000) / this.data.durationTime * 100
      this.setData({ 
        currentTime: audioContext.currentTime * 1000,
        sliderValue
   })
  }
})