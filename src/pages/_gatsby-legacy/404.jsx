import React from "react"
import Layout from "../components/layout"

import errorimg from "../../static/img/795f4d1f-8b28-429d-9d96-424e3744fb74.png"

export default function Page404() {
    return (
        <Layout>
            <div className="ui container" style={{textAlign:'center'}}>
              <img src={errorimg} alt="" width="500" />
              <br />
              404 &ndash; Not Found.
            </div>
        </Layout>
    )
}

