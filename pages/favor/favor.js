Page({
  data: {
    content: 'hello world',
    movies: ['a', 'b', 'c'],
    counter: 0
  },
  increment() {
    console.log(1);
    this.setData({
      counter: this.data.counter + 1
    })
  },
  decrement() {
    console.log(2);
    this.setData({
      counter: this.data.counter - 1
    })
  }
})