import { Hono } from 'hono'


type Bindings = {
  DB:D1Database,
  MY_VAR:string
}


const app = new Hono<{ Bindings: Bindings }>()

app.post('/', async(c) => {
  const body = await c.req.json();
  const {id} = body;
  return c.json(id,{status:200});

})

export default app
