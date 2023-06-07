// components/tabControl/tab-control.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    titleList: {
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    currentIndex: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    itemTap(e) {
      let currentIndex = e.currentTarget.dataset.index
      this.setData({ currentIndex })
      this.triggerEvent('changeIndex', currentIndex)
    }
  }
})
