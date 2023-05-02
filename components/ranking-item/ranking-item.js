// components/ranking-item/ranking-item.js
Component({
  properties: {
    itemData: {
      type: Object,
      value: {}
    }
  },
  methods: {
    onRankingTap() {
      wx.navigateTo({
        url: `/pages/recommend-music/recommend-music?title=${this.properties.itemData.name}`,
        events: {
          eventBus() {}
        },
        success: (res) => {
          res.eventChannel.emit('eventBus', this.properties.itemData.tracks)
        }
      })
    }
  }
})
