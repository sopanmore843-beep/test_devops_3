import { ToDo } from '../types'

type Props = {
  todos: ToDo[]
  onEdit: (todo: ToDo) => void
  onDelete: (id: string) => void
}

export default function ToDoList({ todos, onEdit, onDelete }: Props) {
  return (
    <ul className="border border-gray-300 divide-y divide-gray-200 mt-4">
      {todos.map((todo, index) => (
        <li
          key={todo.id}
          className={`flex justify-between items-center p-2 ${
            index % 2 === 0 ? 'bg-white' : 'bg-gray-100'
          }`}
        >
          <div>
            <p className="font-semibold">{todo.title}</p>
            <p className="text-sm text-gray-600">{todo.status}</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => onEdit(todo)}
              className="text-blue-600 hover:underline"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(todo.id)}
              className="text-red-600 hover:underline"
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  )
}
