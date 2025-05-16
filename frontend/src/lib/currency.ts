export const KRW = (price?: number) => {
  if (!price) return null

  const formatter = new Intl.NumberFormat('ko-KR', {
    style: 'currency',
    currency: 'KRW',
  })
  return `${formatter.format(price)}`
}
