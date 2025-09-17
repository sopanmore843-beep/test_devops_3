import axios from 'axios'
import { ToDo } from '../types'

const API_URL = 'http://localhost:3000/api/todos'

export async function getToDos(): Promise<ToDo[]> {
  const response = await axios.get(API_URL)
  return response.data
}

export async function createToDo(todo: Omit<ToDo, 'id'>): Promise<ToDo> {
  const response = await axios.post(API_URL, todo)
  return response.data
}

export async function updateToDo(id: string, todo: ToDo): Promise<ToDo> {
  const response = await axios.put(`${API_URL}/${id}`, todo)
  return response.data
}

export async function deleteToDo(id: string): Promise<void> {
  await axios.delete(`${API_URL}/${id}`)
}
