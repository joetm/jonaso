import React from "react"
import Link from "gatsby-link"
import { Label, Header, List, Grid, Divider, Image, Container, Icon } from 'semantic-ui-react'
import "isomorphic-fetch"

import "../../libs/academicons/css/academicons.min.css"
import TravelRotary from "../TravelRotary"
import img from "../img/opp.jpg"
import ACMDL from "../img/ACM-DL-Logo-size3.webp"
import { nobottommargin, notopmargin, nobold } from "../common"


const keywords = {
  primary: [
    "crowdsourcing",
    "crowd feedback systems",
    "creativity support tools",
    // "human computation",
    "collective intelligence",
    "web science",
    "collaborative ontology engineering",
    "semantic web",
    "linked data",
  ],
  secondary: [
    "social machines",
    "knowledge transfer",
    "computer supported collaborative work",
    "e-science",
    "hypertext and hypermedia",
    "online communities",
  ],
}

const styles = {
    tag: {
        marginTop: '0.2em',
        marginBottom: '0.2em',
        cursor: 'default',
    },
    academicon: {
        lineHeight: 1,
        verticalAlign: 'middle',
        fontSize: '2em',
        cursor: 'pointer',
        opacity: .8,
        transition: 'opacity .1s ease',
        display: 'inline-block',
        margin: '0 .25rem 0 0',
        width: '1.18em',
        height: '1em',
        fontStyle: 'normal',
        fontWeight: 400,
        textDecoration: 'inherit',
        textAlign: 'center',
        speak: 'none',
        backfaceVisibility: 'hidden',
        color: '#767676',
    },
    defaultcursor: {
    	cursor: 'default',
    },
}


class Home extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      travel: [],
    }
  }
  render() {
    return (
      <div>
        <Container style={{marginBottom: '14px'}}>

          <Grid>
            <Grid.Row>

              <Grid.Column mobile={9} tablet={9} computer={9} widescreen={9} largeScreen={9}>

                <p>
                  I am <strong>Jonas Oppenlaender</strong>,
                  a doctoral student
                  {/* in the Community Instrumentation and Awareness research group */}
                  {/* in the Crowd Computing research group */}
                  at the <a href="http://ubicomp.oulu.fi/">Center for Ubiquitous Computing</a>,
                  {" "}
                  <a href="http://www.oulu.fi/university/">University of Oulu</a>,
                  {" "}
                  <a href="https://www.theatlantic.com/entertainment/archive/2012/03/world-map-metal-band-population-density/329913/">Finland</a>.
                  working towards a PhD in Computer Science.
                  {" "}
                  Previously, I was a research assistant (early-stage researcher)
                  at the <a href="http://www.mi.fu-berlin.de/en/inf/groups/hcc/" rel="nofollow">Human-Centered Computing</a> group, Freie Universit&auml;t Berlin.
                </p>

                <p>
                  I hold a MSc degree in Computer Science
                  from the <a href="https://www.southampton.ac.uk/">University of Southampton</a>, UK,
                  and studied Industrial Engineering in Germany and Sweden.
                </p>

                <p>
                  I am interested in building web-based socio-technical systems
                  in which the human and technological elements play the role of participant machinery
                  in order to perform complex tasks better than either human or machine could independently.
                </p>

                <p>
        	        <Header size="tiny" style={{...nobold, ...notopmargin, ...nobottommargin}}>My <strong>primary research interests</strong> are:</Header>
            	      { keywords.primary.join(", ") }
                </p>

                <p>
	                <Header size="tiny" style={{...nobold, ...notopmargin, ...nobottommargin}}><strong>Further research interests</strong> include:</Header>
    	              { keywords.secondary.join(", ") }
                </p>

                <TravelRotary />

              </Grid.Column>

              <Grid.Column mobile={7} tablet={7} computer={5}>

                <Image src={img} alt="Jonas Oppenlaender" rounded fluid />

                <Header size="tiny" style={nobottommargin}>Office Address:</Header>
                <p>
                    University of Oulu<br />
                    Erkki Koiso-Kanttilan katu 3<br />
                    Room TS371<br />
                    P.O. Box 4500<br />
                    FI-90014 Oulu<br />
                    E-Mail: {'{'}firstname.lastname{'}'}@oulu.fi
                </p>

                <p>
                    <strong>Consultation hour</strong>: <i>on demand</i> - just send me an email and we&apos;ll arrange a meeting
                </p>

				{/*
                <p>
                    <Icon as="i" link={true} size="large" name='hand outline right' />
                    <a href="http://www.mi.fu-berlin.de/en/inf/groups/hcc/theses/open/index.html">Open BSc and MSc theses</a>
                </p>
	            */}

              </Grid.Column>
            </Grid.Row>
          </Grid>

          <Divider />

          <a href="https://www.linkedin.com/in/jonasopp/" target="_blank">
              <Icon title="Jonas Oppenlaender on LinkedIn" link={true} color="grey" size="big" name='linkedin square' />
          </a>

          <a href="https://github.com/joetm" target="_blank">
              <Icon title="Jonas Oppenlaender on GitHub" link={true} color="grey" size="big" name='github square' />
          </a>

          <a href="https://twitter.com/Duesynapse" target="_blank">
              <Icon title="Jonas Oppenlaender on Twitter" link={true} color="grey" size="big" name='twitter square' />
          </a>

          <a href="https://dl.acm.org/author_page.cfm?id=99659312669" target="_blank">
              <i style={{display:'inline-block', width: '25px', height: '25px',
              	backgroundImage: `url(${ACMDL})`, verticalAlign: 'middle', backgroundPosition: 'center center', lineHeight: 1, margin: '0px 0.25rem 0px 0px', backgroundSize: 'cover', opacity: 0.45}} title="Jonas Oppenlaender on ACM DL"></i>
          </a>

          <a href="https://orcid.org/0000-0002-2342-1540">
              <i style={styles.academicon} title="Jonas Oppenlaender on ORCID" className="ai ai-orcid-square ai-2x"></i>
          </a>

          <a href="https://dblp.uni-trier.de/pers/hd/o/Oppenlaender:Jonas">
              <i style={styles.academicon} title="Jonas Oppenlaender on DBLP" className="ai ai-dblp-square ai-2x"></i>
          </a>

          <a href="https://scholar.google.com/citations?hl=de&user=ucO_QYQAAAAJ" target="_blank">
              <i style={styles.academicon} title="Jonas Oppenlaender on Google Scholar" className="ai ai-google-scholar-square ai-2x"></i>
          </a>

        </Container>
      </div>
    )
  }
}

export default Home
