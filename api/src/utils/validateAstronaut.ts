import { IAstronaut } from "../typedefs/IAstronaut"

type ValidationResult =
  | {
      isValid: true
    }
  | {
      isValid: false
      field: string
      problem: string
    }

/**
 * Validate astronaut input data
 * Returns problem information for first invalid field
 */
const validateAstronaut = (
  astronaut: Partial<IAstronaut>
): ValidationResult => {
  let problem = ""

  for (const [field, value] of Object.entries(astronaut)) {
    if (field === "firstName" || field === "lastName") {
      // Check minimal length of names
      if (typeof value === "string" && value.length < 2) {
        problem = "Minimal length is 1"
      }
    }

    if (field === "superPower") {
      // Minimal length of super power
      if (typeof value === "string" && value.length < 3) {
        problem = "Minimal length is 3"
      }
    }

    // Return first invalid if problem found
    if (problem) {
      return {
        isValid: false,
        field,
        problem,
      }
    }
  }

  return { isValid: true }
}

export { validateAstronaut }
