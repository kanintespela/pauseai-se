/** Sökväg inom sajten, med base (t.ex. /pauseai-se) framför. */
export function url(path = '/'): string {
	const base = import.meta.env.BASE_URL.replace(/\/$/, '')
	return base + (path.startsWith('/') ? path : `/${path}`)
}

// Datum utan tid (nyheter) lagras som midnatt UTC.
const dateFormat = new Intl.DateTimeFormat('sv-SE', { dateStyle: 'long', timeZone: 'UTC' })
const dateTimeFormat = new Intl.DateTimeFormat('sv-SE', {
	dateStyle: 'full',
	timeStyle: 'short',
	timeZone: 'Europe/Stockholm'
})

export const formatDate = (date: Date) => dateFormat.format(date)
export const formatDateTime = (date: Date) => dateTimeFormat.format(date)

export const menu = [
	{ href: '/risker', label: 'Risker' },
	{ href: '/forslaget', label: 'Förslaget' },
	{ href: '/engagera-dig', label: 'Engagera dig' },
	{ href: '/evenemang', label: 'Evenemang' },
	{ href: '/nyheter', label: 'Nyheter' },
	{ href: '/faq', label: 'FAQ' },
	{ href: '/om-oss', label: 'Om oss' }
]

// Ett evenemang räknas som kommande hela dagen det äger rum, i svensk tid, så att det
// inte försvinner från listan mitt under evenemanget.
const dayFormat = new Intl.DateTimeFormat('sv-SE', { dateStyle: 'short', timeZone: 'Europe/Stockholm' })
export const isUpcoming = (date: Date, now = new Date()) => dayFormat.format(date) >= dayFormat.format(now)

interface CalendarEvent {
	id: string
	title: string
	date: Date
	location: string
	description?: string
	pageUrl: string
}

/** Länk som öppnar WhatsApp med en färdig text om evenemanget. */
export function whatsappLink(event: CalendarEvent): string {
	const text = `${event.title}\n${formatDateTime(event.date)}, ${event.location}\n${event.pageUrl}`
	return `https://wa.me/?text=${encodeURIComponent(text)}`
}

// Evenemang har bara en starttid, så i kalendern får de två timmars längd.
const EVENT_LENGTH_MS = 2 * 60 * 60 * 1000

const icsDate = (date: Date) => date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')
const icsText = (text: string) => text.replace(/\\/g, '\\\\').replace(/\n/g, '\\n').replace(/([,;])/g, '\\$1')

/** Raderna i en iCalendar-fil får vara högst 75 byte långa, längre rader viks. */
function fold(line: string): string {
	const out: string[] = []
	let current = ''
	for (const char of line) {
		if (new TextEncoder().encode(current + char).length > 74) {
			out.push(current)
			current = ' '
		}
		current += char
	}
	return [...out, current].join('\r\n')
}

/** En iCalendar-fil (.ics) som kalenderappar kan prenumerera på eller importera. */
export function icsCalendar(events: CalendarEvent[], name = 'PauseAI Sverige'): string {
	const now = icsDate(new Date())
	const lines = [
		'BEGIN:VCALENDAR',
		'VERSION:2.0',
		'PRODID:-//PauseAI Sverige//pauseai.se//SV',
		'CALSCALE:GREGORIAN',
		'METHOD:PUBLISH',
		`X-WR-CALNAME:${icsText(name)}`,
		'X-WR-TIMEZONE:Europe/Stockholm',
		...events.flatMap((event) => [
			'BEGIN:VEVENT',
			`UID:${event.id}@pauseai.se`,
			`DTSTAMP:${now}`,
			`DTSTART:${icsDate(event.date)}`,
			`DTEND:${icsDate(new Date(event.date.valueOf() + EVENT_LENGTH_MS))}`,
			`SUMMARY:${icsText(event.title)}`,
			`LOCATION:${icsText(event.location)}`,
			`DESCRIPTION:${icsText([event.description, event.pageUrl].filter(Boolean).join('\n\n'))}`,
			`URL:${event.pageUrl}`,
			'END:VEVENT'
		]),
		'END:VCALENDAR'
	]
	return lines.map(fold).join('\r\n') + '\r\n'
}
