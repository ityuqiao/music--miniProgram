// pages/index-music/index-music.js
import {
  createStoreBindings
} from 'mobx-miniprogram-bindings'
import {
  store
} from '../../store/store'
import {
  getMusicBanner,
  getRecommendList,
  getHotList,
  getRanking
} from '../../services/music'
// import { getSelectorQuery } from '../../utils/selector'
const app = getApp()
Page({
  data: {
    value: '',
    MusicBanner: [],
    recommendList: [],
    recommendSixList: [],
    hotList: [],
    ChineseMusic: [],
    ranking: {},
    rankID: [3779629, 2884035, 19723756],
    screenWidth: null
  },
  onLoad() {
    this.storeBindings = createStoreBindings(this, {
      store,
      fields: ['songList', 'currentSongIndex'],
      actions: ['updateSongList', 'updateIndex'],
    })
    this.getBanner()
    this.getRecommendMusic()
    this.getHotMusic()
    this.setData({
      screenWidth: app.globalData.screenWidth - 12
    })
    this.getRankingFn()
  },
  onReady() {},
  onClickMore() {
    wx.navigateTo({
      url: '/pages/recommend-music/recommend-music?title=推荐歌曲',
      events: {
        eventBus() {}
      }
    }).then(res => {
      res.eventChannel.emit('eventBus', this.data.recommendList)
    })
  },
  onSearchClick() {
    wx.navigateTo({
      url: '/pages/search-detail/search-detail',
    })
  },
  onMusicItemTap(e) {
    // console.log(e);
    const index = e.currentTarget.dataset.index
    const id = e.currentTarget.dataset.id
    this.updateSongList(this.data.recommendSixList)
    this.updateIndex(index)
    wx.navigateTo({
      url: `/pages/music-player/music-player?id=${id}`,
    })
  },
  async getRankingFn() {
    const rankID = this.data.rankID
    const PromiseArr = []
    for (let id of rankID) {
      PromiseArr.push(getRanking(id))
    }
    Promise.all(PromiseArr).then(res => {
      this.setData({
        ranking: res
      })
    })
  },
  async getHotMusic() {
    getHotList('全部').then(res => {
      this.setData({
        hotList: res.playlists
      })
    })
    getHotList('华语').then(res => {
      this.setData({
        ChineseMusic: res.playlists
      })
    })
  },
  async getBanner() {
    const res = await getMusicBanner()
    this.setData({
      MusicBanner: res.banners
    })
  },
  async getRecommendMusic() {
    const res = await getRecommendList(2884035)
    let recommendList = res.playlist.tracks
    let recommendSixList = recommendList.slice(0, 6)
    this.setData({
      recommendList,
      recommendSixList
    })
  }

})