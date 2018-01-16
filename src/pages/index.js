import React from "react"
import Link from "gatsby-link"
import { Responsive, Label, Header, List, Grid, Divider, Image, Container, Icon } from 'semantic-ui-react'

import "../../libs/academicons/css/academicons.min.css"
import img from "../img/opp.jpg"
import { nobottommargin, notopmargin, nobold } from "../common"


const travel = {
  upcoming: [
    // { event: "HCOMP'18, 5.-8. July 2018, Zürich", status: "planned" },
    { event: "HILDA'18 Workshop, 10. June 2018, Houston, TX", status: "planned" },
    { event: "Future of Work and Innovation Symposium, 15. May 2018, Berlin", status: "planned" },
    { event: "WWW'18, 23.-27. April 2018, Lyon", status: "planned" },
    // ---
    { event: "MKWI'18, 6.-9. March 2018, Lüneburg", status: "confirmed" },
    { event: "GI-Symposium, 29. January 2018, Berlin", status: "confirmed" },
  ],
  past: [
    { event: "HCOMP'17, 24.10.-26.10.2017, Quebec", status: "confirmed" },
  ],
}

const keywords = {
  primary: [
    "collaborative ontology engineering",
    "semantic web",
    "linked data",
    "crowdsourcing",
    "human computation",
    "collective intelligence",
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
}


class Home extends React.Component {
  render() {
    return (
      <div>
        <Container style={{marginBottom: '14px'}}>

          <Grid>
            <Grid.Row>

              <Grid.Column mobile={8} tablet={8} computer={8} widescreen={8} largeScreen={8}>

                <p>
                  I am <strong>Jonas Oppenlaender</strong>,
                  an Early-Stage Researcher
                  at the <a href="http://www.mi.fu-berlin.de/en/inf/groups/hcc/">Human-Centered Computing</a> group at FU Berlin
                  working towards a PhD in Applied Computer Science.
                </p>

                <p>
                  I studied Industrial Engineering in Germany and Sweden
                  and hold a MSc degree in Computer Science
                  from the <a href="https://www.southampton.ac.uk/">University of Southampton</a>, UK.
                </p>

                <p>
                  I am interested in building web-based socio-technical systems
                  in which the human and technological elements play the role of participant machinery
                  in order to perform complex tasks better than either human or machine could independently.
                  <br />
                  This exploratory, open-ended approach to research is conducted in the context of
                  Business Informatics (BI), a research discipline that originated in Germany.
                  Unlike Information Science, BI tends towards constructing and evaluating prototypical artefacts (Design Science Research).
                </p>

                <p>
                  Presently, I am in the process of identifying topics and finding a supervisor for my PhD thesis.
                  Two possible topics that particularly interest me are the application of crowdsourcing in order to solve problems in the context of the semantic web
                  and tackling the broader problem of providing better working conditions and fair compensation to crowdworkers.
                </p>

                <Header size="tiny" style={{...nobold, ...notopmargin, ...nobottommargin}}>My <strong>primary research interests</strong> are:</Header>
                  { keywords.primary.join(", ") }

                <Header size="tiny" style={{...nobold, ...notopmargin, ...nobottommargin}}><strong>Further research interests</strong> include:</Header>
                  { keywords.secondary.join(", ") }


                <Header size="tiny" style={nobottommargin}>Upcoming Travel</Header>
                <List>
                  {
                    travel.upcoming.map(item => (
                      <List.Item>
                          {item.status === 'confirmed' ?
                            <List.Icon name='checkmark' title="confirmed" /> :
                            <List.Icon name='calendar' title="planned" />
                          }
                          {item.event}
                      </List.Item>
                    ))
                  }
                </List>

              </Grid.Column>

              <Grid.Column mobile={8} tablet={8} computer={6}>

                <Responsive minWidth={768}>
                  <Image src={img} size='medium' rounded />
                </Responsive>

                <Responsive maxWidth={769}>
                  <Image src={img} rounded fluid />
                </Responsive>


                <Header size="tiny" style={nobottommargin}>Office Address:</Header>
                <p>
                    Human-Centered Computing Group<br />
                    Room 115<br />
                    Institute of Computer Science, Freie Universit&auml;t Berlin<br />
                    K&ouml;nigin-Luise-Str. 24-26, 14195 Berlin, Germany<br />
                    E-Mail: {'{'}firstname.lastname{'}'}@fu-berlin.de<br />
                    Telephone: +49 30 838-61565<br />
                    Fax: +49 30 838-475233<br />
                </p>

                <p>
                    <strong>Consultation hour</strong>: <i>on demand</i> - just send me an email and we&apos;ll arrange a meeting
                </p>

                <p>
                    <Icon as="i" link={true} size="large" name='hand outline right' />
                    <a href="http://www.mi.fu-berlin.de/en/inf/groups/hcc/theses/open/index.html">Open BSc and MSc theses</a>
                </p>

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
