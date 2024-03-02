import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign } from 'hono/jwt'

export const userRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string
    }
}>();

userRouter.post('/signup', async (c) => {

    const body = await c.req.json();
  
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  
  // const body = c.req.json(); 
  
  try {
   const user =  await prisma.user.create({
      data: {
        username: body.username,
        password: body.password,
        name: body.name
      }
    });
  
    const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.json({jwt})
    
  
    
  } catch (e) {
    console.log(e);
    
    c.status(411)
    return c.text('invalid input')
  }
  
  
  return c.text('signup route')
  
  })
  
  userRouter.post("/api/v1/signin", async (c) => {
  
    const prisma = new PrismaClient({
          datasourceUrl: c.env?.DATABASE_URL	,
      }).$extends(withAccelerate());
  
  
    try{
      const body = await c.req.json();
      const user = await prisma.user.findFirst({
        where: {
          username: body.username,
          password: body.password
        }
      })
    
      if(!user) {
        c.status(403); // unauthorized
        return c.json({error: "user not found"})
      }
    
      const jwt = await sign({id: user.id}, c.env.JWT_SECRET);
      return c.json({jwt})
    } catch(e) {
      console.log(e);
      c.status(411)
      return c.text('invalid')
      
    }
  
  })
  