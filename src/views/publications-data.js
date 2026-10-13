// Build-time shaping of the publication data (was fetched + processed
// client-side in the old Gatsby page).
import { references as refsRaw, referencesType as refDetailRaw, referencesDetail as bibEntries } from "../data/build-data"
import citationsRaw from "../../scripts/stat_aggregator/publications-citations.json"

// bibtex2html renders a bib `note` as its own line ("\nHonorable mention.\n").
// Prefix award notes with a trophy icon (Semantic UI icon.min.css, already loaded).
const AWARD_RE = /\n((?:Honou?rable mention|Best [^\n]*?(?:paper|award))[^\n]*?)\.?(?=\n)/gi
function markAwards(html) {
  return html.replace(AWARD_RE, '\n<span class="pub-award"><i aria-hidden="true" class="yellow trophy icon"></i>$1</span>.')
}

/**
 * Group publications by year
 * @param {Array} pubList - List of publications
 * @returns {Object} categorizedList - Categorized list of publications
 */
function categorizeListPerYear(pubList) {
    if (!pubList) {
        return {}
    }
    const annotatedList = pubList.map(text => {
        const yRegex = /20\d\d/
        const found = text.match(yRegex) || ['forthcoming']
        return {__html: markAwards(text.replace('publications_bib.html', '/static/publications_bib.html')), year: found[0] || 'forthcoming'}
    })
    const categorizedList = {}
    annotatedList.forEach(obj => {
      if (categorizedList[obj.year]) { categorizedList[obj.year].push(obj) } else { categorizedList[obj.year] = [obj] }
    })
    return categorizedList
}

export const references = categorizeListPerYear(refsRaw)

export const referencesDetail = (() => {
  const refDetail = JSON.parse(JSON.stringify(refDetailRaw))
  // replace link to bib
  for (const key of Object.keys(refDetail)) {
    refDetail[key] = refDetail[key].map(obj => {
      obj.title = markAwards(obj.title.replace('publications_bib.html', '/static/publications_bib.html'))
      return obj
    })
  }
  return refDetail
})()

export const citations = citationsRaw

// Scholar titles -> bib keys -> the formatted bibtex2html entries, so the
// citations list renders the same entries as the year/type lists.
const normTitle = t => t.normalize('NFKD').replace(/[\u0300-\u036f]/g, '')
  .replace(/\\[a-zA-Z]+|[{}]/g, '').replace(/[\s\u00a0]*\u2026$/, '')
  .toLowerCase().replace(/[^a-z0-9]+/g, '')

function findBibKey({title, year}) {
  const t = normTitle(title)
  const entries = bibEntries.map(e => ({key: e.ID, year: e.year, t: normTitle(e.title || '')}))
  let hits = entries.filter(e => e.t === t)
  if (!hits.length) hits = entries.filter(e => e.t.startsWith(t) || (e.t.length > 20 && t.startsWith(e.t)))
  if (hits.length > 1) hits = hits.filter(e => e.year === year)
  return hits.length === 1 ? hits[0].key : null
}

const escapeHtml = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

function citedEntry(c) {
  const count = parseInt(c.citations, 10) || 0
  const key = findBibKey(c)
  const raw = key && refsRaw.find(r => r.includes(`publications_bib.html#${key}"`))
  const citedBy = `<strong>Cited by ${count}.</strong>`
  let html
  if (raw) {
    html = markAwards(raw.replace('publications_bib.html', '/static/publications_bib.html'))
    // before the [ bib | DOI | ... ] links
    const links = html.lastIndexOf('\n[\u00a0')
    html = links === -1 ? `${html} ${citedBy}` : `${html.slice(0, links)}\n${citedBy}${html.slice(links)}`
  } else {
    // not in the .bib (yet): Scholar's title and year
    const title = escapeHtml(c.title.trim())
    html = `${title}${/[.?!\u2026]$/.test(title) ? '' : '.'} ${escapeHtml(c.year || '')}. ${citedBy}`
  }
  return {__html: html, count}
}

const CITATION_GROUPS = [
  {min: 500, label: '500+ citations'},
  {min: 100, label: '100+ citations'},
  {min: 10, label: '10+ citations'},
  {min: 0, label: 'Fewer than 10 citations'},
]

export const citationGroups = (() => {
  const entries = citationsRaw.map(citedEntry).sort((a, b) => b.count - a.count)
  return CITATION_GROUPS
    .map(({min, label}, i) => ({
      label,
      entries: entries.filter(e => e.count >= min && (i === 0 || e.count < CITATION_GROUPS[i - 1].min)),
    }))
    .filter(g => g.entries.length)
})()

export const graphdata = (() => {
  const refsByYear = []
  let maxRefsByYear = 0
  for (let y in references) {
    const c = references[y].length
    refsByYear.push({year: y, num: c})
    if (c > maxRefsByYear) {
      maxRefsByYear = c
    }
  }
  maxRefsByYear = maxRefsByYear + 2
  const tickArray = []
  for (let i = 0; i <= maxRefsByYear; i+=2) {
    tickArray.push(i)
  }
  return {refsByYear, tickArray}
})()
