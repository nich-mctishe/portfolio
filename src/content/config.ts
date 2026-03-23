import { z, defineCollection } from 'astro:content'

const baseItemSchema = z.object({
  name: z.string(),
  since: z.number(),
  end: z.number().optional(),
})

// Infer types from Zod schemas
export type BaseSkillItem = z.infer<typeof baseItemSchema>
export type SkillItem = BaseSkillItem & {
  children?: BaseSkillItem[]
}

const itemWithChildrenSchema = baseItemSchema.extend({
  children: z.array(baseItemSchema).optional()
})

const skills = defineCollection({
  type: 'data',
  schema: z.object({
    categories: z.array(z.object({
      name: z.string(),
      items: z.array(itemWithChildrenSchema)
    }))
  })
})

export type SkillCategory = {
  name: string
  items: SkillItem[]
}

export type Skills = {
  categories: SkillCategory[]
}

const experience = defineCollection({
  type: 'data',
  schema: z.object({
    jobs: z.array(z.object({
      company: z.string(),
      location: z.string().optional(),
      logoUrl: z.string().optional(),
      logoAdaptive: z.boolean().optional(),
      role: z.string(),
      startDate: z.string(),
      endDate: z.string().optional(),
      description: z.string().optional(),
      highlights: z.array(z.string()).optional(),
      skills: z.array(z.string()).optional(),
    }))
  })
})

const education = defineCollection({
  type: 'data',
  schema: z.object({
    qualifications: z.array(z.object({
      institution: z.string(),
      location: z.string().optional(),
      logoUrl: z.string().optional(),
      degree: z.string(),
      year: z.string(),
      synopsis: z.string().optional(),
    }))
  })
})

const clients = defineCollection({
  type: 'data',
  schema: z.object({
    clients: z.array(z.object({
      name: z.string(),
      logoUrl: z.string().optional(),
      logoAdjust: z.boolean().optional(),
    }))
  })
})

const personal = defineCollection({
  type: 'data',
  schema: z.object({
    name: z.string(),
    title: z.string(),
    email: z.string().email(),
    location: z.string(),
    description: z.string(),
    socials: z.array(z.object({
      platform: z.string(),
      icon: z.string().url(),
      url: z.string().url()
    }))
  })
})

export const collections = {
  skills,
  experience,
  education,
  clients,
  personal,
}
