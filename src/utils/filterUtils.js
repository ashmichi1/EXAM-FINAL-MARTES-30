export function filterTasks(tasks, query, filterBy) {
  const q = query.trim().toLowerCase()
  if (!q) return tasks
  return tasks.filter(t => {
    if (filterBy === 'author') return t.author.toLowerCase().includes(q)
    if (filterBy === 'text') return t.text.toLowerCase().includes(q)
    return (
      t.author.toLowerCase().includes(q) || t.text.toLowerCase().includes(q)
    )
  })
}
