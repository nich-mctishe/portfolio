export function calculateSkillDuration(since: number, end?: number): number {
  const now = new Date().getFullYear()
  let duration = end ? end - since : now - since
  if (duration < 1) duration = 1

  return duration
}
