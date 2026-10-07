// Gör om ett ärende från formuläret "Föreslå ett evenemang" till en evenemangsfil.
// Läser ärendets text från miljövariabeln ISSUE_BODY och skriver filens sökväg till
// GITHUB_OUTPUT. Avbryter med ett felmeddelande på svenska om något fält är fel.

import fs from 'node:fs'
import { slugify } from './lib.mjs'

const body = process.env.ISSUE_BODY ?? ''

// GitHub skriver formulärets svar som "### Fältets rubrik" följt av svaret.
const fields = {}
for (const section of body.split(/^### /m).slice(1)) {
	const [label, ...rest] = section.split('\n')
	const value = rest.join('\n').trim()
	fields[label.trim()] = value === '_No response_' ? '' : value
}

const get = (label) => fields[label] ?? ''
const namn = get('Namn på evenemanget')
const datum = get('Datum')
const tid = get('Starttid')
const plats = get('Plats')
const lank = get('Länk till anmälan eller mer info')
const sammanfattning = get('Kort beskrivning')
const text = get('Mer information')

const errors = []
if (!namn) errors.push('Namn saknas.')
if (!/^\d{4}-\d{2}-\d{2}$/.test(datum)) errors.push(`Datumet "${datum}" ska skrivas som ÅÅÅÅ-MM-DD, till exempel 2026-10-12.`)
if (!/^\d{1,2}[:.]\d{2}$/.test(tid)) errors.push(`Tiden "${tid}" ska skrivas som TT:MM, till exempel 18:00.`)
if (!plats) errors.push('Plats saknas.')
if (lank && !/^https?:\/\//.test(lank)) errors.push(`Länken "${lank}" ska börja med https://.`)

if (errors.length) {
	fs.writeFileSync('fel.md', `Det gick inte att skapa evenemanget:\n\n${errors.map((e) => `- ${e}`).join('\n')}\n\nRätta ärendet (Edit), så görs ett nytt försök.`)
	console.error(errors.join('\n'))
	process.exit(1)
}

const time = tid.replace('.', ':').padStart(5, '0')
const file = `src/content/evenemang/${datum}-${slugify(namn)}.md`

// JSON-strängar är giltig YAML, så citattecken och kolon i texten ställer inte till det.
const frontmatter = [
	`title: ${JSON.stringify(namn)}`,
	`date: ${JSON.stringify(`${datum}T${time}`)}`,
	`location: ${JSON.stringify(plats)}`,
	lank && `link: ${JSON.stringify(lank)}`,
	sammanfattning && `description: ${JSON.stringify(sammanfattning)}`
].filter(Boolean)

fs.writeFileSync(file, `---\n${frontmatter.join('\n')}\n---\n\n${text}\n`)
fs.appendFileSync(process.env.GITHUB_OUTPUT ?? '/dev/null', `file=${file}\nslug=${datum}-${slugify(namn)}\n`)
console.log(`Skrev ${file}`)
