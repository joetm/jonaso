"use client"

import "semantic-ui-css/components/button.min.css"

import React, { useState, useEffect } from "react"
import { navigate } from 'gatsby'
import { spacer } from "../../common"
import Keywords from "../../components/keywords"
import Layout from "../../components/layout"
import { Seo } from "../../components/Seo"
import LTInterests from "../../components/longterm-interests"


const _KEYWORDS = 'https://raw.githubusercontent.com/joetm/jonaso/master/reading_list/keywords.json'
const CUTOFF = 19


export function Head() {
  const escape = '/'
  return (
    <Seo title={`Research Interests ${escape}${escape} jonaso.de`}>
      <link id="canonical" rel="canonical" href="https://www.jonaso.de/interests/" />
    </Seo>
  ) //
}


export default function Interests() {
  const [ keywords, setKeywords ] = useState([])
  const [ isZoomed, setIsZoomed ] = useState(false)
  const [ breadcrumb, setBreadcrumb ] = useState(null)

  function zoom(val, bc = null) {
    setIsZoomed(val)
    setBreadcrumb(bc)
  }

  useEffect(() => {
    fetch(_KEYWORDS)
    .then(response => {
      if (response.status >= 400) {
        throw new Error("Bad response from server")
      }
      return response.json()
    })
    .then(keywords => setKeywords(keywords))
  }, [])

  const filtered_keywords = keywords.filter(kw => kw.num > CUTOFF)

  return (
    <Layout>
      <div className="ui container">
        <div className="ui segment" style={{clear:'both', border:0, boxShadow: '0px 0px 0px #FFFFFF'}}>
            <h2 style={{float:'left', display:'inline-block', marginRight: '1rem'}}>Research Interests</h2>
            {' '}
            <div className="ui mini buttons">
              <button className="ui active button"
                onClick={() => navigate('/research/interests')}
                disabled={true}
              >Bar</button>
              <div className="or"></div>
              <button className="ui button"
                onClick={() => navigate('/research/interests/wordcloud')}
                disabled=""
                tabIndex="-1"
              >Cloud</button>
            </div>
            {
              isZoomed &&
                <div style={{float:'right', fontSize: 'initial', marginRight:'1em'}}>
                  <span style={{marginRight: '1em'}}>{breadcrumb}</span>
                  <i aria-hidden="true" onClick={() => zoom(false)} className="left circular arrow icon"></i>
                </div>
            }
        </div>
        <LTInterests />
        <Keywords keywords={filtered_keywords} isZoomed={isZoomed} zoom={zoom} />
        <div style={spacer}></div>
      </div>
    </Layout>
  )

}
