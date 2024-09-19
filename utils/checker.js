export function isYouTubeURL(url) {
  return url && url.startsWith('https://www.youtube.com/watch?v=')
}

export function choosePage(isYouTube, pages) {
  if (isYouTube) {
    pages.inYouTube.classList.remove('hide')
    pages.notInYouTube.classList.add('hide')
  }
  if (!isYouTube) {
    pages.inYouTube.classList.add('hide')
    pages.notInYouTube.classList.remove('hide')
  }

  pages.loading.classList.add('hide')
}
