export function parseDate(date: Date) {
  date = new Date(date);
  return `${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`
}