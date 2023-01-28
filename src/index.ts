import express, { Express, Request, Response } from 'express'
import tabs from './modules/tabs/tabs.routes'
const PORT = process.env.PORT || 8081
const app: Express = express()

// To convert `request` body to JSON if it's an Object.
app.use(express.json())
// To convert `request` body to JSON for other data types like form-data, string, array.
app.use(express.urlencoded({ extended: true }))

app.get('/', (req: Request, res: Response) =>
  res.send(
    '👋 Welcome and enjoy this starter for creating Node.js APIs with TypeScript and Express!'
  )
)

app.use('/api/tabs', tabs)

app.listen(PORT, () => console.log(`🚀 Listening on port ${PORT}`))
