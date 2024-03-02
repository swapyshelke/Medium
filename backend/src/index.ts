import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'


const app = new Hono<{
  Bindings: {
    DATABASE_URL: string,
  }
}>()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.post('/api/v1/signup', async (c) => {

  const body = await c.req.json();

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
}).$extends(withAccelerate());

// const body = c.req.json(); 

try {
  await prisma.user.create({
    data: {
      username: "uone",
      password: "utwo",
      name: "name"
    }
  })
} catch (e) {
  console.log(e);
  
  c.status(411)
  return c.text('invalid input')
}


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
