import React from "react"
import Link from "gatsby-link"
import { Responsive, Header, List, Item, Icon, Grid, Container } from 'semantic-ui-react'
import "isomorphic-fetch"

import { spacer } from "../common"

const styles = {
  menu: {
    textAlign: 'center',
    fontSize: '1.5em',
    linHeight: '2.5em',
  },
}

const _REFERENCES_PER_YEAR = "http://jonaso.de/static/references.json"
const _REFERENCES_PER_TYPE = "http://jonaso.de/static/references-detail.json"


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
    // fetch(_REFERENCES_PER_TYPE)
    // .then(response => response.json())
    // .then(referencesDetail => {
    //   // const categorizedRefs = categorizeListPerType(refs)
    //   this.setState({referencesDetail})
    // })
  }
  // switchPubView () {
  //   alert('switch');
  // }
  render() {
    const { references } = this.state
    const keysYear = Object.keys(references).reverse()
    return (
      <div>

{/*
        <div style={styles.menu}>
          <button onClick={this.switchPubView} title="Publications per year">YEAR</button>
          {" "} | {" "}
          <button onClick={this.switchPubView} title="Publications per type">TYPE</button>
        </div>

        <Container id="publications-type" style={{display:'block'}}>

              {
                keysType.map(typ => {
                  return (
                    <Grid key={typ}>
                        <Grid.Row>
                          <Header size="large">{typ}</Header>
                        </Grid.Row>
                        {
                          referencesDetail[typ].map((item, index) => {
                            item.__html = item.__html.replace('Jonas Oppenlaender', '<strong>Jonas Oppenlaender</strong>')
                            item.__html = item.__html.replace('Jonas Oppenländer', '<strong>Jonas Oppenländer</strong>')
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
                                    <Item.Header dangerouslySetInnerHTML={item.__html} />
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

        </Container>
*/}

        <Container id="publications-year">

              {
                keysYear.map(year => {
                  return (
                    <Grid key={year}>
                        <Grid.Row>
                          <Header size="large">{year}</Header>
                        </Grid.Row>
                        {
                          references[year].map((item, index) => {
                            item.__html = item.__html.replace('Jonas Oppenlaender', '<strong>Jonas Oppenlaender</strong>')
                            item.__html = item.__html.replace('Jonas Oppenländer', '<strong>Jonas Oppenländer</strong>')
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
      </div>
    )
  }
}

export default Publications
