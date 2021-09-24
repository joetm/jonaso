import React from "react"
import { Container } from 'semantic-ui-react'
import Layout from "../components/layout"


class Page404 extends React.Component {
    render() {
        return (
            <Layout>
                <Container>
                  404 - Not Found.
                </Container>
            </Layout>
        )
    }
}

export default Page404
