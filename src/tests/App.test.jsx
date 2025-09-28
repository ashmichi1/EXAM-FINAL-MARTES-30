import { render, screen, fireEvent } from '@testing-library/react'
import App from '../App'

afterEach(() => {
  localStorage.clear()
})

test('flujo de login y creación de tarea', () => {
  render(<App />)

  // login
  const input = screen.getByTestId('login-input')
  const btn = screen.getByTestId('login-btn')
  fireEvent.change(input, { target: { value: 'Ana' } })
  fireEvent.click(btn)

  expect(screen.getByTestId('current-user')).toHaveTextContent('Ana')

  // crear tarea
  const todoInput = screen.getByTestId('todo-input')
  const addBtn = screen.getByTestId('add-btn')
  fireEvent.change(todoInput, { target: { value: 'Comprar leche' } })
  fireEvent.click(addBtn)

  expect(screen.getByText('Comprar leche')).toBeInTheDocument()
  expect(screen.getByText(/Creado por:/)).toBeInTheDocument()
})

test('editar y completar tarea', () => {
  render(<App />)
  fireEvent.change(screen.getByTestId('login-input'), { target: { value: 'Luis' } })
  fireEvent.click(screen.getByTestId('login-btn'))

  fireEvent.change(screen.getByTestId('todo-input'), { target: { value: 'Tarea A' } })
  fireEvent.click(screen.getByTestId('add-btn'))

  const todo = screen.getByText('Tarea A')
  expect(todo).toBeInTheDocument()

  const editBtn = screen.getByTestId(/^edit-/)
  fireEvent.click(editBtn)

  const saveBtn = screen.getByTestId(/^save-/)
  const editInput = screen.getByRole('textbox')
  fireEvent.change(editInput, { target: { value: 'Tarea A - editada' } })
  fireEvent.click(saveBtn)

  expect(screen.getByText('Tarea A - editada')).toBeInTheDocument()

  const toggle = screen.getByTestId(/^toggle-/)
  fireEvent.click(toggle)

  expect(toggle).toBeChecked()
})
