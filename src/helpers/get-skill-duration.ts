const getSkillDuration = (since: number, end?: number): number => {
  const now = new Date().getFullYear()
  const duration = end 
    ? end - since 
    : now - since
    || 1

  return duration
}

export default getSkillDuration
