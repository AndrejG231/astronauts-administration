import "reflect-metadata"
import express from "express"

const PORT = process.env.PORT || 4000

const main = async () => {
  const app = express()

  app.get("/", (_, res) => {
    res.send("Welcome to Astronauts administration api.")
  })

  app.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`)
  })
}

main()
