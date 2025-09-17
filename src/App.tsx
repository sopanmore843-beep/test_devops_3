import { useEffect, useState } from 'react'
import { ToDo } from './types'
import { getToDos, createToDo, updateToDo, deleteToDo } from './services/api'
import ToDoList from './components/ToDoList'
import ToDoForm from './components/ToDoForm'

function App() {
  const [todos, setTodos] = useState<ToDo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [editingToDo, setEditingToDo] = useState<ToDo | null>(null)

  const fetchTodos = async () => {
    try {
      setLoading(true)
      const data = await getToDos()
      setTodos(data)
      setError('')
    } catch (err) {
      setError('Failed to load ToDos')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTodos()
  }, [])

  const handleCreate = async (todo: Omit<ToDo, 'id'>) => {
    try {
      const newToDo = await createToDo(todo)
      setTodos(prev => [...prev, newToDo])
    } catch {
      setError('Failed to create ToDo')
    }
  }

  const handleUpdate = async (todo: ToDo) => {
    try {
      const updated = await updateToDo(todo.id, todo)
      setTodos(prev => prev.map(t => (t.id === todo.id ? updated : t)))
      setEditingToDo(null)
    } catch {
      setError('Failed to update ToDo')
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await deleteToDo(id)
      setTodos(prev => prev.filter(t => t.id !== id))
    } catch {
      setError('Failed to delete ToDo')
    }
  }

  return (
    <main className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">ToDo List</h1>
      {error && <div className="text-red-600 mb-2">{error}</div>}
      <ToDoForm onSubmit={editingToDo ? handleUpdate : handleCreate} existingToDo={editingToDo} />
      {loading ? (
        <p>Loading...</p>
      ) : todos.length === 0 ? (
        <p>No ToDo items yet.</p>
      ) : (
        <ToDoList
          todos={todos}
          onEdit={setEditingToDo}
          onDelete={handleDelete}
        />
      )}
    </main>
  )
}

export default App
