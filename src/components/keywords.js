"use client"

import React, { useState, useEffect } from "react"
import { Bar, BarChart, CartesianGrid, LabelList, ResponsiveContainer, XAxis, YAxis } from 'recharts'
import 'semantic-ui-css/components/button.min.css'


const _KEYWORDS = 'https://raw.githubusercontent.com/joetm/jonaso/master/reading_list/keywords.json'
const CUTOFF = 19
const HEIGHT = 1550
const colorDefault = '#eb008c'
const colorZoomed = '#FF86A6'


export default function Keywords() {
  // const [activeTooltipIndex, setActiveTooltipIndex] = useState(false)
  const [activeLevel, setActiveLevel] = useState(1)
  const [data, setData] = useState({
    1: {data: [], label: null},
    2: {data: [], label: null},
    3: {data: [], label: null},
  })

  useEffect(() => {
    // fetch level 1 on mount
    fetch(_KEYWORDS).then(res => res.json())
    .then(kws => {
      const filtered_keywords = kws.filter(kw => kw.num > CUTOFF)
      const newdata = { ...data }
      newdata[1]['data'] = filtered_keywords
      newdata[1]['label'] = null
      setData(newdata)
    })
  }, [])

  function zoomOut() {
    console.log('zoomout')
    const newlevel = (activeLevel - 1) > 1 ? activeLevel - 1 : 1
    setActiveLevel(newlevel)
  }

  function zoomIn(bar) {
    console.log('Loading:', bar.name)
    const URL = `https://raw.githubusercontent.com/joetm/jonaso/master/reading_list/level${activeLevel+1}/${bar.id}.json`
    console.log(URL)
    fetch(URL).then(res => res.json())
      .then(lvldata => {
        const newlevel = activeLevel + 1
        const newdata = { ...data }
        newdata[newlevel]['data'] = lvldata
        newdata[newlevel]['label'] = bar.name
        console.log('level:', newlevel)
        console.log('new data:', newdata[newlevel]['data'])
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

  return (
    <div className="ui container">
      <div className="clear">
          <div onClick={zoomOut} style={{cursor: 'pointer', visibility: isZoomed ? 'visible' : 'hidden', float: 'left', fontSize: 'initial', marginRight:'1em'}}>
              <i aria-hidden="true" className="left circular arrow icon clickable"></i>
              <span>{displaydata['label']}</span>
          </div>
      </div>
      <div className="clear">
        <ResponsiveContainer width="100%" height={HEIGHT}>
              <BarChart
                layout="vertical"
                data={displaydata['data']}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" dataKey="num" />
                  <YAxis type="category" dataKey="name" width={275} style={{fontSize: '1rem'}} />
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
