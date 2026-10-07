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
