class HyRequest {
  constructor(baseUrl) {
    this.baseUrl = baseUrl
  }
  request(options) {
    options.url = this.baseUrl + options.url
    return new Promise((resolve, reject) => {
      wx.request({
        ...options,
        success: (res) => {
          resolve(res.data)
        },
        fail: (err) => {
          reject(err)
        }
      })
    })
  }
  get(options) {
    return this.request({ ...options, method: 'GET' })
  }
  post(options) {
    return this.request({ ...options, method: 'POST' })
  }
}

export const HyRequestInstance = new HyRequest('http://codercba.com:9002')