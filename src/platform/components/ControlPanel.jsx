function parseRangeValue(value, fallback) {
  const parsed = Number(value)
  return Number.isNaN(parsed) ? fallback : parsed
}

export function ControlPanel({ params, state, onChange, onReset }) {
  const entries = Object.entries(params ?? {})

  return (
    <section className="controls" aria-label="Visualization controls">
      {entries.map(([key, config]) => {
        const currentValue = state[key]

        if (typeof config.value === 'boolean') {
          return (
            <div key={key} className="control-field">
              <label className="checkbox-row" htmlFor={`control-${key}`}>
                <input
                  id={`control-${key}`}
                  type="checkbox"
                  checked={Boolean(currentValue)}
                  onChange={(event) => onChange(key, event.target.checked)}
                />
                <span>{config.label}</span>
              </label>
            </div>
          )
        }

        if (Array.isArray(config.options)) {
          return (
            <div key={key} className="control-field">
              <label htmlFor={`control-${key}`}>{config.label}</label>
              <select
                id={`control-${key}`}
                value={String(currentValue)}
                onChange={(event) => {
                  const index = event.target.selectedIndex
                  const selectedOption = config.options[index]
                  onChange(key, selectedOption)
                }}
              >
                {config.options.map((option) => (
                  <option key={String(option)} value={String(option)}>
                    {String(option)}
                  </option>
                ))}
              </select>
            </div>
          )
        }

        if (
          typeof config.min === 'number' &&
          typeof config.max === 'number' &&
          typeof config.step === 'number'
        ) {
          return (
            <div key={key} className="control-field">
              <label htmlFor={`control-${key}`}>{config.label}</label>
              <div className="range-row">
                <input
                  id={`control-${key}`}
                  type="range"
                  min={config.min}
                  max={config.max}
                  step={config.step}
                  value={currentValue}
                  onChange={(event) =>
                    onChange(key, parseRangeValue(event.target.value, config.value))
                  }
                />
                <output>{Number(currentValue).toFixed(1)}</output>
              </div>
            </div>
          )
        }

        return null
      })}

      <button type="button" className="reset-btn" onClick={onReset}>
        Reset Controls
      </button>
    </section>
  )
}
