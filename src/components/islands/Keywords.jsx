import React, { useState } from "react"
import { Bar, BarChart, CartesianGrid, LabelList, ResponsiveContainer, XAxis, YAxis } from 'recharts'
// import md5 from "md5"

import 'semantic-ui-css/components/button.min.css'
import 'semantic-ui-css/components/icon.min.css'

// Keyword drill-down island. Level 1 comes prefiltered at build time via
// the `initial` prop (was fetched on mount); deeper levels are still
// fetched on demand when a bar is clicked.

const BARHEIGHT = 38
export const CUTOFF = 19
const CUTOFF_SUBLEVEL = 0
const colorDefault = '#eb008c'
const colorZoomed = '#FF86A6'


export default function Keywords({ initial = [] }) {
  // const [activeTooltipIndex, setActiveTooltipIndex] = useState(false)
  const [activeLevel, setActiveLevel] = useState(1)
  const [data, setData] = useState({
    1: {data: initial, label: null},
    2: {data: [], label: null},
    3: {data: [], label: null},
  })

  function zoomOut() {
    // console.log('zoomout')
    const newlevel = (activeLevel - 1) > 1 ? activeLevel - 1 : 1
    setActiveLevel(newlevel)
  }

  function zoomIn(bar) {
    console.log('Loading:', bar.name)
    let qid = bar.id
    // if (activeLevel === 2) {
    //   console.log(data[1].label + "-" + bar.name)
    //   qid = md5(data[1].label + "-" + bar.name)
    // }
    const URL = `https://raw.githubusercontent.com/joetm/jonaso/master/reading_list/level${activeLevel+1}/${qid}.json`
    console.log(URL)
    fetch(URL).then(res => res.json())
      .then(lvldata => {
        const newlevel = activeLevel + 1
        const newdata = { ...data }
        newdata[newlevel]['data'] = lvldata.filter(kw => kw.num > CUTOFF_SUBLEVEL)
        newdata[newlevel]['label'] = bar.name
        setData(newdata)
        setActiveLevel(newlevel)
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error.message);
      })
  }

  const isZoomed = activeLevel > 1
  const displaydata = data[activeLevel]
  const color = isZoomed ? colorZoomed : colorDefault

  if (!displaydata) {
    return null
  }

  const displayheight = displaydata['data'].length * BARHEIGHT

  return (
    <div className="ui container">
      <div className="clear">
          <div onClick={zoomOut} style={{cursor: 'pointer', visibility: isZoomed ? 'visible' : 'hidden', float: 'left', fontSize: 'initial', marginRight:'1em'}}>
              <i aria-hidden="true" className="left circular arrow icon clickable"></i>
              {
                activeLevel > 2 &&
                  <span>{data[activeLevel-1]['label']} &gt; </span>
              }
              <span>{displaydata['label']}</span>
          </div>
      </div>
      <div className="clear">
        <ResponsiveContainer width="100%" height={displayheight}>
              <BarChart
                layout="vertical"
                data={displaydata['data']}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" dataKey="num" />
                  <YAxis type="category" dataKey="name" width={275} style={{fontSize: '.9rem'}} />
                  <Bar
                    dataKey="num"
                    fill={color}
                    className={activeLevel < 3 ? "clickable" : ""}
                    onClick={ (e) => {if (activeLevel < 3) { zoomIn(e) }} }
                  >
                    <LabelList
                      dataKey="num"
                      position="insideRight"
                      style={{ fontSize: '80%', fill: '#ffffff' }}
                    />
                  </Bar>
              </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
