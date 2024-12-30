import { calcPercent, formatNumber } from './formatter.js'

export async function getVideoData(url) {
  const videoId = getVideoId(url)
  const apiUrl = `https://returnyoutubedislikeapi.com/votes?videoId=${videoId}`

  const data = await fetch(apiUrl, {
    method: 'GET',
    headers: {
      Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9',
      Pragma: 'no-cache',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    },
  })
    .then((res) => {
      if (!res.ok) return { ok: false, error: 'Network response was not ok' }
      return res.json()
    })
    .then((data) => ({ ok: true, data }))
    .catch((err) => ({ ok: false, error: err }))

  return data
}

function getVideoId(url) {
  const videoId = url.includes('/shorts/')
    ? url.split('/shorts/')[1].split('?')[0]
    : new URLSearchParams(new URL(url).search).get('v')

  return videoId
}

export function calcLikesPercent(like, dislike) {
  const all = like + dislike

  return {
    like: calcPercent(like, all),
    dislike: calcPercent(dislike, all),
  }
}

export function setLineProperty(data) {
  let parentLine = document.querySelector('.youtube_rating_line')

  const likes = calcLikesPercent(data.data.likes, data.data.dislikes)
  parentLine.style.setProperty('--like-line-width', `${likes.like}%`)
  parentLine.style.setProperty('--dislike-line-width', `${likes.dislike}%`)
}

export function showLikeAmount(data) {
  const texts = {
    views: document.querySelector('.youtube_view_count'),
    likes: document.querySelector('.youtube_like_count'),
    dislikes: document.querySelector('.youtube_dislike_count'),
    rating: document.querySelector('.youtube_rating_count'),
  }

  texts.views.innerText = formatNumber(data.data.viewCount)
  texts.likes.innerText = formatNumber(data.data.likes)
  texts.dislikes.innerText = formatNumber(data.data.dislikes)
  texts.rating.innerText = `${formatNumber(data.data.rating)}/5`
}
