import * as d3 from 'd3'
import * as Plot from '@observablehq/plot'
import { LossEngine } from './engine'

const params = {
  y: { value: 1, options: [1, -1], label: 'True Label (y)' },
  show01: { value: true, label: '0-1 Loss' },
  showHinge: { value: true, label: 'Hinge Loss' },
  showLog: { value: true, label: 'Log Loss' },
  showSquared: { value: false, label: 'Squared Loss' },
  zProbe: {
    value: -1,
    min: -3,
    max: 3,
    step: 0.1,
    label: 'Probe Output (z)',
  },
}

function getInitialState() {
  return Object.fromEntries(
    Object.entries(params).map(([key, config]) => [key, config.value]),
  )
}

function computeHUD(state) {
  const currentLoss = LossEngine.calculate(state.y, state.zProbe)

  return [
    { label: '0-1 Loss', value: currentLoss.loss01.toFixed(0) },
    { label: 'Hinge', value: currentLoss.lossHinge.toFixed(2) },
    { label: 'Log', value: currentLoss.lossLog.toFixed(2) },
    { label: 'Squared', value: currentLoss.lossSq.toFixed(2) },
  ]
}

function buildPlot({ state, width, height, colors }) {
  const zRange = d3.range(-3, 3.01, 0.05)
  const plotData = LossEngine.generateData(state.y, zRange)
  const probePoint = [LossEngine.calculate(state.y, state.zProbe)]

  const marks = [
    Plot.rectX([0], {
      x1: state.y === 1 ? 0 : -3,
      x2: state.y === 1 ? 3 : 0,
      fill: colors.positive,
      fillOpacity: 0.08,
    }),
    Plot.rectX([0], {
      x1: state.y === 1 ? -3 : 0,
      x2: state.y === 1 ? 0 : 3,
      fill: colors.negative,
      fillOpacity: 0.08,
    }),
    Plot.text([state.y === 1 ? 1.5 : -1.5], {
      x: (d) => d,
      y: 3.8,
      text: () => 'RICHTIG (Correct)',
      fill: colors.positive,
      fontWeight: 600,
    }),
    Plot.text([state.y === 1 ? -1.5 : 1.5], {
      x: (d) => d,
      y: 3.8,
      text: () => 'FALSCH (Incorrect)',
      fill: colors.negative,
      fontWeight: 600,
    }),
    Plot.ruleX([0], { stroke: colors.outline, strokeWidth: 1.5 }),
    Plot.ruleY([0], { stroke: colors.outline, strokeWidth: 1.5 }),
    Plot.ruleX([state.zProbe], {
      stroke: colors.onSurfaceDefault,
      strokeDasharray: '4,4',
      strokeOpacity: 0.4,
    }),
    state.show01 &&
      Plot.line(plotData, {
        x: 'z',
        y: 'loss01',
        stroke: colors.chart1,
        strokeWidth: 2.5,
        curve: state.y === 1 ? 'step-after' : 'step-before',
      }),
    state.showHinge &&
      Plot.line(plotData, {
        x: 'z',
        y: 'lossHinge',
        stroke: colors.chart3,
        strokeWidth: 2.5,
      }),
    state.showLog &&
      Plot.line(plotData, {
        x: 'z',
        y: 'lossLog',
        stroke: colors.chart4,
        strokeWidth: 2.5,
      }),
    state.showSquared &&
      Plot.line(plotData, {
        x: 'z',
        y: 'lossSq',
        stroke: colors.chart2,
        strokeWidth: 2.5,
      }),
    state.show01 &&
      Plot.dot(probePoint, {
        x: () => state.zProbe,
        y: 'loss01',
        fill: colors.chart1,
        r: 4,
      }),
    state.showHinge &&
      Plot.dot(probePoint, {
        x: () => state.zProbe,
        y: 'lossHinge',
        fill: colors.chart3,
        r: 4,
      }),
    state.showLog &&
      Plot.dot(probePoint, {
        x: () => state.zProbe,
        y: 'lossLog',
        fill: colors.chart4,
        r: 4,
      }),
    state.showSquared &&
      Plot.dot(probePoint, {
        x: () => state.zProbe,
        y: 'lossSq',
        fill: colors.chart2,
        r: 4,
      }),
    Plot.text([state.zProbe], {
      x: (d) => d,
      y: -0.2,
      text: (d) => `z = ${d.toFixed(1)}`,
      fill: colors.onSurfaceDefault,
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
      domain: [-3, 3],
      label: 'Raw Model Output (z) ->',
      grid: true,
    },
    y: {
      domain: [0, 4],
      label: 'Loss Penalty',
      grid: true,
    },
    marks: marks.filter(Boolean),
  })
}

export const classificationLossDefinition = {
  id: 'viz-001',
  title: 'Classification Loss Visualizer',
  params,
  getInitialState,
  computeHUD,
  buildPlot,
}
