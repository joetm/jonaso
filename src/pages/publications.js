import React from "react"
import Link from "gatsby-link"
import { Header, List, Item, Icon, Grid, Container } from 'semantic-ui-react'


const styles = {
  spacer: {
    height: '5em',
  },
  nonbold: {
    fontWeight: 'normal',
  },
}


/**
 * Group publications by year
 * @param {Array} pubList - List of publications
 * @returns {Object} categorizedList - Categorized list of publications
 */
function categorizeList(pubList) {
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
  }
  componentWillMount = () => {
    fetch('/static/references.json')
    .then(response => response.json())
    .then(refs => {
      const categorizedRefs = categorizeList(refs)
      this.setState({references: categorizedRefs})
    })
  }
  render() {
    const { references } = this.state
    const keys = Object.keys(references).reverse()
    return (
      <div>
        <Container>

              {
                keys.map(year => {
                  return (
                    <Grid key={year}>
                        <Grid.Row>
                          <Header size="large">{year}</Header>
                        </Grid.Row>
                        {
                          references[year].map((item, index) => (
                            <Grid.Row key={index}>
                              <Grid.Column width={2}>
                                  <Icon color="grey" size="huge" name='file text outline' />
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
                          ))
                        }
                    </Grid>
                  )
                })
              }


            <div style={styles.spacer}></div>

        </Container>
      </div>
    )
  }
}

export default Publications
