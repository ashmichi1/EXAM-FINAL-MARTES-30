import React, { useState } from 'react'

export default function TodoForm({ onAdd, currentUser }) {
  const [text, setText] = useState('')

  function submit(e) {
    e.preventDefault()
    const t = text.trim()
    if (!t) return
    onAdd({ text: t, author: currentUser })
    setText('')
  }

  return (
    <form onSubmit={submit} className="flex gap-2 mb-4">
      <input
        data-testid="todo-input"
        className="flex-1 p-2 border rounded"
        placeholder="Nueva tarea..."
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <button data-testid="add-btn" className="px-4 py-2 bg-green-600 text-white rounded" type="submit">Añadir</button>
    </form>
  )
}
