import type { SkillItem } from '../@types/skills'
import getSkillDuration from './get-skill-duration'

const determineFullExperiencePoints = (skills: SkillItem[]): number => {
  if (skills.length === 0) return 0;
  
  let fullExperiencePoints = getSkillDuration(skills[0].since, skills[0].end)

  skills.forEach((skill) => {
    const skillDuration = getSkillDuration(skill.since, skill.end)

    if (skillDuration > fullExperiencePoints) {
      fullExperiencePoints = skillDuration
    }
  })

  return fullExperiencePoints
}

export default determineFullExperiencePoints