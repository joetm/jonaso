import React from "react"
import 'semantic-ui-css/semantic.min.css'
import Link from "gatsby-link"
import { Label, Header, Grid, Divider, Image, Container, Icon } from 'semantic-ui-react'

const styles = {
    nobottommargin: {
        marginBottom: 0,
        paddingBottom: 0,
    },
    notopmargin: {
        marginTop: 0,
        paddingTop: 0,
    },
    tag: {
        marginTop: '0.2em',
        marginBottom: '0.2em',
        cursor: 'default',
    },
    nobold: {
        fontWeight: 'normal',
    }
}


class Home extends React.Component {
    render() {
        return (
            <div>
              <Container>

                <Grid>
                  <Grid.Row columns={2}>
                    <Grid.Column>

                      <p>
                        I am <strong>Jonas Oppenlaender</strong>,
                        an Early-Stage Researcher
                        at the Human-Centered Computing group at FU Berlin
                        working towards a PhD in Business Informatics (Information Science).
                      </p>

                      <p>
                        I studied Industrial Engineering in Germany and Sweden
                        and hold a MSc degree in Computer Science
                        from the University of Southampton, UK.
                        <br />
                        Presently, I am in the process of identifying topics and finding a supervisor for my PhD thesis.
                        Two possible topics that particularly interest me are the application of crowdsourcing in order to solve problems in the context of the semantic web
                        and tackling the broader problem of providing better working conditions and fair compensation to crowdworkers.
                      </p>

                      <Header size="tiny" style={{...styles.nobottommargin, ...styles.notopmargin}}>Address</Header>

                      <p>
                          Human-Centered Computing Group, Institute of Computer Science<br />
                          Department of Mathematics and Computer Science, Freie Universit&auml;t Berlin<br />
                          K&ouml;nigin-Luise-Str. 24-26, 14195 Berlin, Germany<br />
                          Room 115<br />
                          E-Mail: {'{'}firstname.lastname{'}'}@fu-berlin.de<br />
                          Telephone: +49 30 838-61565<br />
                          Fax: +49 30 838-475233<br />
                      </p>

                      <p>
                          <strong>Consultation hour</strong>: <i>on demand</i> - just send me an email and we arrange a meeting
                      </p>

                      <p>
                          <Icon as="i" link={true} size="large" name='hand outline right' />
                          <a href="http://www.mi.fu-berlin.de/en/inf/groups/hcc/theses/open/index.html">Open BSc and MSc theses</a>
                      </p>

                      <p>
                          <Icon as="i" link={true} color="grey" size="large" name='hand outline right' />
                          Meet me @ <Link to="CV#conferences">MKWI&apos;18</Link> and (possibly) @ <Link to="CV#conferences">HCOMP&apos;18</Link>
                      </p>

                </Grid.Column>
                <Grid.Column  width={6}>

                  <Image src='static/img/opp_mini.jpg' size='medium' rounded />


                  <Header size="tiny" style={{...styles.nobold, ...styles.nobottommargin}}>My <strong>primary research interests</strong> are:</Header>
                  <p>
                    collaborative ontology engineering,
                    semantic web,
                    linked data,
                    crowdsourcing,
                    human computation,
                    collective intelligence
                  </p>

                  <Header size="tiny" style={{...styles.nobold, ...styles.nobottommargin}}><strong>Further research interests</strong> include:</Header>
                  <p>
                    social machines,
                    knowledge transfer,
                    computer supported collaborative work,
                    e-science,
                    hypertext and hypermedia,
                    online communities
                  </p>

                </Grid.Column>
              </Grid.Row>
            </Grid>

              <Divider />

              <p>

                <a href="https://www.linkedin.com/in/jonasopp/" target="_blank">
                    <Icon title="LinkedIn" link={true} color="grey" size="big" name='linkedin square' />
                </a>

                <a href="https://github.com/joetm" target="_blank">
                    <Icon title="GitHub" link={true} color="grey" size="big" name='github square' />
                </a>

                <a href="https://twitter.com/Duesynapse" target="_blank">
                    <Icon title="Twitter" link={true} color="grey" size="big" name='twitter square' />
                </a>

                <a href="https://www.researchgate.net/profile/Jonas_Oppenlaender" target="_blank">
                    <Icon title="Researchgate" link={true} color="grey" size="big" name='external' />
                </a>

              </p>

              </Container>
            </div>
        )
    }
}

export default Home
