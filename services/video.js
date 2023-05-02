import { HyRequestInstance } from './request'

export function getVideoList(offset = 0, limit = 20) {
  return HyRequestInstance.get({
    url: '/top/mv',
      data: {
        limit,
        offset
      }
  })
}

export function getMVUrl(id) {
  return HyRequestInstance.get({
    url: '/mv/url',
    data: {
      id
    }
  })
}

export function getMVInfo(id) {
  return HyRequestInstance.get({
    url: '/mv/detail',
    data: {
      mvid: id
    }
  })
}

export function getRelatedVideo(id) {
  return HyRequestInstance.get({
    url: '/related/allvideo',
    data: {
      id
    }
  })
}
