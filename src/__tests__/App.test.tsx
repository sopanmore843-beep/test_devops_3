import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import App from '../App'
import * as api from '../services/api'
import { ToDo } from '../types'

vi.mock('../services/api')

const mockTodos: ToDo[] = [
  { id: '1', title: 'Test 1', status: 'pending' },
  { id: '2', title: 'Test 2', status: 'completed' }
]

describe('App', () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  it('renders list of todos', async () => {
    vi.spyOn(api, 'getToDos').mockResolvedValue(mockTodos)
    render(<App />)
    await waitFor(() => {
      expect(screen.getByText('Test 1')).toBeInTheDocument()
      expect(screen.getByText('Test 2')).toBeInTheDocument()
    })
  })

  it('creates new todo', async () => {
    vi.spyOn(api, 'getToDos').mockResolvedValue([])
    vi.spyOn(api, 'createToDo').mockResolvedValue({ id: '3', title: 'New Task', status: 'pending' })

    render(<App />)
    await waitFor(() => expect(screen.getByText('No ToDo items yet.')).toBeInTheDocument())

    fireEvent.change(screen.getByLabelText(/title/i), { target: { value: 'New Task' } })
    fireEvent.click(screen.getByText(/add todo/i))

    await waitFor(() => {
      expect(screen.getByText('New Task')).toBeInTheDocument()
    })
  })
})
