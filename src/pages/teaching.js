import React from "react"
import Link from "gatsby-link"
import { Responsive, Header, List, Item, Icon, Grid, Container } from 'semantic-ui-react'
import "isomorphic-fetch"

import { spacer } from "../common"


const styles = {
  datum: {
    paddingRight: '2em',
    minWidth: '120px',
  },
  nonbold: {
    fontWeight: 'normal',
    fontSize: '1em',
  },
}


class Teaching extends React.Component {
  redirectToPortfolio = () => {
    window.location = _PORTFOLIO_URL
  }
  render() {
        return (
            <div>

              <Container>

                <Header id="education" size="large">Teaching Assistant</Header>

                  <Item.Group>

                    <Item>
                      <div style={styles.datum}>Autumn term 2018</div>
                      <Item.Content>
                        <Item.Header>
                          <a href="#">
                            Social Computing
                          </a>
                        </Item.Header>
                      </Item.Content>
                    </Item>

                    <Item>
                      <div style={styles.datum}>Autumn term 2018</div>
                      <Item.Content>
                        <Item.Header>
                          <a href="#">
                            Human Computer Interaction
                          </a>
                        </Item.Header>
                      </Item.Content>
                    </Item>

                  </Item.Group>

                  <div style={spacer}></div>

              </Container>
            </div>
        )
  }
}

export default Teaching
