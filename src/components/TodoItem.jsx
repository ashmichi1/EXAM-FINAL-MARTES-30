import React, { useState } from 'react'

export default function TodoItem({ todo, onToggle, onDelete, onEdit }) {
  const [editing, setEditing] = useState(false)
  const [value, setValue] = useState(todo.text)

  function save() {
    const v = value.trim()
    if (!v) return
    onEdit(todo.id, v)
    setEditing(false)
  }

  return (
    <div className="p-2 border rounded flex items-start gap-2" data-testid={`todo-${todo.id}`}>
      <input type="checkbox" checked={!!todo.completed} onChange={() => onToggle(todo.id)} data-testid={`toggle-${todo.id}`} />
      <div className="flex-1">
        <div className="text-sm text-gray-500">Creado por: <strong>{todo.author}</strong></div>
        {!editing ? (
          <div className={`text-base ${todo.completed ? 'line-through text-gray-400' : ''}`}>{todo.text}</div>
        ) : (
          <div className="flex gap-2">
            <input value={value} onChange={e => setValue(e.target.value)} className="flex-1 p-1 border rounded" />
            <button onClick={save} className="px-2 py-1 bg-blue-500 text-white rounded" data-testid={`save-${todo.id}`}>Guardar</button>
          </div>
        )}
        <div className="mt-2 flex gap-2">
          <button onClick={() => setEditing(v => !v)} className="px-2 py-1 bg-yellow-400 rounded" data-testid={`edit-${todo.id}`}>{editing ? 'Cancelar' : 'Editar'}</button>
          <button onClick={() => onDelete(todo.id)} className="px-2 py-1 bg-red-500 text-white rounded" data-testid={`delete-${todo.id}`}>Eliminar</button>
        </div>
      </div>
    </div>
  )
}
