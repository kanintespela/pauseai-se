import { defineCollection } from 'astro:content'
import { glob } from 'astro/loaders'
import { z } from 'astro/zod'

// Fälten här måste matcha .pages.yml, som styr formulären i Pages CMS.

/**
 * Pages CMS sparar tider utan tidszon (t.ex. 2026-11-14T18:00). De tolkas som
 * svensk tid, oavsett i vilken tidszon sajten byggs.
 */
function stockholmTime(value: string): Date {
	if (/(Z|[+-]\d{2}:?\d{2})$/.test(value) || !value.includes('T')) return new Date(value)
	const asUtc = new Date(`${value}Z`)
	const parts = new Intl.DateTimeFormat('en-US', {
		timeZone: 'Europe/Stockholm',
		hourCycle: 'h23',
		year: 'numeric',
		month: '2-digit',
		day: '2-digit',
		hour: '2-digit',
		minute: '2-digit'
	}).formatToParts(asUtc)
	const get = (type: string) => Number(parts.find((p) => p.type === type)?.value)
	const offset = Date.UTC(get('year'), get('month') - 1, get('day'), get('hour'), get('minute')) - asUtc.valueOf()
	return new Date(asUtc.valueOf() - offset)
}

const eventDate = z.union([z.date(), z.string().transform(stockholmTime)])

const sidor = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/sidor' }),
	schema: z.object({
		title: z.string(),
		description: z.string().optional()
	})
})

const nyheter = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/nyheter' }),
	schema: z.object({
		title: z.string(),
		date: z.coerce.date(),
		description: z.string().optional(),
		image: z.string().optional()
	})
})

const evenemang = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/evenemang' }),
	schema: z.object({
		title: z.string(),
		date: eventDate,
		location: z.string(),
		link: z.string().optional(),
		description: z.string().optional()
	})
})

export const collections = { sidor, nyheter, evenemang }
