export const LossEngine = {
  calculate(y, z) {
    return {
      loss01: y * z > 0 ? 0 : 1,
      lossHinge: Math.max(0, 1 - y * z),
      lossLog: Math.log2(1 + Math.exp(-y * z)),
      lossSq: (y - z) ** 2,
    }
  },
  generateData(y, range) {
    return range.map((z) => ({ z, ...LossEngine.calculate(y, z) }))
  },
}
