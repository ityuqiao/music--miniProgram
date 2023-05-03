import { HyRequestInstance } from './request'

export function getSongDeatil(ids) {
  return HyRequestInstance.get({
    url: `/song/detail`,
    data: {
      ids
    }
  })
}

export function getSongLyric(id) {
  return HyRequestInstance.get({
    url: `/lyric`,
    data: {
      id
    }
  })
}