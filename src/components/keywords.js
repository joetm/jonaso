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
  const [activeLabel, setActiveLabel] = useState(null)
  const [level2, setLevel2] = useState([])
  const [keywords, setKeywords] = useState([])

  useEffect(() => {
    fetch(_KEYWORDS).then(res => res.json())
    .then(kws => {
      const filtered_keywords = kws.filter(kw => kw.num > CUTOFF)
      setKeywords(filtered_keywords)
    })
  }, [])


  function zoomOut() {
    setLevel2([])
    setActiveLabel(null)
  }

  function handleClick(bar) {
    if (!isZoomed) {
        // query level2
        const URL = `https://raw.githubusercontent.com/joetm/jonaso/master/reading_list/level2/${bar.id}.json`
        fetch(URL).then(res => res.json())
        .then(level2 => {
          setLevel2(level2)
          setActiveLabel(bar.name)
        })
    } else {
        zoomOut()
    }
  }

  const isZoomed = level2.length ? true : false
  const displaydata = isZoomed && level2.length ? level2 : keywords
  const color = isZoomed ? colorZoomed : colorDefault

  return (
    <div className="ui container">
      <div className="clear">
          <div style={{visibility: isZoomed ? 'visible' : 'hidden', float:'right', fontSize: 'initial', marginRight:'1em'}}>
              <span style={{marginRight: '1em'}}>{activeLabel}</span>
              <i aria-hidden="true" onClick={zoomOut} className="left circular arrow icon clickable"></i>
          </div>
      </div>
      <ResponsiveContainer width="100%" height={HEIGHT}>
            <BarChart
              layout="vertical"
              data={displaydata}
              onClick={isZoomed ? zoomOut : null}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" dataKey="num" />
                <YAxis type="category" dataKey="name" width={275} style={{fontSize: '1rem'}} />
                <Bar
                  dataKey="num"
                  fill={color}
                  className={!isZoomed ? "clickable" : ""}
                  onClick={handleClick}
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
  )
}
