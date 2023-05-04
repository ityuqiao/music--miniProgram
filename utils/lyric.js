const lyricRgx = /\[(\d{2}):(\d{2}).(\d{2,3})\]/
export function formateLyric(lyricStr) {
  const lyricArr = []
  const lyricline = lyricStr.split('\n')
  for(let lyric of lyricline) {
    const res = lyricRgx.exec(lyric)
    if(!res) continue
    const m = res[1] * 60 * 1000
    const s = res[2] * 1000
    const ms = res[3] * 1
    const allTime = m + s + ms
    const text = lyric.replace(lyricRgx, "")
    lyricArr.push({allTime, text})
  }
  return lyricArr
}