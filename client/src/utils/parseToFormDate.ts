/**
 * Utility function parses datetime string into form compatible date
 */
const parseToFormDate = (date: number | string | Date) => {
  const parsedDate = new Date(date).toISOString().split("T")[0]
  return parsedDate
}

export { parseToFormDate }
