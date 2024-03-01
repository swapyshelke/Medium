import { Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.post('/api/v1/signup', (c) => {
	return c.text('signup route')
})

app.post("/api/v1/signin", (c) => {
  return c.text("signin page")
})

app.post(" /api/v1/blog", (c) => {
  return c.text("post blogs")
})

app.put("/api/v1/blog", (c) => {
  return c.text("update blog")
})

app.get("/api/v1/blog/:id", (c) => {
  return c.text("get specific blog")
})

app.get("/api/v1/blog/bulk", (c) => {
  return c.text("get all blogs")
})

export default app
