import React from "react"
import Link from "gatsby-link"
import { Button, Responsive, Header, List, Item, Icon, Grid, Container } from 'semantic-ui-react'
import { Bar, BarChart, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts'
import "isomorphic-fetch"
// import useDetectPrint from 'use-detect-print'

import "semantic-ui-css/components/grid.min.css"
import { spacer } from "../common"

const styles = {
  menu: {
    textAlign: 'center',
    fontSize: '1.5em',
    lineHeight: '2em',
    marginBottom: '1em',
    marginTop: '0.5em',
  },
  noMarginGrid: {
    marginRight: 0,
    marginLeft: 0,
  },
}

const _REFERENCES_PER_YEAR = "https://raw.githubusercontent.com/joetm/jonaso/master/public/static/references.json"
const _REFERENCES_PER_TYPE = "https://raw.githubusercontent.com/joetm/jonaso/master/public/static/references-type.json"


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
}


class Publications extends React.Component {
  state = {
    references: {},
    referencesDetail: {},
    showing: 'type',
  }
  componentWillMount = () => {
    // fetch references per publication year
    fetch(_REFERENCES_PER_YEAR)
    .then(response => response.json())
    .then(refs => {
      const categorizedRefs = categorizeListPerYear(refs)
      this.setState({references: categorizedRefs})
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
      this.setState({referencesDetail})
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
    const { references, referencesDetail, showing } = this.state
    const keysYear = Object.keys(references).reverse()
    const keysType = Object.keys(referencesDetail).reverse()
    // keysType.sort() // sort alphabetically

    // custom sort order
    let customSortOrder = []
    if (keysType.length > 0) {
      customSortOrder = [
        "Peer-reviewed Conference Papers",
        "Peer-reviewed Journal Articles",
        "Peer-reviewed Workshops Organized",
        "Peer-reviewed Conference Posters and Position Papers",
        "Doctoral Consortia",
        "Theses and Seminal Papers",
      ]
    }

    // console.log('customSortOrder', customSortOrder)
    // console.log('keysType', keysType)

    // const isPrinting = useDetectPrint()

    // const refMapping = JSON.parse(JSON.stringify(references))
    const refsByYear = []
    for (let y in references) {
      refsByYear.push({year: y, num: references[y].length})
    }

    return (
      <Container>

        <ResponsiveContainer width="100%" height={150}>
          <BarChart data={refsByYear}>
            <XAxis
              dataKey="year"
            />
            <YAxis
              type="number"
              domain={[0, 'dataMax']}
            />
            <Tooltip />
            <CartesianGrid stroke="#eee" strokeDasharray="5 5"/>
            <Bar type="step" dataKey="num" fill="#8CE6A9" />
          </BarChart>
        </ResponsiveContainer>

        <div id="publicationButtons" style={styles.menu}>
          <Button.Group>
            <Button disabled={showing !== 'type'} positive={showing !== 'type'}
              onClick={this.switchPubView}
              title="Publications per year"
            >YEAR</Button>
            <Button.Or />
            <Button disabled={showing === 'type'} positive={showing === 'type'}
              onClick={this.switchPubView}
              title="Publications per type"
            >TYPE</Button>
          </Button.Group>
        </div>

        <Container id="publications-type" style={{display: showing === 'type' ? 'block' : 'none'}}>

              {
                customSortOrder.map(typ => {
                  return (
                    <Grid key={typ} style={styles.noMarginGrid}>
                        <Grid.Row>
                          <Header size="large">{typ}</Header>
                        </Grid.Row>
                        {
                          referencesDetail[typ].map((ref, index) => {
                            let title = ref.title.replace('Jonas Oppenlaender', '<strong>Jonas Oppenlaender</strong>')
                            title = title.replace('Jonas Oppenländer', '<strong>Jonas Oppenländer</strong>')
                            let icostr = 'file text outline'
                            if (title.indexOf('.pdf') === -1) {
                              icostr = 'file outline'
                            }
                            return (
                              <Grid.Row key={index}>
                                <Grid.Column width={2}>
                                  <Responsive maxWidth={768}>
                                    <Icon color="grey" size="large" name={icostr} />
                                  </Responsive>
                                  <Responsive minWidth={769} maxWidth={990}>
                                    <Icon color="grey" size="huge" name={icostr} />
                                  </Responsive>
                                  <Responsive minWidth={992}>
                                    <Icon color="grey" size="big" name={icostr} />
                                  </Responsive>
                                </Grid.Column>
                                <Grid.Column width={14}>
                                <Item>
                                  <Item.Content>
                                    <Item.Header dangerouslySetInnerHTML={{__html: title}} />
                                  </Item.Content>
                                </Item>
                                </Grid.Column>
                              </Grid.Row>
                            )
                          })
                        }
                    </Grid>
                  )
                })
              }

            <div style={spacer}></div>

        </Container>

        <Container id="publications-year" style={{display: showing !== 'type' ? 'block' : 'none'}}>

              {
                keysYear.map(year => {
                  return (
                    <Grid key={year} style={styles.noMarginGrid}>
                        <Grid.Row>
                          <Header size="large">{year}</Header>
                        </Grid.Row>
                        {
                          references[year].map((item, index) => {
                            item.__html = item.__html.replace('Jonas Oppenlaender', '<strong>Jonas Oppenlaender</strong>')
                            item.__html = item.__html.replace('Jonas Oppenländer', '<strong>Jonas Oppenländer</strong>')
                            item.__html = item.__html.replace('--', '–')
                            let icostr = 'file text outline'
                            if (item.__html.indexOf('.pdf') === -1) {
                              icostr = 'file outline'
                            }
                            return (
                              <Grid.Row key={index}>
                                <Grid.Column width={2}>
                                  <Responsive maxWidth={768}>
                                    <Icon color="grey" size="large" name={icostr} />
                                  </Responsive>
                                  <Responsive minWidth={769} maxWidth={990}>
                                    <Icon color="grey" size="huge" name={icostr} />
                                  </Responsive>
                                  <Responsive minWidth={992}>
                                    <Icon color="grey" size="big" name={icostr} />
                                  </Responsive>
                                </Grid.Column>
                                <Grid.Column width={14}>
                                <Item>
                                  <Item.Content>
                                    <Item.Header dangerouslySetInnerHTML={item}></Item.Header>
                                    {/*
                                    <Item.Extra>
                                      <List>
                                        <List.Item><a href="https://www.researchgate.net/publication/321418554_Towards_Sociotechnical_Management_of_Intra-Organisational_Knowledge_Transfer"><Icon title="pdf" name='file pdf outline' /></a></List.Item>
                                      </List>
                                    </Item.Extra>
                                    */}
                                  </Item.Content>
                                </Item>
                                </Grid.Column>
                              </Grid.Row>
                            )
                          })
                        }
                    </Grid>
                  )
                })
              }

            <div style={spacer}></div>

        </Container>
      </Container>
    )
  }
}

export default Publications
