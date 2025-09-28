import React from 'react'
import TodoItem from './TodoItem'

export default function TodoList({ todos, onToggle, onDelete, onEdit }) {
  if (!todos.length) return <div className="text-center text-gray-500">No hay tareas aún.</div>
  return (
    <div className="flex flex-col gap-2">
      {todos.map(t => (
        <TodoItem key={t.id} todo={t} onToggle={onToggle} onDelete={onDelete} onEdit={onEdit} />
      ))}
    </div>
  )
}
