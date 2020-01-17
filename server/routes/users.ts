import Express, { Request, Response } from "express"
export const userController = Express.Router()

userController.get("/:id", (req: Request, res: Response) => {
  const id = req.params.id
  res.send({ express: `Requested data for user ID: ${id}` })
})