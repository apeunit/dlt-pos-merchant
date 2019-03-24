import BigNumber from 'bignumber.js'

export default function formatUnit (base) {
  try {
    if (base < 10 ** 16 && (base !== '0' || base !== 0)) {
      let exp = 0
      while (base > 9) {
        base = base / 10
        exp++
      }
      const extra = exp > 6 ? exp % 3 : exp - 6
      base = new BigNumber(base).shiftedBy(extra).toNumber()
      exp = exp - 18 - extra
      return parseFloat(base).toFixed(2)
    } else {
      const data = new BigNumber(base).shiftedBy(-18).toString()
      return parseFloat(data).toFixed(2)
    }
  } catch (error) {
    console.log(error)
  }
}
