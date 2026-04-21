import * as Plot from '@observablehq/plot'
import { RegularizationEngine } from './engine'

const params = {
  penaltyType: {
    value: 'L2 Ridge',
    options: ['L1 Lasso', 'L2 Ridge'],
    label: 'Penalty Type',
  },
  logC: {
    value: 2,
    min: -3,
    max: 2,
    step: 0.01,
    label: 'log₁₀(C)',
  },
}

let baseWeights = []

function getInitialState() {
  // Generate random baseline weights on first init
  if (baseWeights.length === 0) {
    baseWeights = RegularizationEngine.generateBaseWeights(10)
  }

  return {
    penaltyType: params.penaltyType.value,
    logC: params.logC.value,
  }
}

function computeHUD(state) {
  const C = Math.pow(10, state.logC)
  const currentWeights = RegularizationEngine.compute(baseWeights, state.penaltyType, state.logC)
  return RegularizationEngine.computeMetrics(C, currentWeights)
}

function buildPlot({ state, width, height, colors }) {
  const C = Math.pow(10, state.logC)
  const currentWeights = RegularizationEngine.compute(baseWeights, state.penaltyType, state.logC)

  const marks = [
    // Zero baseline rule
    Plot.ruleY([0], {
      stroke: colors.outline,
      strokeWidth: 1.5,
    }),

    // Ghost bars showing original unregularized weights
    Plot.barY(currentWeights, {
      x: 'id',
      y: 'original',
      fill: colors.onSurfaceDefault,
      fillOpacity: 0.1,
      stroke: colors.outline,
      strokeDasharray: '4,4',
    }),

    // Active coefficient bars (color-coded by sign)
    Plot.barY(currentWeights, {
      x: 'id',
      y: 'value',
      fill: (d) =>
        d.isZero ? colors.outline : d.value > 0 ? colors.chart1 : colors.chart4,
      rx: 4,
      title: (d) => `${d.id}: ${d.value.toFixed(3)}`,
    }),

    // Text labels for coefficient values
    Plot.text(currentWeights, {
      x: 'id',
      y: (d) => d.value + (d.value >= 0 ? 0.35 : -0.35),
      text: (d) => (d.isZero ? '0' : d.value.toFixed(1)),
      fill: colors.onSurfaceDefault,
      fontSize: 11,
      fontWeight: 'bold',
    }),
  ]

  return Plot.plot({
    width,
    height,
    marginTop: 50,
    marginBottom: 50,
    marginLeft: 60,
    marginRight: 20,
    style: {
      background: 'transparent',
      color: colors.onSurfaceDefault,
      fontFamily: 'IBM Plex Sans, sans-serif',
      fontSize: '13px',
    },
    x: {
      label: 'Feature →',
      domain: currentWeights.map((w) => w.id),
      padding: 0.4,
    },
    y: {
      domain: [-5.5, 5.5],
      label: '↑ Coefficient Value',
      grid: true,
    },
    marks: marks.filter(Boolean),
  })
}

export const regularizationDefinition = {
  id: 'viz-002',
  title: 'L1 vs L2 Regularization',
  params,
  getInitialState,
  computeHUD,
  buildPlot,
}
