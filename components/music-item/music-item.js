// components/music-item/music-item.js
Component({
  externalClasses: ['my-class'],
  properties: {
    item: {
      type: Object,
      value: {}
    }
  },
  methods: {
    onItemTap() {
      const name = this.properties.item.name
      const id = this.properties.item.id
      wx.navigateTo({
        url: `/pages/recommend-music/recommend-music?title=${name}&id=${id}`,
      })
    }
  }
})
