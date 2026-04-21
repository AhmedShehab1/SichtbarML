function matchesQuery(item, query) {
  if (!query.trim()) {
    return true
  }

  const haystack = [item.title, item.description, ...(item.tags ?? [])]
    .join(' ')
    .toLowerCase()

  return haystack.includes(query.toLowerCase())
}

export function Sidebar({
  items,
  selectedId,
  query,
  activeCategory,
  onQueryChange,
  onCategoryChange,
  onSelect,
}) {
  const categories = ['All', ...new Set(items.map((item) => item.category))]

  const filteredItems = items.filter((item) => {
    const categoryOk = activeCategory === 'All' || item.category === activeCategory
    return categoryOk && matchesQuery(item, query)
  })

  const grouped = categories
    .filter((category) => category !== 'All')
    .map((category) => ({
      category,
      items: filteredItems.filter((item) => item.category === category),
    }))
    .filter((group) => group.items.length > 0)

  return (
    <aside className="sidebar" aria-label="Visualization catalog navigation">
      <h2>SichtbarML</h2>
      <p className="meta">Interactive machine learning visualization atlas</p>

      <div className="search-row">
        <input
          type="search"
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="Search visualizations"
          aria-label="Search visualizations"
        />

        <select
          aria-label="Filter by category"
          value={activeCategory}
          onChange={(event) => onCategoryChange(event.target.value)}
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {grouped.map((group) => (
        <section className="nav-group" key={group.category}>
          <h3 className="group-title">{group.category}</h3>
          {group.items.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`viz-button ${selectedId === item.id ? 'active' : ''}`}
              onClick={() => onSelect(item.id)}
              aria-current={selectedId === item.id ? 'page' : undefined}
            >
              <span className="title">{item.title}</span>
              <span className="desc">{item.description}</span>
            </button>
          ))}
        </section>
      ))}

      {!filteredItems.length ? (
        <section className="nav-group">
          <p className="meta">No visualizations matched the current search.</p>
        </section>
      ) : null}
    </aside>
  )
}
