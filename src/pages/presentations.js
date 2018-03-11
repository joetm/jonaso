import React from "react"
import Link from "gatsby-link"
import { Responsive, Header, List, Item, Icon, Grid, Container } from 'semantic-ui-react'
import "isomorphic-fetch"

import { spacer } from "../common"


const presis = [
    {
    	title: "Towards Sociotechnical Management of Intra-Organisational Knowledge Transfer",
    	year: 2018,
    	month: "March",
      day: 7,
    	conference: "Multikonferenz Wirtschaftsinformatik (MKWI)",
    	location: "Lüneburg, Germany",
    	doi: "10.6084/m9.figshare.5951932",
      url: "http://www.jonaso.de/docs/mkwi2018-poster-final.pdf",
      note: "Poster, Multikonferenz Wirtschaftsinformatik (MKWI)",
    },
    {
      title: "Socio-technical Revelation of Knowledge Transfer Potentials",
      year: 2017,
      month: "October",
      day: 25,
      conference: "5th AAAI Conference on Human Computation and Crowdsourcing (HCOMP)",
      location: "Quebec City, Quebec, Canada",
      doi: "10.6084/m9.figshare.5844921",
      url: "http://www.jonaso.de/docs/hcomp-poster-final.pdf",
      note: "Poster, 5th AAAI Conference on Human Computation and Crowdsourcing (HCOMP)",
    },
    {
      title: "CrowdUI - A Tool to Remotely Source and Evaluate User Interface Adaptations",
      year: 2015,
      month: "October",
      day: 5,
      conference: "",
      location: "Southampton, UK",
      doi: null,
      url: "http://crowdui.com/screen-recordings/crowdui-presentation.pdf",
      note: "MSc final presentation",
    },
]



/**
 * Group presentations by year
 * @param {Array} pubList - List of presentations
 * @returns {Object} categorizedList - Categorized list of presentations
 */
function categorizeList(presList) {
    const categorizedList = {}
    presList.forEach(obj => {
      if (categorizedList[obj.year]) {
          categorizedList[obj.year].push(obj)
      } else {
          categorizedList[obj.year] = [obj]
      }
    })
    return categorizedList
}


class Presentations extends React.Component {
  state = {
    presentations: {},
  }
  componentWillMount = () => {
    this.setState({presentations: categorizeList(presis)})
  }
  render() {
    const { presentations } = this.state
    const keys = Object.keys(presentations).reverse()
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
                          presentations[year].map((item, index) => {
                            let icostr = 'newspaper outline'
                            return (
                              <Grid.Row key={index}>
                                <Grid.Column width={2}>
                                  <a href={item.doi}>
                                  <Responsive maxWidth={768}>
                                    <Icon color="grey" size="large" name={icostr} />
                                  </Responsive>
                                  <Responsive minWidth={769} maxWidth={990}>
                                    <Icon color="grey" size="huge" name={icostr} />
                                  </Responsive>
                                  <Responsive minWidth={992}>
                                    <Icon color="grey" size="big" name={icostr} />
                                  </Responsive>
                                  </a>
                                </Grid.Column>
                                <Grid.Column width={14}>
                                <Item>
                                  <Item.Content>
                                    <Item.Header>
                                      <a href={item.doi}>{item.title}</a>
                                    </Item.Header>
                                    <Item.Extra>
                                      <List>
                                        <List.Item>{item.conference} {item.location}, {item.month} {item.year}</List.Item>
                                      </List>
                                    </Item.Extra>
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

export default Presentations
