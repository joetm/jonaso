import React from "react"
import Link from "gatsby-link"
import { Label, Header, List, Grid, Divider, Image, Container, Icon } from 'semantic-ui-react'

import "../../libs/academicons/css/academicons.min.css"
import img from "../img/opp.jpg"
import { nobottommargin, notopmargin, nobold } from "../common"


const travel = {
  upcoming: [
    { event: "INTERACT'19", date: "2.-6. Sept 2019", location: "Paphos", status: "planned" },
    { event: "C&C'19", date: "23.-26. June 2019", location: "San Diego", status: "planned" },
    { event: "CHI'19", date: "4.-9. May 2019", location: "Glasgow", status: "confirmed" },
  ],
  past: [
    // { event: "PerDis'19", date: "12.-14. June 2019", location: "Palermo", status: "planned" },
    // { event: "IUI'19", date: "17.-20. March 2019", location: "Los Angeles", status: "planned" },
    { event: "UbiComp'18", date: "9.-11. October 2018", location: "Singapore", status: "confirmed" },
    { event: "Mobile Human Contributions workshop (MHC'18)", date: "8. October 2018", location: "Singapore", status: "confirmed" },
    { event: "UBISS", date: "4.-9. June 2018", location: "Oulu", status: "confirmed" },
    // { event: "Int. SemWeb Research Summer School", date: "1.-7. July 2018", location: "Bertinoro", status: "planned" },
    { event: "Oulu, Finland", date: "April 2018", location: "Oulu", status: "confirmed" },
	{ event: "MKWI'18", date: "6.-9. March 2018", location: "Lüneburg", status: "confirmed" },
    // { event: "CI/HCOMP'18", date: "5.-8. July 2018", location: "Zürich", status: "planned" },
    // { event: "WebSci'18", date: "28.-29. May 2018", location: "Amsterdam", status: "planned" },
    { event: "GI-Symposium: Arbeitswelten der Zukunft", date: "29. January 2018", location: "Berlin", status: "confirmed" },
    { event: "HCOMP'17", date: "24.10.-26.10.2017", location: "Quebec, QC", status: "confirmed" },
  ],
}

const keywords = {
  primary: [
    "crowdsourcing",
    "human computation",
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
                  in the Community Instrumentation and Awareness research group
                  at the <a href="http://ubicomp.oulu.fi/">Center for Ubiquitous Computing</a>,
                  {" "}
                  <a href="http://www.oulu.fi/university/">University of Oulu</a>,
                  {" "}
                  <a href="https://www.theatlantic.com/entertainment/archive/2012/03/world-map-metal-band-population-density/329913/">Finland</a>.
                  {/* working towards a PhD in Applied Computer Science. */}
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
          				  {/*
                    <br />
                    This exploratory, open-ended approach to research is conducted in the context of
                    Business Informatics (BI), a research discipline that originated in Germany.
                    Unlike Information Science, BI tends towards constructing and evaluating prototypical artefacts (Design Science Research).
				            */}
                </p>

                <Header size="tiny" style={{...nobold, ...notopmargin, ...nobottommargin}}>My <strong>primary research interests</strong> are:</Header>
                  { keywords.primary.join(", ") }

                <Header size="tiny" style={{...nobold, ...notopmargin, ...nobottommargin}}><strong>Further research interests</strong> include:</Header>
                  { keywords.secondary.join(", ") }

                <Header size="tiny" style={nobottommargin}>Upcoming Travel</Header>
                <List>
                  {
                    travel.upcoming.map((item,index) => (
                      <List.Item key={index} title={item.status} style={styles.defaultcursor}>
                          <List.Icon name={item.status === 'confirmed' ? 'checkmark' : 'calendar'} />
                          {[item.event,item.date,item.location].join(", ")}
                      </List.Item>
                    ))
                  }
                </List>

              </Grid.Column>

              <Grid.Column mobile={7} tablet={7} computer={5}>

                <Image src={img} rounded fluid />

                <Header size="tiny" style={nobottommargin}>Office Address:</Header>
                <p>
                    University of Oulu<br />
                    Erkki Koiso-Kanttilan katu 3<br />
                    Room TS371<br />
                    P.O. Box 4500<br />
                    FI-90014 Oulu<br />
                    E-Mail: {'{'}firstname.lastname{'}'}@oulu.fi<br />
                    {/*
                    Telephone: +49 30 838-61565<br />
                    Fax: +49 30 838-475233
					*/}
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
              <Icon title="LinkedIn" link={true} color="grey" size="big" name='linkedin square' />
          </a>

          <a href="https://github.com/joetm" target="_blank">
              <Icon title="GitHub" link={true} color="grey" size="big" name='github square' />
          </a>

          <a href="https://twitter.com/Duesynapse" target="_blank">
              <Icon title="Twitter" link={true} color="grey" size="big" name='twitter square' />
          </a>

          <a href="https://scholar.google.com/citations?hl=de&user=ucO_QYQAAAAJ" target="_blank">
              <i style={styles.academicon} title="Google Scholar" className="ai ai-google-scholar-square ai-2x"></i>
          </a>

          <a href="https://www.researchgate.net/profile/Jonas_Oppenlaender" target="_blank">
              <i style={styles.academicon} title="Researchgate" className="ai ai-researchgate-square ai-2x"></i>
          </a>

          <a href="https://orcid.org/0000-0002-2342-1540">
              <i style={styles.academicon} title="ORCID" className="ai ai-orcid-square ai-2x"></i>
          </a>

        </Container>
      </div>
    )
  }
}

export default Home
