/**
 * Export all models as single models object, which is provided to resolvers through context
 */

import { Astronaut } from "./astronaut"

export const models = { Astronaut }
export type Models = typeof models
