"use client"

import "semantic-ui-css/components/button.min.css"

import React from "react"
// import { navigate } from 'gatsby'
import Keywords from "../../components/keywords"
import Layout from "../../components/layout"
import { Seo } from "../../components/Seo"
import LTInterests from "../../components/longterm-interests"



export function Head() {
  const escape = '/'
  return (
    <Seo title={`Research Interests ${escape}${escape} jonaso.de`}>
      <link id="canonical" rel="canonical" href="https://www.jonaso.de/interests/" />
    </Seo>
  ) //
}


export default function Interests() {
  return (
    <Layout>
      <div className="ui container">
        <div className="ui segment" style={{clear:'both', border:0, boxShadow: '0px 0px 0px #FFFFFF'}}>
            <h2 style={{float:'left', display:'inline-block', marginRight: '1rem'}}>Research Interests</h2>
            {/*
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
            */}
        </div>
        <LTInterests />
        <Keywords />
      </div>
    </Layout>
  )

}
