import { z, defineCollection } from 'astro:content'

const skills = defineCollection({
  type: 'data',
  schema: z.object({
    categories: z.array(z.object({
      name: z.string(),
      items: z.array(z.string())
    }))
  })
})

const experience = defineCollection({
  type: 'data',
  schema: z.object({
    jobs: z.array(z.object({
      company: z.string(),
      role: z.string(),
      startDate: z.string(),
      endDate: z.string().optional(),
      description: z.string().optional(),
    }))
  })
})

const education = defineCollection({
  type: 'data',
  schema: z.object({
    qualifications: z.array(z.object({
      institution: z.string(),
      degree: z.string(),
      year: z.string()
    }))
  })
})

const highlights = defineCollection({
  type: 'data',
  schema: z.object({
    clients: z.array(z.object({
      name: z.string(),
      logoUrl: z.string().optional(),
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
    socials: z.array(z.object({
      platform: z.string(),
      url: z.string().url()
    }))
  })
})

export const collections = {
  skills,
  experience,
  education,
  highlights,
  personal,
}
