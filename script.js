import { isYouTubeURL, choosePage } from './utils/checker.js'
import { getVideoData, showLikeAmount, setLineProperty } from './utils/likes.js'

const [tab] = await chrome.tabs.query({ active: true, currentWindow: true })
const siteData = {
  isYouTube: isYouTubeURL(tab.url),
  url: tab.url,
}

const pages = {
  inYouTube: document.querySelector('.in_youtube_page'),
  notInYouTube: document.querySelector('.not_in_youtube_page'),
  loading: document.querySelector('.loading_page'),
}

choosePage(siteData.isYouTube, pages)

async function getData() {
  if (!siteData.isYouTube) return { ok: false, error: 'Not in YouTube' }
  const data = await getVideoData(siteData.url)

  if (data.ok) return { ok: true, data: data.data }
  return { ok: false, error: data.error }
}

const data = await getData()
if (data.ok) {
  setLineProperty(data)
  showLikeAmount(data)
}

if (!data.ok) {
  pages.inYouTube.innerText = `We have trouble getting data, try again later`
}
