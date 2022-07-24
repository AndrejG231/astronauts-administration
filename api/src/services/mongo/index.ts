import mongoose from "mongoose"

const connectMongo = async (url: string) => {
  const connection = await mongoose.connect(url)

  return connection
}

export { connectMongo }
