export function removeEmpty(obj: Record<string, string>) {
  return Object.fromEntries(
    Object.entries(obj).filter(([, v]) => v !== 'undefined')
  )
}
