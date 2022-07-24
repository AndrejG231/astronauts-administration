import "reflect-metadata"
import express from "express"

import { connectMongo } from "./services/mongo"

const PORT = ~~(process.env.PORT || 4000)
const MONGO_URL = process.env.MONGO_URL!

const main = async () => {
  await connectMongo(MONGO_URL)

  const app = express()

  app.get("/", (_, res) => {
    res.send("Welcome to Astronauts administration api.")
  })

  app.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`)
  })
}

main().catch((err) => console.log("Error: ", err))
