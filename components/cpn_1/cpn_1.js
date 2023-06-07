// components/cpn_1/cpn_1.js
Component({
  options: {
    styleIsolation: "isolated"
  },
  /**
   * 组件的属性列表
   */
  properties: {

  },

  externalClasses: ['info'],

  /**
   * 组件的初始数据
   */
  data: {
  
  },

  /**
   * 组件的方法列表
   */
  methods: {
    textClick() {
      this.triggerEvent('textClick', 'hhh')
    }
  }
})
