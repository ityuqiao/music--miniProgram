// store.js
import { configure, observable, action } from 'mobx-miniprogram'

// 不允许在动作外部修改状态
configure({ enforceActions: 'observed' });

export const store = observable({

  // 数据字段
  songList: [],
  currentSongIndex: 0,

  // actions
  updateSongList: action(function (songList) {
    this.songList = songList
  }),
  updateIndex: action(function (index) {
    // console.log(index);
    this.currentSongIndex = index
  })


})