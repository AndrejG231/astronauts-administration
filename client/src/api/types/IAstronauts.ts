export interface IAstronaut {
  birthDate: Date
  _id: string
  superpower: string
  lastName: string
  firstName: string
}

export interface IAstronautUpdateFields extends Omit<IAstronaut, "_id"> {}
