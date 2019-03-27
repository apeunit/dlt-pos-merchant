import BigNumber from 'bignumber.js'

export default function formatUnit (base) {
  try {
    return new BigNumber(base)
      .shiftedBy(-18)
      .toFixed(2)
      .toString()
  } catch (error) {
    return 'N/A'
  }
}
