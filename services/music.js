import { HyRequestInstance } from './request'

export function getMusicBanner(type = 1) {
  return HyRequestInstance.get({
    url: '/banner',
    data: {
      type
    }
  })
}

export function getRecommendList(id) {
  return HyRequestInstance.get({
    url: '/playlist/detail',
    data: {
      id
    }
  })
}

export function getHotList(cat = '全部', limit = 6, offset = 0) {
  return HyRequestInstance.get({
    url: '/top/playlist',
    data: {
      limit,
      offset,
      cat
    }
  })
}

export function getMenuTags() {
  return HyRequestInstance.get({
    url: '/playlist/hot'
  })
}

export function getRanking(id) {
  return HyRequestInstance.get({
    url: '/playlist/detail',
    data: {
      id
    }
  })
}

// 搜索页面接口
export function getHotSearchList() {
  return HyRequestInstance.get({
    url: '/search/hot'
  })
}

export function getSearchSuggestions(keywords) {
  return HyRequestInstance.get({
    url: `/search/suggest`,
    data: {
      keywords,
      type: 'mobile'
    }
  })
}

export function search(keywords) {
  return HyRequestInstance.get({
    url: '/search',
    data: {
      keywords
    }
  })
}