import React from "react"
import Layout from "../components/layout"

// export function Head() {
//   return (
//     <>
//       <meta charSet="utf-8" />
//       <title>CV {'//'} jonaso.de</title>
//       <link rel="canonical" href="https://www.jonaso.de/cv/" />
//     </>
//   )
// }

export default function Page404() {
    return (
        <Layout>
            <div className="ui container">
              404 &ndash; Not Found.
            </div>
        </Layout>
    )
}

