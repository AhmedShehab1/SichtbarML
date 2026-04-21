import { useEffect, useRef } from 'react'
import { useElementSize } from '../../core/hooks/useElementSize'

function getCssColor(variableName, fallback) {
  const rootStyles = getComputedStyle(document.documentElement)
  const value = rootStyles.getPropertyValue(variableName).trim()
  return value || fallback
}

export function VisualizationCanvas({ definition, state }) {
  const wrapRef = useRef(null)
  const hostRef = useRef(null)
  const { width, height } = useElementSize(wrapRef)

  useEffect(() => {
    if (!hostRef.current || width < 80 || height < 80) {
      return undefined
    }

    const colors = {
      positive: getCssColor('--positive', '#16906b'),
      negative: getCssColor('--negative', '#ba3f4d'),
      outline: getCssColor('--outline', '#7d7362'),
      onSurfaceDefault: getCssColor('--on-surface-default', '#1d1f22'),
      chart1: getCssColor('--chart-1', '#1b8f63'),
      chart2: getCssColor('--chart-2', '#2f6cb1'),
      chart3: getCssColor('--chart-3', '#a84f1d'),
      chart4: getCssColor('--chart-4', '#8f398d'),
    }

    const plot = definition.buildPlot({
      state,
      width,
      height,
      colors,
    })

    hostRef.current.innerHTML = ''
    hostRef.current.append(plot)

    return () => {
      plot.remove()
    }
  }, [definition, state, width, height])

  return (
    <section className="canvas-wrap" ref={wrapRef} aria-label="Visualization plot area">
      <div className="plot-host" ref={hostRef} />
    </section>
  )
}
