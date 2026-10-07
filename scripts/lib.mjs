// Gemensamma hjälpfunktioner för skripten som GitHub Actions kör.
// Inga beroenden, så att arbetsflödena inte behöver köra npm install.

import fs from 'node:fs'
import path from 'node:path'

/** Läser frontmatter (nyckel: värde, en per rad) och texten efter den. */
export function readMarkdown(file) {
	const raw = fs.readFileSync(file, 'utf8')
	const match = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/)
	if (!match) return { data: {}, body: raw }
	const data = {}
	for (const line of match[1].split('\n')) {
		const m = line.match(/^([\w-]+):\s*(.*)$/)
		if (!m) continue
		let value = m[2].trim()
		if (/^".*"$/.test(value)) value = JSON.parse(value)
		else if (/^'.*'$/.test(value)) value = value.slice(1, -1).replace(/''/g, "'")
		data[m[1]] = value
	}
	return { data, body: match[2] }
}

/** Datum som YYYY-MM-DD i svensk tid. */
const dayFormat = new Intl.DateTimeFormat('sv-SE', { dateStyle: 'short', timeZone: 'Europe/Stockholm' })
export const stockholmDay = (date) => dayFormat.format(date)

/** Lägger till dagar till ett datum i formatet YYYY-MM-DD. */
export function addDays(day, days) {
	const d = new Date(`${day}T12:00:00Z`)
	d.setUTCDate(d.getUTCDate() + days)
	return d.toISOString().slice(0, 10)
}

/** Tolkar en tid utan tidszon (som Pages CMS sparar) som svensk tid. */
export function stockholmTime(value) {
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
	const get = (type) => Number(parts.find((p) => p.type === type)?.value)
	const offset = Date.UTC(get('year'), get('month') - 1, get('day'), get('hour'), get('minute')) - asUtc.valueOf()
	return new Date(asUtc.valueOf() - offset)
}

/** Alla evenemang, med datum tolkade och adress på sajten. */
export function readEvents(dir = 'src/content/evenemang') {
	return fs
		.readdirSync(dir)
		.filter((f) => f.endsWith('.md'))
		.map((f) => {
			const { data, body } = readMarkdown(path.join(dir, f))
			const id = f.replace(/\.md$/, '')
			return { id, file: path.join(dir, f), ...data, date: stockholmTime(data.date), body }
		})
		.sort((a, b) => a.date - b.date)
}

const timeFormat = new Intl.DateTimeFormat('sv-SE', { dateStyle: 'full', timeStyle: 'short', timeZone: 'Europe/Stockholm' })
export const formatDateTime = (date) => timeFormat.format(date)

/** Sajtens adress, från astro.config.mjs, så att länkar blir rätt även efter bytet till pauseai.se. */
export function siteUrl() {
	const config = fs.readFileSync('astro.config.mjs', 'utf8')
	const site = config.match(/const site = '([^']+)'/)?.[1] ?? 'https://pauseai.se'
	const base = config.match(/const base = '([^']*)'/)?.[1] ?? ''
	return site + base
}

/** Gör om en rubrik till ett filnamn, ungefär som Pages CMS gör. */
export function slugify(text) {
	return text
		.toLowerCase()
		.normalize('NFD')
		.replace(/[̀-ͯ]/g, '')
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-+|-+$/g, '')
		.slice(0, 60)
}

/** Alla filer under en mapp med en viss ändelse. */
export function walk(dir, extensions) {
	return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
		const full = path.join(dir, entry.name)
		if (entry.isDirectory()) return walk(full, extensions)
		return extensions.some((ext) => entry.name.endsWith(ext)) ? [full] : []
	})
}
