// Kalenderfil för ett enskilt evenemang, för knappen "Lägg till i kalendern".

import type { APIRoute, GetStaticPaths } from 'astro'
import { getCollection, type CollectionEntry } from 'astro:content'
import { icsCalendar, url } from '../../lib'

export const getStaticPaths: GetStaticPaths = async () => {
	const events = await getCollection('evenemang')
	return events.map((event) => ({ params: { slug: event.id }, props: { event } }))
}

export const GET: APIRoute = ({ props, site }) => {
	const { event } = props as { event: CollectionEntry<'evenemang'> }
	const pageUrl = new URL(url(`/evenemang/${event.id}`), site).href
	return new Response(icsCalendar([{ id: event.id, ...event.data, pageUrl }], event.data.title), {
		headers: { 'Content-Type': 'text/calendar; charset=utf-8' }
	})
}
