export function setCommas(num: number) {
  return new Intl.NumberFormat('en-GB').format(num)
}

export function setConjuction(list: string[]) {
  return new Intl.ListFormat('en-GB', { style: 'long', type: 'conjunction' }).format(list)
}
