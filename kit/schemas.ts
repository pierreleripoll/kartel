import { z } from 'zod'

// Schemas shared by the sites. Use them in content.config.ts.

/**
 * An image of the content. Width, height and thumbhash are not here: they
 * come from the image manifest (modules/image-meta.ts), not from the content.
 */
export const imageSchema = z.object({
  src: z.string().min(1),
  alt: z.string().optional(),
  caption: z.string().optional(),
  credit: z.string().optional(),
})

export type ContentImage = z.infer<typeof imageSchema>
