import React, { useState } from 'react'

export default function Login({ onLogin }) {
  const [name, setName] = useState('')

  function submit(e) {
    e.preventDefault()
    const trimmed = name.trim()
    if (!trimmed) return
    onLogin(trimmed)
  }

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white shadow-md rounded">
      <h2 className="text-xl font-semibold mb-4">Iniciar sesión (usuario)</h2>
      <form onSubmit={submit} className="flex gap-2">
        <input
          className="flex-1 p-2 border rounded"
          placeholder="Tu nombre"
          value={name}
          onChange={e => setName(e.target.value)}
          data-testid="login-input"
        />
        <button className="px-4 py-2 bg-blue-600 text-white rounded" type="submit" data-testid="login-btn">Entrar</button>
      </form>
    </div>
  )
}
