import express from 'express'
import fs from 'fs/promises'
import cors from 'cors'
import { v4 as uuidv4 } from 'uuid'
import path from 'path'

const app = express()
const PORT = 3000
const DB_PATH = path.join(__dirname, 'db.json')

app.use(cors())
app.use(express.json())

const readData = async () => {
  const data = await fs.readFile(DB_PATH, 'utf-8')
  return JSON.parse(data)
}

const writeData = async (data: any) => {
  await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2))
}

app.get('/api/todos', async (_, res) => {
  const todos = await readData()
  res.json(todos)
})

app.post('/api/todos', async (req, res) => {
  const { title, status } = req.body
  if (!title) return res.status(400).json({ error: 'Title is required' })
  const todos = await readData()
  const newToDo = { id: uuidv4(), title, status }
  todos.push(newToDo)
  await writeData(todos)
  res.status(201).json(newToDo)
})

app.put('/api/todos/:id', async (req, res) => {
  const { id } = req.params
  const { title, status } = req.body
  const todos = await readData()
  const index = todos.findIndex((t: any) => t.id === id)
  if (index === -1) return res.status(404).json({ error: 'Not found' })
  todos[index] = { id, title, status }
  await writeData(todos)
  res.json(todos[index])
})

app.delete('/api/todos/:id', async (req, res) => {
  const { id } = req.params
  const todos = await readData()
  const filtered = todos.filter((t: any) => t.id !== id)
  await writeData(filtered)
  res.status(204).end()
})

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
})
