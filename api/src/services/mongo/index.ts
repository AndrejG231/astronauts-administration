import mongoose from "mongoose"

const connectMongo = async (url: string) => {
  await mongoose.connect(url)
  console.log("Successfully connected to mongo.")

  return
}

export { connectMongo }
