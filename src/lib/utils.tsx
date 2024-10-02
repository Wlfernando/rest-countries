export function setCommas(num: number) {
  return new Intl.NumberFormat('en-GB').format(num)
}
