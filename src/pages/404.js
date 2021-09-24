import React from "react"
import { Container } from 'semantic-ui-react'
import Layout from "../components/layout"
import { Helmet } from "react-helmet"


class Home extends React.Component {
    render() {
        return (
            <Layout>
                <Helmet>
                  <meta charSet="utf-8" />
                  <title>404 - Not Found {'//'} jonaso.de</title>
                </Helmet>
                <Container>
                  404 - Not Found.
                </Container>
            </Layout>
        )
    }
}

export default Home
