import React from "react"
import { Container } from 'semantic-ui-react'
import Layout from "../components/layout"


// export function Head() {
//   return (
//     <>
//       <meta charSet="utf-8" />
//       <title>CV {'//'} jonaso.de</title>
//       <link rel="canonical" href="https://www.jonaso.de/cv" />
//     </>
//   )
// }

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
