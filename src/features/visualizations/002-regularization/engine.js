/**
 * Regularization Engine
 * Implements L1 (Lasso) soft thresholding and L2 (Ridge) shrinkage
 */

export const RegularizationEngine = {
  /**
   * Generate random baseline coefficients (unregularized OLS solution)
   * @param {number} numFeatures - Number of features (default 10)
   * @returns {Array<{id: string, val: number}>}
   */
  generateBaseWeights(numFeatures = 10) {
    return Array.from({ length: numFeatures }, (_, i) => ({
      id: `w${i + 1}`,
      val: (Math.random() - 0.5) * 10,
    }))
  },

  /**
   * Apply L1 (Lasso) soft thresholding: sgn(w) * max(0, |w| - λ)
   * Creates sparsity by pushing coefficients to exactly zero.
   * @param {number} weight - Original coefficient value
   * @param {number} lambda - Penalty strength
   * @returns {number} Regularized coefficient
   */
  applyL1(weight, lambda) {
    const absW = Math.abs(weight)
    const sign = Math.sign(weight)
    const threshold = lambda * 2.0 // Scaling factor for better visual range
    return sign * Math.max(0, absW - threshold)
  },

  /**
   * Apply L2 (Ridge) shrinkage: w / (1 + λ)
   * Shrinks all coefficients proportionally without reaching zero.
   * @param {number} weight - Original coefficient value
   * @param {number} lambda - Penalty strength
   * @returns {number} Regularized coefficient
   */
  applyL2(weight, lambda) {
    const shrinkageFactor = 1 + lambda * 5.0 // Scaling factor for better visual range
    return weight / shrinkageFactor
  },

  /**
   * Compute regularized coefficients based on penalty type and C strength
   * @param {Array<{id: string, val: number}>} baseWeights - Original coefficients
   * @param {string} penaltyType - 'L1 Lasso' or 'L2 Ridge'
   * @param {number} logC - log10 of regularization strength C (higher = weaker penalty)
   * @returns {Array<{id: string, value: number, original: number, isZero: boolean}>}
   */
  compute(baseWeights, penaltyType, logC) {
    // C is the inverse regularization strength (higher C = weaker penalty)
    const C = Math.pow(10, logC)
    // Lambda is the actual penalty coefficient (λ = 1/C)
    const lambda = 1 / C

    return baseWeights.map((w) => {
      let newVal = 0

      if (penaltyType === 'L1 Lasso') {
        newVal = this.applyL1(w.val, lambda)
      } else {
        newVal = this.applyL2(w.val, lambda)
      }

      return {
        id: w.id,
        value: newVal,
        original: w.val,
        isZero: Math.abs(newVal) < 1e-6,
      }
    })
  },

  /**
   * Compute HUD metrics from regularized coefficients
   * @param {number} C - Regularization strength
   * @param {Array} currentWeights - Regularized coefficients
   * @returns {Array<{label: string, value: string}>}
   */
  computeMetrics(C, currentWeights) {
    const nonZeroCount = currentWeights.filter((w) => !w.isZero).length
    const sparsityPercent = ((currentWeights.length - nonZeroCount) / currentWeights.length) * 100

    return [
      { label: 'C (Strength)', value: C.toFixed(3) },
      { label: 'Active Features', value: `${nonZeroCount} / ${currentWeights.length}` },
      { label: 'Sparsity', value: `${sparsityPercent.toFixed(0)}%` },
    ]
  },
}
