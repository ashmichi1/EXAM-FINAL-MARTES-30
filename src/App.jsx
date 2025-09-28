import React, { useMemo, useState } from 'react'
import { useLocalStorage } from './hooks/useLocalStorage'
import Login from './components/Login'
import TodoForm from './components/TodoForm'
import TodoList from './components/TodoList'
import { filterTasks } from './utils/filterUtils'

function uid() {
  return Math.random().toString(36).slice(2, 9)
}

export default function App() {
  const [user, setUser] = useLocalStorage('team:user', null)
  const [todos, setTodos] = useLocalStorage('team:todos', [])

  const [query, setQuery] = useState('')
  const [filterBy, setFilterBy] = useState('any')

  function handleLogin(name) {
    setUser(name)
  }

  function addTask({ text, author }) {
    const t = { id: uid(), text, author, completed: false, createdAt: Date.now() }
    setTodos(prev => [t, ...prev])
  }

  function toggleTask(id) {
    setTodos(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t))
  }

  function deleteTask(id) {
    setTodos(prev => prev.filter(t => t.id !== id))
  }

  function editTask(id, newText) {
    setTodos(prev => prev.map(t => t.id === id ? { ...t, text: newText } : t))
  }

  const visible = useMemo(() => filterTasks(todos, query, filterBy), [todos, query, filterBy])

  if (!user) return <Login onLogin={handleLogin} />

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow">
        <header className="mb-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Team To-Do</h1>
          <div>
            <div className="text-sm text-gray-600">Sesión: <strong data-testid="current-user">{user}</strong></div>
            <button className="text-xs mt-1 underline" onClick={() => setUser(null)} data-testid="logout">Cerrar sesión</button>
          </div>
        </header>

        <section>
          <TodoForm onAdd={addTask} currentUser={user} />

          <div className="mb-4 flex gap-2">
            <input className="flex-1 p-2 border rounded" placeholder="Buscar..." value={query} onChange={e => setQuery(e.target.value)} data-testid="search" />
            <select value={filterBy} onChange={e => setFilterBy(e.target.value)} data-testid="filter" className="p-2 border rounded">
              <option value="any">Autor o texto</option>
              <option value="author">Autor</option>
              <option value="text">Texto</option>
            </select>
          </div>

          <TodoList todos={visible} onToggle={toggleTask} onDelete={deleteTask} onEdit={editTask} />
        </section>

        <footer className="mt-6 text-xs text-gray-500">Proyecto hecho por: <strong data-testid="project-author">ASHLY MICHELLE GARCIA VASQUEZ Y JEHIMY VANESSA HERNANDEZ RODRIGUEZ</strong> — Editado: <em data-testid="project-edited">Automático</em></footer>
      </div>
    </div>
  )
}
