// Build-time aggregation of research influences (was fetched + computed
// client-side from allauthors.json + fields.json).
import { sortByKey } from "../../common"
import authors from "../../../reading_list/allauthors.json"
import fields from "../../../reading_list/fields.json"

const tmp = {};
authors.forEach(author => {
  if (tmp[author.name]) {
    // author already exists: update only the respective fields
    tmp[author.name]['num'] += author.num
    tmp[author.name]['recency'] += author.recency
    tmp[author.name]['priority'] += author.priority * author.num
    tmp[author.name]['priorities'][""+author.priority] = { 'num': author.num }
  } else {
    // first init
    tmp[author.name] = {
      'id': author.id,
      'name': author.name,
      'num': author.num,
      'recency': author.recency,
      'priority': author.priority * author.num,
      'priorities': {
        '1': { 'num': 0, },
        '2': { 'num': 0, },
        '3': { 'num': 0, },
      },
    }
    tmp[author.name]['priorities'][""+author.priority] = { 'num': author.num }
  }
  if (fields[author.id]) {
    tmp[author.name]['area'] = fields[author.id]
  }
})

export const influencer = sortByKey(Object.values(tmp).filter(author => author.num > 1), 'num')

export const researchAreas = (() => {
  const areaCount = influencer.reduce((acc, { area }) => {
    acc[area] = (acc[area] || 0) + 1
    return acc
  }, {})
  const areaCountArray = Object.keys(areaCount).map(area => ({ area, count: areaCount[area] }))
  areaCountArray.sort((a, b) => b.count - a.count) // Sort from most to least frequent
  return areaCountArray.slice(0, 20) // Cap it to 20 items
})()
