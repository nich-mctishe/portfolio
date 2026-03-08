import type { SkillItem } from '../content/config'
import getSkillDuration from './get-skill-duration'

const determineFullExperiencePoints = (skills: SkillItem[]): number => {
  if (skills.length === 0) return 0;
  
  let maxDuration = 0

  const processSkill = (skill: SkillItem) => {
    const skillDuration = getSkillDuration(skill.since, skill.end)
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

export default determineFullExperiencePoints