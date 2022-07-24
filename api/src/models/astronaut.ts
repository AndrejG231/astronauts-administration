import { Schema, model } from "mongoose"

export interface IAstronaut {
  firstName: string
  lastName: string
  birthDate: Date
  superpower: string
}

const AstronautSchema = new Schema<IAstronaut>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    birthDate: { type: Date, required: true },
    superpower: { type: String, required: true },
  },
  { timestamps: true }
)

const Astronaut = model<IAstronaut>("Astronaut", AstronautSchema)

export { Astronaut }
