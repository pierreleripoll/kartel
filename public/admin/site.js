// What Kartel adds to the CMS.

// The "Vidéo YouTube" button of the text editor. It writes the block that
// app/components/content/YoutubeLite.vue draws:
//
//   ::youtube-lite{id="TPsCd9tatRg" title="Tandem Presentation"}
//   ::
//
// Benjamin can paste the full address of the video, only the id is kept.
function youtubeId(value) {
  const text = String(value ?? '').trim()
  const match = text.match(/(?:youtu\.be\/|[?&]v=|\/embed\/|\/shorts\/)([\w-]{6,})/)
  return match ? match[1] : text
}

// A quote would close the attribute and break the page.
function attr(value) {
  return String(value ?? '').replaceAll('"', '').trim()
}

CMS.registerEditorComponent({
  id: 'youtube',
  label: 'Vidéo YouTube',
  icon: 'smart_display',
  fields: [
    {
      name: 'id',
      label: 'Adresse de la vidéo',
      widget: 'string',
      hint: 'Collez l\'adresse YouTube, par exemple https://www.youtube.com/watch?v=TPsCd9tatRg',
    },
    {
      name: 'title',
      label: 'Titre',
      widget: 'string',
      required: false,
      hint: 'Lu par les lecteurs d\'écran. Il n\'est pas affiché.',
    },
  ],
  pattern: /^::youtube-lite\{id="(?<id>[^"]*)"(?: title="(?<title>[^"]*)")?\}\n::$/m,
  fromBlock: match => ({
    id: match.groups.id,
    title: match.groups.title ?? '',
  }),
  toBlock: ({ id, title }) => {
    const cleanTitle = attr(title)
    return `::youtube-lite{id="${attr(youtubeId(id))}"${cleanTitle ? ` title="${cleanTitle}"` : ''}}\n::`
  },
  toPreview: ({ id }) =>
    `<img src="https://i.ytimg.com/vi/${attr(youtubeId(id))}/hqdefault.jpg" alt="" style="max-width: 100%">`,
})
