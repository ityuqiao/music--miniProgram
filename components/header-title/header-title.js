// components/video-item/header-title/header-title.js
Component({
  properties: {
    title: {
      type: String,
      value: '默认标题'
    },
    hasMore: {
      type: Boolean,
      value: true
    }
  },
  methods: {
    onClickMore() {
      this.triggerEvent('onClickMore')
    }
  }
})
