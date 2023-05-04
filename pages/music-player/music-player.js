// pages/music-player/music-player.js
// store
import {
  createStoreBindings
} from 'mobx-miniprogram-bindings'
import {
  store
} from '../../store/store'
import {
  getSongDeatil,
  getSongLyric
} from '../../services/player'
import {
  throttle
} from 'underscore'
import {
  formateLyric
} from '../../utils/lyric'
const app = getApp()
const audioContext = wx.createInnerAudioContext()
Page({
  data: {
    id: '',
    songDetail: '',
    songLyric: [],
    currentPage: 0,
    contentHeight: 0,
    durationTime: 0,
    currentTime: 0,
    sliderValue: 0,
    isPlaying: true,
    currentLyric: "歌词",
    changeLyric: true,
    currentLyricIndex: 0,
    thisModel: 0,
    model: ['order', 'repeat', 'random']
  },
  onLoad(options) {
    this.storeBindings = createStoreBindings(this, {
      store,
      fields: ['songList', 'currentSongIndex'],
      actions: ['updateSongList', 'updateIndex'],
    })
    this.setData({
      contentHeight: app.globalData.contentHeight
    })
    this.setData({
      id: options.id
    })
    this.getSongFn()
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
    const songLyric = formateLyric(res.lrc.lyric)
    this.setData({
      songLyric
    })
  },
  onBack() {
    wx.navigateBack()
  },
  onChange(e) {
    this.setData({
      currentPage: e.detail.current
    })
  },
  changeIndex(e) {
    this.setData({
      currentPage: e.currentTarget.dataset.index
    })
  },
  onSliderChange: throttle(function(e) {
    const seekTime = e.detail.value / 100 * this.data.durationTime / 1000
    this.setData({
      currentTime: seekTime * 1000,
      isPlaying: true
    })
    audioContext.seek(seekTime)
    audioContext.pause()
  }, 500),

  listenTimeUpdata() {
    const sliderValue = (audioContext.currentTime * 1000) / this.data.durationTime * 100
    this.setData({
      currentTime: audioContext.currentTime * 1000,
      sliderValue
    })
    if (this.data.songLyric.length) {
      let currentIndex = this.data.songLyric.length - 1
      for (let i = 0; i < this.data.songLyric.length; i++) {
        let lyricTime = this.data.songLyric[i].allTime
        if (lyricTime > audioContext.currentTime * 1000) {
          currentIndex = i - 1
          this.data.changeLyric = true
          break
        }
      }
      if (currentIndex !== -1 && this.data.changeLyric) {
        this.data.changeLyric = false
        this.setData({
          currentLyricIndex: currentIndex,
          currentLyric: this.data.songLyric[currentIndex].text
        })
      }
    }
  },
  onPauseBtn() {
    if (this.data.isPlaying) {
      audioContext.pause()
      this.setData({
        isPlaying: false
      })
    } else {
      audioContext.play()
      this.setData({
        isPlaying: true
      })
    }
  },
  nextSong() {
    if(this.data.thisModel === 2 ) {
      this.changeSong(Math.floor(Math.random() * this.data.songList.length))
      // console.log(Math.floor(Math.random() * this.data.songList.length));
    } else {
      this.changeSong(1)
    }
  },
  preSong() {
    this.changeSong(-1)
  },
  async getSongFn() {
    this.getSong()
    await this.getLyric()
    audioContext.src = `https://music.163.com/song/media/outer/url?id=${this.data.id}.mp3`
    audioContext.onTimeUpdate(throttle(this.listenTimeUpdata, 500, {
      leading: false,
      trailing: false
    }))
    audioContext.onCanplay(() => {
      audioContext.play()
    })
    audioContext.onEnded(() => {
      if(this.data.thisModel === 2) {
        this.changeSong(Math.floor(Math.random() * this.data.songList.length))
      } else if(this.data.thisModel === 1) {
        audioContext.stop()
        this.changeSong(0)
        // console.log(this.data.thisModel);
      } else {
        this.changeSong(1)
      }
    })
  },
  changeSong(n = 1) {
    let index = this.data.currentSongIndex + n
    if (index === -1) {
      index = this.data.songList.length - 1
    }
    index = index % this.data.songList.length
    this.updateIndex(index)
    console.log(index);
    this.setData({
      id: this.data.songList[this.data.currentSongIndex].id,
      isPlaying: true
    })
    this.getSongFn()
  },
  changeModel() {
    let thisModel = (this.data.thisModel + 1) % 3
    this.setData({ thisModel })
  }
})