// Skriver en påminnelse för varje evenemang som äger rum om DAGAR dagar (svensk tid).
// Varje påminnelse blir en fil i mappen paminnelser/, som arbetsflödet gör om till ärenden.

import fs from 'node:fs'
import { addDays, formatDateTime, readEvents, siteUrl, stockholmDay } from './lib.mjs'

const days = Number(process.env.DAGAR ?? 3)
const target = addDays(stockholmDay(new Date()), days)
const site = siteUrl()

fs.mkdirSync('paminnelser', { recursive: true })
for (const event of readEvents().filter((e) => stockholmDay(e.date) === target)) {
	const url = `${site}/evenemang/${event.id}`
	const text = [
		`**${event.title}** äger rum ${formatDateTime(event.date)}, ${event.location}.`,
		'',
		'Dags att sprida det:',
		'',
		'- [ ] Dela i WhatsApp-gruppen',
		'- [ ] Dela i sociala medier',
		'- [ ] Påminn dem som har anmält sig, om det finns en anmälan',
		'',
		`Sidan på sajten: ${url}`,
		event.link ? `Anmälan eller mer info: ${event.link}` : '',
		'',
		'Stäng ärendet när det är gjort.'
	].join('\n')
	fs.writeFileSync(`paminnelser/${event.id}.md`, `${event.title}\n${text}\n`)
	console.log(`Påminnelse: ${event.title}`)
}
