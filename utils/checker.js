export function isYouTubeURL(url) {
  return (
    url &&
    url.startsWith('https://www.youtube.com/') &&
    (url.includes('watch?v=') || url.includes('shorts/'))
  )
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
