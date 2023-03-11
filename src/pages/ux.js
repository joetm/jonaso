import 'semantic-ui-css/components/card.min.css'

import React from "react"
// import Layout from "../components/layout"
import { Seo } from "../components/Seo"


const src = "http://localhost:8000/static/opp-1924a88836b85f62ee5d9a0754979b59.jpg"


export function Head() {
  return (
    <Seo title="UX // jonaso.de">
      <link id="canonical" rel="canonical" href="https://www.jonaso.de/ux/" />
    </Seo>
  )
} //

class UX extends React.Component {
  render() {
    return (
      <div className="ui container">
	 			  <h1>UX Portfolio</h1>
	        <div className="ui two cards">
				    <div className="ui card">
  				    <div className="image">
	  				    <img src={src} alt="" />
  				    </div>
					    <div className="content">
					      <div className="header">Matthew</div>
					      <div className="meta">
					        <span className='date'>Joined in 2015</span>
					      </div>
					      <div className="description">
					        Matthew is a musician living in Nashville.
					      </div>
					    </div>
					    <div className="extra content">
					        22 Friends
					    </div>
				    </div>
				  </div>
      </div>
    )
  }
}


export default UX
