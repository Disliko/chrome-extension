export function formatNumber(num) {
  const formatter = new Intl.NumberFormat('en-US', {
    notation: 'compact',
    compactDisplay: 'short',
  })

  return formatter.format(num)
}

export function calcPercent(a, b) {
  return Math.round((a / b) * 100)
}
