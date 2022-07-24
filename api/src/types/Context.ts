import mongoose from "mongoose"
import { Request, Response } from "express"

import { Models } from "../models"

export interface Context {
  req: Request
  res: Response
  models: Models
  services: {
    db: typeof mongoose
  }
}
