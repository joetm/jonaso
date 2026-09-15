// Build-time shaping of the reading list (was fetched + processed client-side).
import readlist from "../../../reading_list/readlist-latest.json"

export const documents = readlist.documents
export const modifiedTs = readlist.modified
export const unrecognized_overall = readlist.unrecognized_overall
export const unrecognized_overall_percent = readlist.unrecognized_overall_percent * 100

// day-aggregated data for the PubGraph island (was augmentDate + aggregateByDay)
export const graphDocs = (() => {
  const agg = {}
  for (const doc of documents) {
    const day = new Date(doc.modified * 1000).setHours(0,0,0,0)
    agg[day] = (agg[day] || 0) + 1
  }
  const keys = Object.keys(agg)
  keys.sort()
  return keys.map(key => ({ num: agg[key], day: Number(key) }))
})()
