/**
 * What the header and the error page need: the language of the URL, the menu
 * of this language, and the link to the same page in the other language.
 */
export async function useSiteNav() {
  const route = useRoute()

  // The URLs of all the news of the two languages. Benjamin posts about 4 a
  // year, so one small query is enough.
  const { data: newsPaths } = await useAsyncData('news-urls', () =>
    queryCollection('news').select('path').all().then(rows => rows.map(row => urlOfContent(row.path))),
  )

  const lang = computed(() => langOf(route.path))
  const current = computed(() => cleanPath(route.path))

  function hasNews(of: Lang): boolean {
    return (newsPaths.value ?? []).some(path => path.startsWith(`${newsPath(of)}/`))
  }

  /** The menu of the language. */
  const links = computed(() =>
    menu.map(entry => ({
      key: entry.key,
      to: entry[lang.value],
      label: labels[lang.value][entry.key],
      active: menuEntryOf(current.value)?.key === entry.key,
    })),
  )

  /** The same page in each language. `exact` is false when it is not a translation. */
  const switches = computed(() =>
    langs.map((to) => {
      const target = translatedPath(current.value, to)
      const isArticle = menuEntryOf(current.value)?.key === 'news' && target !== newsPath(to)
      // An article with no translation: go to the news list of the other language.
      const missing = isArticle && !(newsPaths.value ?? []).includes(target)
      return {
        lang: to,
        label: labels[to].name,
        to: missing ? newsPath(to) : target,
        // An empty news list is not a translation of the full one.
        exact: !missing && (hasNews(to) || menuEntryOf(current.value)?.key !== 'news'),
        active: to === lang.value,
      }
    }),
  )

  return { lang, links, switches }
}
