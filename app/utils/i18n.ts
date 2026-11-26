// The two languages of the site. Each one has its own URLs, under /fr and /de.
// No page has the two languages.

export const langs = ['fr', 'de'] as const
export type Lang = typeof langs[number]

export const defaultLang: Lang = 'fr'

/**
 * The pages of the menu, in order, with their URL in each language.
 * The content files have the French name in the two languages:
 * /de/nachhaltigkeit is content/de/durabilite.md.
 */
export const menu = [
  { key: 'home', fr: '/fr', de: '/de' },
  { key: 'tandem', fr: '/fr/tandem', de: '/de/tandem' },
  { key: 'durabilite', fr: '/fr/durabilite', de: '/de/nachhaltigkeit' },
  { key: 'news', fr: '/fr/actualites', de: '/de/aktuelles' },
] as const

export type MenuKey = typeof menu[number]['key']

/** The texts that are not in content/: menu, dates, small labels. */
export const labels = {
  fr: {
    name: 'Français',
    home: 'Accueil',
    tandem: 'Tandem',
    durabilite: 'Durabilité',
    news: 'Actualités',
    newsEmpty: 'Pas encore d’actualité.',
    back: 'Toutes les actualités',
    notFound: 'Page introuvable',
    notFoundText: 'Cette page n’existe pas ou n’existe plus.',
    error: 'Une erreur est survenue',
    backHome: 'Retour à l’accueil',
    dateLocale: 'fr-CH',
  },
  de: {
    name: 'Deutsch',
    home: 'Startseite',
    tandem: 'Tandem',
    durabilite: 'Nachhaltigkeit',
    news: 'Aktuelles',
    newsEmpty: 'Noch keine Beiträge.',
    back: 'Alle Beiträge',
    notFound: 'Seite nicht gefunden',
    notFoundText: 'Diese Seite gibt es nicht oder nicht mehr.',
    error: 'Ein Fehler ist aufgetreten',
    backHome: 'Zur Startseite',
    dateLocale: 'de-CH',
  },
} as const

/** The URL of the news list of a language. */
export function newsPath(lang: Lang): string {
  return menu[3][lang]
}

/** The language of a URL. A URL out of /fr and /de has the default language. */
export function langOf(path: string): Lang {
  return path === '/de' || path.startsWith('/de/') ? 'de' : defaultLang
}

/** "/fr/tandem/" -> "/fr/tandem". The content paths have no slash at the end. */
export function cleanPath(path: string): string {
  return path.length > 1 ? path.replace(/\/+$/, '') : path
}

/** The entry of the menu that a URL belongs to. An article belongs to "news". */
export function menuEntryOf(path: string) {
  const current = cleanPath(path)
  const lang = langOf(current)
  return menu.find(entry => entry[lang] === current)
    ?? (current.startsWith(`${newsPath(lang)}/`) ? menu[3] : undefined)
}

/** "/fr/durabilite" -> "/de/durabilite": where the files of a menu entry are. */
function contentBase(entry: typeof menu[number], lang: Lang): string {
  return `/${lang}${entry.fr.slice(`/${defaultLang}`.length)}`
}

/**
 * The content path of a URL: "/de/aktuelles/x" -> "/de/actualites/x".
 * A URL that is not a page of the menu has no content.
 */
export function contentPathOf(url: string): string | undefined {
  const current = cleanPath(url)
  const lang = langOf(current)
  const entry = menuEntryOf(current)
  if (!entry) return undefined
  return contentBase(entry, lang) + current.slice(entry[lang].length)
}

/** The URL of a content path: "/de/actualites/x" -> "/de/aktuelles/x". */
export function urlOfContent(path: string): string {
  const lang = langOf(path)
  // From the end: the home entry ("/de") is the start of all the others.
  const entry = [...menu].reverse().find((item) => {
    const base = contentBase(item, lang)
    return path === base || path.startsWith(`${base}/`)
  })
  return entry ? entry[lang] + path.slice(contentBase(entry, lang).length) : path
}

/**
 * The same page in the other language. For an article, it is the article with
 * the same file name in the other language (the caller checks that it exists).
 */
export function translatedPath(path: string, to: Lang): string {
  const current = cleanPath(path)
  const from = langOf(current)
  const entry = menuEntryOf(current)
  if (!entry) return menu[0][to]
  return entry[to] + current.slice(entry[from].length)
}

/** "2026-11-25" -> "25 novembre 2026" or "25. November 2026". */
export function formatDate(date: string, lang: Lang): string {
  const [year = 1970, month = 1, day = 1] = date.split('-').map(Number)
  // UTC on the two sides, so the day never moves with the time zone of the build.
  return new Intl.DateTimeFormat(labels[lang].dateLocale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(Date.UTC(year, month - 1, day)))
}
