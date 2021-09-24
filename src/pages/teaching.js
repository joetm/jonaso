import React from "react"
import { Header, Item, Container } from 'semantic-ui-react'

import Layout from "../components/layout"
import { spacer } from "../common"
import { Helmet } from "react-helmet"


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
  // redirectToPortfolio = () => {
  //   window.location = _PORTFOLIO_URL
  // }
  render() {
        return (
            <Layout>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Teaching {'//'} jonaso.de</title>
          <link rel="canonical" href="http://www.jonaso.de/teaching" />
        </Helmet>
              <Container>

                <Header id="education" size="large">Teaching Assistant</Header>

                  <Item.Group>

                    <Item>
                      <div style={styles.datum}>Autumn term 2018</div>
                      <Item.Content>
                        <Item.Header>
                            Social Computing
                        </Item.Header>
                      </Item.Content>
                    </Item>

                    <Item>
                      <div style={styles.datum}>Autumn term 2018</div>
                      <Item.Content>
                        <Item.Header>
                            Human Computer Interaction
                        </Item.Header>
                      </Item.Content>
                    </Item>

                  </Item.Group>

                  <div style={spacer}></div>

              </Container>
            </Layout>
        )
  }
}

export default Teaching
