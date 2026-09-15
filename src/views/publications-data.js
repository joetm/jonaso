// Build-time shaping of the publication data (was fetched + processed
// client-side in the old Gatsby page).
import { references as refsRaw, referencesType as refDetailRaw } from "../data/prev-build"
import citationsRaw from "../../stat_aggregator/publications-citations.json"

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
        return {__html: text.replace('publications_bib.html', '/static/publications_bib.html'), year: found[0] || 'forthcoming'}
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
      obj.title = obj.title.replace('publications_bib.html', '/static/publications_bib.html')
      return obj
    })
  }
  return refDetail
})()

export const citations = citationsRaw

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
