// Skriver veckans sammanfattning till veckan.md: vad som har ändrats på sajten de
// senaste sju dagarna och vilka evenemang som kommer de närmaste två veckorna.

import fs from 'node:fs'
import path from 'node:path'
import { execFileSync } from 'node:child_process'
import { addDays, formatDateTime, readEvents, readMarkdown, siteUrl, stockholmDay } from './lib.mjs'

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

const newsDir = 'src/content/blogg'
const news = fs
	.readdirSync(newsDir)
	.filter((f) => f.endsWith('.md'))
	.map((f) => ({ id: f.replace(/\.md$/, ''), ...readMarkdown(path.join(newsDir, f)).data }))
	.filter((n) => {
		const day = String(n.date ?? '').slice(0, 10)
		return day >= addDays(today, -7) && day <= today
	})

// En färdig text att klistra in i WhatsApp-gruppen. *Fetstil* är WhatsApps egen formatering.
const whatsapp = [
	'*Veckans PauseAI Sverige*',
	'',
	...(upcoming.length
		? ['*Kommande evenemang*', ...upcoming.flatMap((e) => [`• *${e.title}*, ${formatDateTime(e.date)}, ${e.location}`, `  ${site}/evenemang/${e.id}`])]
		: ['Inga evenemang inlagda de närmaste två veckorna. Ordnar du något? Lägg upp det på sajten!']),
	...(news.length ? ['', '*Nytt i bloggen*', ...news.flatMap((n) => [`• ${n.title}`, `  ${site}/blogg/${n.id}`])] : []),
	'',
	`Alla evenemang i din kalender: ${site}/evenemang`
]

const lines = [
	'## Att klistra in i WhatsApp',
	'',
	'Kopiera texten i rutan och klistra in den i gruppen.',
	'',
	'```',
	...whatsapp,
	'```',
	'',
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
