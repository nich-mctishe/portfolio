import type { SkillItem } from '../content/config'
import { calculateSkillDuration } from './calculate-skill-duration'

export const determineFullExperiencePoints = (skills: SkillItem[]): number => {
  if (skills.length === 0) return 0
  
  let maxDuration = 0

  const processSkill = (skill: SkillItem) => {
    const skillDuration = calculateSkillDuration(skill.since, skill.end)
    if (skillDuration > maxDuration) {
      maxDuration = skillDuration
    }
    
    // Recurse into children
    if (skill.children) {
      skill.children.forEach(processSkill)
    }
  }

  skills.forEach(processSkill)

  return maxDuration
}
