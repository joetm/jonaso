"use client"

import "../../components/influencer.css"

import React, { useState, useEffect } from "react"
import { sortByKey } from "../../common"
import AuthorList from "../../components/influencer"
import Loading from "../../components/influencerLoading"
import Layout from "../../components/layout"
import { Seo } from "../../components/Seo"

export const isProd = process.env.NODE_ENV !== "development"


// const _INFLUENCER = 'https://raw.githubusercontent.com/joetm/jonaso/master/reading_list/influencer.json'
const _FLATINFLUENCER = 'https://raw.githubusercontent.com/joetm/jonaso/master/reading_list/allauthors.json'
const _AUTHOR_FIELDS_URL = `https://raw.githubusercontent.com/joetm/jonaso/master/reading_list/fields.json`

export function Head() {
  return (
    <Seo title="Research Influences // jonaso.de">
      <link id="canonical" rel="canonical" href="https://www.jonaso.de/influencers/" />
    </Seo>
  ) //
}


export default function Influencers() {

  const [influencer, setInfluencer] = useState([])
  const [researchAreas, setResearchAreas] = useState([])
  const [selectedLegend, setSelectedLegend] = useState(null)

  const handleLegendClick = (legend) => {
    // double click resets filter
    if (selectedLegend === legend) {
      resetFilter()
    } else {
      setSelectedLegend(legend)
    }
  }
  const resetFilter = () => {
    setSelectedLegend(null)
  }

  useEffect(() => {

    const fetchData = async () => {
      try {
        const resInfluencer = await fetch(_FLATINFLUENCER)
        const authorsData = await resInfluencer.json()
        const authors = authorsData

        const fields = await (await fetch(_AUTHOR_FIELDS_URL)).json()

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
        
        let influencer = Object.values(tmp).filter(author => author.num > 1)
        influencer = sortByKey(influencer, 'recency')
        
        setInfluencer(influencer)

        const areaCount = influencer.reduce((acc, { area }) => {
          acc[area] = (acc[area] || 0) + 1
          return acc
        }, {})
        const areaCountArray = Object.keys(areaCount).map(area => ({ area, count: areaCount[area] }))
        areaCountArray.sort((a, b) => b.count - a.count) // Sort from most to least frequent
        const top20Areas = areaCountArray.slice(0, 20) // Cap it to 20 items
        setResearchAreas(top20Areas)

      } catch (error) {
        // Handle errors here
        console.error('Fetch error:', error)
      }
    }
    fetchData()

  }, [])

  const isLoading = influencer.length ? false : true

  // Derive the filtered list based on the selected legend
  const filteredList = selectedLegend ? influencer.filter(item => item.area === selectedLegend) : influencer

  return (
    <Layout>
      <div className="ui container">
        <h2 style={{float:'left', display:'inline-block'}}>
          Research Influences
          { isLoading && <span style={{marginLeft:'1em', fontWeight:100, fontSize:'1em'}}>...loading...</span>}
        </h2>

        {
          selectedLegend &&
            <button className="mini ui grey basic button" style={{float:'right'}} onClick={resetFilter}>
              <i class="window close icon"></i>
              Reset Filter
            </button>
        }

        <div className="influences-legend">
          {
            researchAreas.map(obj => (
              <span
                style={{marginRight:'1em'}}
                className={'ui label ra ' + obj.area.replace(" ", "_")}
                onClick={() => handleLegendClick(obj.area)}
              >
                {obj.area} ({obj.count})
              </span>
            ))
          }
        </div>

        { isProd && isLoading && <Loading /> }

        <div className="clear">
          <AuthorList list={filteredList} />
        </div>
      </div>
    </Layout>
  )
}
