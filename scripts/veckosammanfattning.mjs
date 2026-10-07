// Skriver veckans sammanfattning till veckan.md: vad som har ändrats på sajten de
// senaste sju dagarna och vilka evenemang som kommer de närmaste två veckorna.

import fs from 'node:fs'
import { execFileSync } from 'node:child_process'
import { addDays, formatDateTime, readEvents, siteUrl, stockholmDay } from './lib.mjs'

const today = stockholmDay(new Date())
const site = siteUrl()

const log = execFileSync('git', ['log', '--since=7 days ago', '--no-merges', '--format=%s (%an)', 'HEAD'], { encoding: 'utf8' })
	.trim()
	.split('\n')
	.filter(Boolean)

const upcoming = readEvents().filter((e) => {
	const day = stockholmDay(e.date)
	return day >= today && day <= addDays(today, 14)
})

const lines = [
	'## Ändringar de senaste sju dagarna',
	'',
	...(log.length ? log.map((l) => `- ${l}`) : ['Inga ändringar.']),
	'',
	'## Evenemang de närmaste två veckorna',
	'',
	...(upcoming.length
		? upcoming.map((e) => `- **${e.title}**, ${formatDateTime(e.date)}, ${e.location}. ${site}/evenemang/${e.id}`)
		: [`Inga inlagda. Lägg gärna till ett i Pages CMS eller via formuläret "Föreslå ett evenemang".`]),
	'',
	`Sajten: ${site}`,
	''
]
fs.writeFileSync('veckan.md', lines.join('\n'))
console.log(lines.join('\n'))
