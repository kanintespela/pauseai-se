// Kalenderfil med alla evenemang. Den som prenumererar på den i mobilens kalender
// får nya evenemang automatiskt, eftersom sajten byggs om varje natt.

import type { APIRoute } from 'astro'
import { getCollection } from 'astro:content'
import { icsCalendar, url } from '../lib'

export const GET: APIRoute = async ({ site }) => {
	const events = (await getCollection('evenemang'))
		.sort((a, b) => a.data.date.valueOf() - b.data.date.valueOf())
		.map((e) => ({ id: e.id, ...e.data, pageUrl: new URL(url(`/evenemang/${e.id}`), site).href }))

	return new Response(icsCalendar(events), {
		headers: { 'Content-Type': 'text/calendar; charset=utf-8' }
	})
}
