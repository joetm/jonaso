import 'semantic-ui-css/components/button.min.css'
import 'semantic-ui-css/components/grid.min.css'
import 'semantic-ui-css/components/icon.min.css'
import 'semantic-ui-css/components/item.min.css'

import React from "react"
import Button from 'semantic-ui-react/dist/es/elements/Button/Button.js'
import Icon from 'semantic-ui-react/dist/es/elements/Icon/Icon.js'
import { Bar, BarChart, XAxis, YAxis, Tooltip, LabelList, CartesianGrid, ResponsiveContainer } from 'recharts'
// import useDetectPrint from 'use-detect-print'
import Layout from "../components/layout"
import { spacer, noMarginGrid } from "../common"
import { Seo } from "../components/Seo"

// replacement for Responsive component from semantic-ui-react
// see: https://react.semantic-ui.com/migration-guide/
// https://github.com/artsy/fresnel
import { createMedia } from "@artsy/fresnel"
const { MediaContextProvider, Media } = createMedia({
  // breakpoints values can be either strings or integers
  breakpoints: {
    sm: 0,
    md: 768,
    lg: 990,
  },
})

const styles = {
  menu: {
    textAlign: 'center',
    fontSize: '1.5em',
    lineHeight: '2em',
    marginBottom: '1em',
    marginTop: '0.5em',
  },
}

const _REFERENCES_PER_YEAR = "https://raw.githubusercontent.com/joetm/jonaso/master/public/static/references.json"
const _REFERENCES_PER_TYPE = "https://raw.githubusercontent.com/joetm/jonaso/master/public/static/references-type.json"
// const _REFERENCES_PER_YEAR = "/static/references.json"
// const _REFERENCES_PER_TYPE = "/static/references-type.json"


export function Head() {
  return (
    <Seo title="Publications // jonaso.de">
      <link id="canonical" rel="canonical" href="https://www.jonaso.de/publications/" />
    </Seo>
  )
} //

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
        const found = text.match(yRegex)
        return {__html: text.replace('publications_bib.html', '/static/publications_bib.html'), year: found[0] || 'forthcoming'}
    })
    const categorizedList = {}
    annotatedList.forEach(obj => {
      if (categorizedList[obj.year]) {
          categorizedList[obj.year].push(obj)
      } else {
          categorizedList[obj.year] = [obj]
      }
    })
    return categorizedList
} //


const PdfPubsButton = () => (
  <div style={{float:'right',marginTop:'0.5em'}}>
    <a title="Download publications as pdf" href="/cv/oppenlaender-publications.pdf" target="_blank">
      <Icon size='large' name='file pdf outline' />
    </a>
  </div>
) //

const SwitchBtn = ({active, switchPubView}) => (
  <div className="ui buttons">
    <Button disabled={!active} positive={!active}
      onClick={switchPubView}
      title="Publications per year"
    >YEAR</Button>
    <div className="or"></div>
    <Button disabled={active} positive={active}
      onClick={switchPubView}
      title="Publications per type"
    >TYPE</Button>
  </div>
)


class Publications extends React.Component {
  state = {
    references: {},
    referencesDetail: {},
    showing: 'type',
    graphdata: {},
  }
  componentDidMount = () => {
    // fetch references per publication year
    fetch(_REFERENCES_PER_YEAR)
    .then(response => response.json())
    .then(refs => {
      const categorizedRefs = categorizeListPerYear(refs)

      // const refMapping = JSON.parse(JSON.stringify(references))
      const refsByYear = []
      let maxRefsByYear = 0
      for (let y in categorizedRefs) {
        const c = categorizedRefs[y].length
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
      // console.log(tickArray)

      const graphdata = {refsByYear, tickArray}
      this.setState({
      	references: categorizedRefs,
      	graphdata
      })
    })
    // fetch references per publication type
    fetch(_REFERENCES_PER_TYPE)
    .then(response => response.json())
    .then(referencesDetail => {
      const keys = Object.keys(referencesDetail)
      for (const key of keys) {
        referencesDetail[key].map(obj => {
          obj.title = obj.title.replace('publications_bib.html', '/static/publications_bib.html')
          return obj
        })
      }
      this.setState({ referencesDetail })
    })
  }
  switchPubView = () => {
    if (this.state.showing === 'type') {
      this.setState({'showing': 'year'})
    } else {
      this.setState({'showing': 'type'})
    }
  }
  render() {
    const { references, referencesDetail, showing, graphdata } = this.state
    const keysYear = Object.keys(references).reverse()
    const keysType = Object.keys(referencesDetail).reverse()
    // keysType.sort() // sort alphabetically

    const typeIsActive = showing === 'type'

    // custom sort order
    let customSortOrder = []
    if (keysType.length > 0) {
      customSortOrder = [
        "Journal Articles",
        "Conference Papers",
        "Workshops",
        "Workshop Proceedings",
        "Doctoral Consortia",
        "Conference Posters and Position Papers",
        "Pre-prints and Working Papers",
        "Theses and Seminal Papers",
      ]
    }

    return (
      <Layout>
      <div className="ui container">

        <ResponsiveContainer width="100%" height={150}>
          <BarChart data={graphdata.refsByYear}>
            <XAxis
              dataKey="year"
            />
            <YAxis
              type="number"
              domain={[0, 'dataMax']}
              ticks={graphdata.tickArray}
              allowDecimals={false}
            />
            <Tooltip />
            <CartesianGrid stroke="#eee" strokeDasharray="5 5"/>
            <Bar dataKey="num" fill="#8CE6A9">
              <LabelList dataKey="num" position="top" />
            </Bar>
          </BarChart>
        </ResponsiveContainer>

        <div id="publicationButtons" style={styles.menu}>
          <PdfPubsButton />
          <SwitchBtn
            active={typeIsActive}
            switchPubView={this.switchPubView}
          />
        </div>

        <div className="ui container" id="publications-type" style={{display: typeIsActive ? 'block' : 'none'}}>

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
                                  <MediaContextProvider>
                                    <Media at="sm">
                                      <Icon color="grey" size="large" name={icostr} />
                                    </Media>
                                    <Media at="md">
                                      <Icon color="grey" size="huge" name={icostr} />
                                    </Media>
                                    <Media greaterThanOrEqual="lg">
                                      <Icon color="grey" size="big" name={icostr} />
                                    </Media>
                                    </MediaContextProvider>
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

            <div style={spacer}></div>

        </div>

        <div className="ui container" id="publications-year" style={{display: typeIsActive ? 'none' : 'block'}}>

              {
                keysYear.map(year => {
                  return (
                    <div className="ui grid" key={year} style={noMarginGrid}>
                        <div className="row">
                          <h1>{year}</h1>
                        </div>
                        {
                          references[year].map((item, index) => {
                            item.__html = item.__html.replace('Jonas Oppenlaender', '<strong>Jonas Oppenlaender</strong>')
                            item.__html = item.__html.replace('Jonas Oppenländer', '<strong>Jonas Oppenländer</strong>')
                            item.__html = item.__html.replace('--', '–')
                            const icostr = item.__html.indexOf('.pdf') === -1 ? 'file outline' : 'file alternate outline'
                            return (
                              <div className="row" key={index}>
                                <div className="two wide column">
                                  <MediaContextProvider>
                                    <Media at="sm">
                                      <Icon color="grey" size="large" name={icostr} />
                                    </Media>
                                    <Media at="md">
                                      <Icon color="grey" size="huge" name={icostr} />
                                    </Media>
                                    <Media greaterThanOrEqual="lg">
                                      <Icon color="grey" size="big" name={icostr} />
                                    </Media>
                                  </MediaContextProvider>
                                </div>
                                <div className="fourteen wide column">
                                  <div className="item">
                                    <div className="content">
                                      <div className="header" dangerouslySetInnerHTML={item}></div>
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

            <div style={spacer}></div>

        </div>

      </div>
      </Layout>
    )
  }
}

export default Publications
