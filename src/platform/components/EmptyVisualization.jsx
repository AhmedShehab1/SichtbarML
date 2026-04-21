export function EmptyVisualization({ title }) {
  return (
    <section className="empty-viz" aria-label="Visualization placeholder">
      <div>
        <h3>{title}</h3>
        <p>This module is cataloged and ready. Add a definition file to render it.</p>
      </div>
    </section>
  )
}
