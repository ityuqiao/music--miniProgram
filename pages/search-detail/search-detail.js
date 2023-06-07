// pages/search-detail/search-detail.js
import { getSearchSuggestions, getHotSearchList, search } from '../../services/music'
import {
  createStoreBindings
} from 'mobx-miniprogram-bindings'
import {
  store
} from '../../store/store'
Page({
  data: {
    hotSearchList: [],
    value: '',
    suggestionsList: [],
    searchRes: []
  },
  onLoad() {
    this.storeBindings = createStoreBindings(this, {
      store,
      fields: ['songList', 'currentSongIndex'],
      actions: ['updateSongList', 'updateIndex'],
    })
    this.getHotList()
  },

  async getHotList(){
    const res = await getHotSearchList()
    this.setData({ hotSearchList: res.result.hots })
  },
  async getSearchSuggestions() {
    const res = await getSearchSuggestions(this.data.value)
    this.setData({ suggestionsList: res.result.allMatch })
  },
  async searchRes(keywords) {
    const res = await search(keywords)
    this.setData({ searchRes: res.result.songs })
  },
  changeValue(e) {
    this.setData({ value: e.detail })
    if(this.data.value === '') {
      this.setData({ suggestionsList: [] })
    } else {
      this.getSearchSuggestions()
    }
  },
  starSearch() {
    this.searchRes(this.data.value)
    this.jumpToDetail()
  },

  jumpToDetail() {
    console.log(33);
    wx.navigateTo({
      // url: `/pages/recommend-music/recommend-music?title=搜索结果`,
      // events: {
      //   eventBus(){}
      // },
      // success: (res) => {
      //   res.eventChannel.emit('events', this.data.searchRes)
      // }
    })
  }

})