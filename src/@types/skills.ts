export type SkillItem = {
  name: string
  since: number
  end?: number
}

export type SkillCategory = {
  name: string
  items: SkillItem[]
}

export type Skills = {
  categories: SkillCategory[]
}