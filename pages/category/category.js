import { myBehavior } from '../../behaviors/muBe'
Page({
  behaviors: [myBehavior],
  data: {
    list: [{
      name: 'js',
      age: 50,
    }, {
      name: 'HTML',
      age: 30,
    }, {
      name: 'css',
      age: 40
    }],
    counter: 1000000,
    titleList: ['相机', '衣服', '电脑', '书籍'],
    currentIndex: 0
  },
  itemTap(e) {
    let currentIndex = e.currentTarget.dataset.index
    this.setData({ currentIndex })
  },
  textClick(e) {
    console.log(e);
  },
  changeIndex(e) {
    console.log(this.data.titleList[e.detail]);
  },
  btnTap(e) {
    console.log(e);
    console.log(e.target);
    console.log(e.currentTarget);
  }
})