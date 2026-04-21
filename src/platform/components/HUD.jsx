export function HUD({ items }) {
  if (!items?.length) {
    return null
  }

  return (
    <section className="hud" aria-label="Current metrics">
      {items.map((item) => (
        <article className="hud-card" key={item.label}>
          <p className="label">{item.label}</p>
          <p className="value">{item.value}</p>
        </article>
      ))}
    </section>
  )
}
