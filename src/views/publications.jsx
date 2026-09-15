import 'semantic-ui-css/components/button.min.css'
import 'semantic-ui-css/components/grid.min.css'
import 'semantic-ui-css/components/icon.min.css'
import 'semantic-ui-css/components/item.min.css'

import React from "react"
import { noMarginGrid } from "../common"
import { references, referencesDetail, citations } from "./publications-data"

// All three list views are prerendered; a small vanilla script in
// publications.astro toggles them (was useState + client-side fetches).
// The responsive icon sizing (was @artsy/fresnel) is a CSS media query,
// see publications.astro.

const styles = {
  menu: {
    textAlign: 'center',
    fontSize: '1.5em',
    lineHeight: '2em',
    marginBottom: '1em',
    marginTop: '0.5em',
  },
}

const PubIcon = ({icostr}) => (
  <i aria-hidden="true" className={`grey ${icostr} icon pub-icon`}></i>
)


export default function Publications() {
  const keysYear = Object.keys(references).reverse()
  const keysType = Object.keys(referencesDetail).reverse()

  // custom sort order
  let customSortOrder = []
  if (keysType.length > 0) {
    customSortOrder = [
      "Journal Articles",
      "Book Chapters",
      "Conference Papers",
      "Workshops",
      "Workshop Proceedings",
      "Doctoral Consortia",
      "Conference Posters and Position Papers",
      "Pre-prints and Working Papers",
      "Theses and Seminal Works",
    ]
  }

  return (
      <div className="ui container">

        <div id="publicationButtons" style={styles.menu}>
          <div style={{float:'right',marginTop:'0.5em'}}>
            <a title="Download publications as pdf" href="/cv/oppenlaender-publications.pdf" target="_blank">
              <i aria-hidden="true" className="file pdf outline large icon"></i>
            </a>
          </div>
          <div className="ui buttons">
            <button
              title="Sort by year"
              className="ui button"
              id="btn-year"
              disabled
            >YEAR</button>
            <div className="or"></div>
            <button
              title="Sort by type"
              className="ui button"
              id="btn-type"
              tabIndex="-1"
            >TYPE</button>
            {
              citations.length > 0 &&
              <>
                <div className="or"></div>
                <button
                  title="Sort by citations"
                  className="ui button"
                  id="btn-cits"
                  tabIndex="-1"
                >CITATIONS</button>
              </>
            }
          </div>
          <div style={{clear:'both'}}></div>
        </div>


        <div className="ui container" id="publications-type" style={{display:'none'}}>
              {
                customSortOrder.map(typ => {
                  return (
                    <div className="ui grid" key={typ} style={noMarginGrid}>
                        <div className="row">
                          <h1>{typ}</h1>
                        </div>
                        {
                          referencesDetail[typ] && referencesDetail[typ].map((ref, index) => {
                            let title = ref.title.replace('Jonas Oppenlaender', '<strong>Jonas Oppenlaender</strong>')
                            title = title.replace('Jonas Oppenländer', '<strong>Jonas Oppenländer</strong>')
                            const icostr = title.indexOf('.pdf') === -1 ? 'file outline' : 'file alternate outline'
                            return (
                              <div className="row" key={index}>
                                <div className="two wide column">
                                  <PubIcon icostr={icostr} />
                                </div>
                                <div className="fourteen wide column">
                                  <div className="item">
                                    <div className="content">
                                      <div className="header" dangerouslySetInnerHTML={{__html: title}}></div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )
                          })
                        }
                    </div>
                  )
                })
              }
            <div className="spacer"></div>
        </div>

        <div className="ui container" id="publications-year">
              {
                keysYear.map(year => {
                  return (
                    <div className="ui grid" key={year} data-year={year} style={noMarginGrid}>
                        <div className="row">
                          <h1>{year}</h1>
                        </div>
                        {
                          references[year].map((item, index) => {
                            let html = item.__html.replace('Jonas Oppenlaender', '<strong>Jonas Oppenlaender</strong>')
                            html = html.replace('Jonas Oppenländer', '<strong>Jonas Oppenländer</strong>')
                            html = html.replace('--', '–')
                            const icostr = html.indexOf('.pdf') === -1 ? 'file outline' : 'file alternate outline'
                            return (
                              <div className="row" key={index}>
                                <div className="two wide column">
                                  <PubIcon icostr={icostr} />
                                </div>
                                <div className="fourteen wide column">
                                  <div className="item">
                                    <div className="content">
                                      <div className="header" dangerouslySetInnerHTML={{__html: html}}></div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )
                          })
                        }
                    </div>
                  )
                })
              }
        </div>

        <div className="ui container" id="publications-cits" style={{display:'none'}}>

          {
            citations.map(c => {
              const icostr = c.__html ? c.__html.indexOf('.pdf') === -1 ? 'file outline' : 'file alternate outline' : 'file outline'
                return (
                  <div className="ui grid" key={`${c.title}-${c.citations}`} style={noMarginGrid}>
                      <div className="row">
                        <div className="one wide column">
                          <PubIcon icostr={icostr} />
                        </div>
                        {
                          c.__html ?
                            <div className="thirteen wide column" dangerouslySetInnerHTML={c}></div>
                          :
                            <div className="thirteen wide column">{c.title}</div>
                        }
                        <div className="two wide column">
                          {c.citations.replace('*', '')}
                        </div>
                      </div>
                  </div>
              )
            })
          }
          <div className="spacer"></div>
        </div>

      </div>
  )
}
