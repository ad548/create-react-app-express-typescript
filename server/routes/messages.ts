import Express, { Request, Response } from "express"
export const messagesController = Express.Router()

messagesController.post('/', (req: Request, res: Response) => {
  res.send(
    `I received your POST request. This is what you sent me: ${req.body.post}`
  )
})

messagesController.put('/:id',(req: Request, res: Response) => {
  res.send(
    `I received your PUT request. This is what you sent me: ${req.body.put}`
  )
})