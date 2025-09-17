import { useEffect, useState } from 'react'
import { ToDo } from '../types'

type Props = {
  onSubmit: (todo: Omit<ToDo, 'id'> | ToDo) => void
  existingToDo?: ToDo | null
}

export default function ToDoForm({ onSubmit, existingToDo }: Props) {
  const [title, setTitle] = useState('')
  const [status, setStatus] = useState('pending')
  const [error, setError] = useState('')

  useEffect(() => {
    if (existingToDo) {
      setTitle(existingToDo.title)
      setStatus(existingToDo.status)
    } else {
      setTitle('')
      setStatus('pending')
    }
  }, [existingToDo])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) {
      setError('Title is required')
      return
    }
    setError('')
    if (existingToDo) {
      onSubmit({ ...existingToDo, title, status })
    } else {
      onSubmit({ title, status })
    }
    setTitle('')
    setStatus('pending')
  }

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="mb-2">
        <label htmlFor="title" className="block font-medium">
          Title
        </label>
        <input
          id="title"
          type="text"
          className="border border-gray-300 p-2 w-full"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
      </div>
      <div className="mb-2">
        <label htmlFor="status" className="block font-medium">
          Status
        </label>
        <select
          id="status"
          className="border border-gray-300 p-2 w-full"
          value={status}
          onChange={e => setStatus(e.target.value)}
        >
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
      </div>
      {error && <div className="text-red-600 mb-2">{error}</div>}
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        {existingToDo ? 'Update ToDo' : 'Add ToDo'}
      </button>
    </form>
  )
}
