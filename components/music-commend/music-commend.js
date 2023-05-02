// components/music-commend/music-commend.js
Component({
  properties: {
    title: {
      type: String,
      value: ''
    },
    musicList: {
      type: Array,
      value: []
    },
    screenWidth: {
      type: Number,
      value: 0
    }
  },
  methods: {
    onClickMore() {
      wx.navigateTo({
        url: '/pages/menu-detail/menu-detail?menu=华语',
      })
    }
  }
})
