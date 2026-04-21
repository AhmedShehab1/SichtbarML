import { useMemo, useState } from 'react'
import { Sidebar } from './platform/components/Sidebar'
import { ControlPanel } from './platform/components/ControlPanel'
import { HUD } from './platform/components/HUD'
import { VisualizationCanvas } from './platform/components/VisualizationCanvas'
import { EmptyVisualization } from './platform/components/EmptyVisualization'
import { visualizations } from './platform/registry/visualizations'
import { createStore } from './core/state/createStore'
import { useStore } from './core/hooks/useStore'

function App() {
  const [query, setQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')
  const [selectedId, setSelectedId] = useState(visualizations[0]?.id ?? '')

  const selectedVisualization =
    visualizations.find((item) => item.id === selectedId) ?? visualizations[0]

  const definition = selectedVisualization?.definition

  const store = useMemo(
    () => createStore(definition ? definition.getInitialState() : {}),
    [definition],
  )

  const state = useStore(store)
  const hudItems = definition ? definition.computeHUD(state) : []

  const handleParamChange = (key, value) => {
    store.set({ [key]: value })
  }

  const handleReset = () => {
    if (definition) {
      store.replace(definition.getInitialState())
    }
  }

  return (
    <div className="app-shell">
      <Sidebar
        items={visualizations}
        selectedId={selectedVisualization.id}
        query={query}
        activeCategory={activeCategory}
        onQueryChange={setQuery}
        onCategoryChange={setActiveCategory}
        onSelect={setSelectedId}
      />

      <main className="workspace" aria-live="polite">
        <header className="workspace-header">
          <p className="eyebrow">SICHTBAR ML LAB</p>
          <h1>{selectedVisualization.title}</h1>
          <p className="lede">{selectedVisualization.description}</p>
        </header>

        <HUD items={hudItems} />

        {definition ? (
          <>
            <VisualizationCanvas definition={definition} state={state} />
            <ControlPanel
              params={definition.params}
              state={state}
              onChange={handleParamChange}
              onReset={handleReset}
            />
          </>
        ) : (
          <EmptyVisualization title={selectedVisualization.title} />
        )}
      </main>
    </div>
  )
}

export default App
