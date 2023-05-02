export function getSelectorQuery(seletor) {
  return new Promise(resolve => {
    let query = wx.createSelectorQuery();
    query.select(seletor).boundingClientRect(res =>{
      resolve(res)
    }).exec();
  })
}