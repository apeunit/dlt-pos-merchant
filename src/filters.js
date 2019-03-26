import BigNumber from 'bignumber.js'

export default function formatUnit (base) {
  try {
    return new BigNumber(base)
      .shiftedBy(-18)
      .precision(2, BigNumber.ROUND_FLOOR)
      .toString()
  } catch (error) {
    return 'N/A'
  }
}
