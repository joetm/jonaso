import React from "react"
import Link from "gatsby-link"
import { Icon, Label, Header, Divider, List, Item, Image, Container } from 'semantic-ui-react'

import { spacer } from "../common"
import cv from "../cv.json"
// headlines
cv.teaching[0].left = "Teaching Experience"
cv.awards[0].left = "Honors & Awards"
cv.academicservice[0].left = "Academic Service"
cv.supervisions[0].left = "Student Supervisions"

const _PORTFOLIO_URL = 'http://www.jonaso.de/portfolio/'


const styles = {
  datum: {
    // paddingRight: '2em',
    minWidth: '200px',
  },
  nonbold: {
    fontWeight: 'normal',
    fontSize: '1em',
  },
  headline: {
  	maxWidth: '180px',
  	fontWeight: 'normal',
  	textTransform: 'uppercase',
  	fontSize: '1em',
  },
  rowspan2: {
   flex: 4,
   textAlign: 'left',
  },
  table: {
    display: 'flex',
  },
  rightCol: {
    flex: 1,
    verticalAlign: 'top',
    textAlign: 'right',
  },
  nomarginTop: {
  	marginTop: 0,
  },
}


// TODO: ROWSPAN
const Row = ({left, middle, right}) => ( //rowspan=false
  <div className="row">
    <div className="leftCol">
      <Header id="peer-review" style={styles.headline} size="large">{left}</Header>
    </div>
    <div className="mainCol">{middle}</div>
    <div style={styles.rightCol}>{right}</div>
  </div>
)
// {/*style={rowspan ? styles.rowspan2 : null}*/}



class CV extends React.Component {
  redirectToPortfolio = () => {
    window.location = _PORTFOLIO_URL
  }
  redirectToPublications = () => {
    window.location = '/publications/'
  }
  render() {
    return (
      <Container className="print cv">
        <h1 className="print-only">Jonas Oppenlaender</h1>

<Row left="Contact Information" middle={(
      <Item.Group>
        <Item>
            <Item.Description style={styles.nomarginTop}>
              <List>
                <List.Item><a href="http://ubicomp.oulu.fi/">Center for Ubiquitous Computing</a></List.Item>
                <List.Item><a href="http://www.oulu.fi/university/">University of Oulu</a></List.Item>
                <List.Item>Erkki Koiso-Kanttilan katu 3</List.Item>
                <List.Item>Room TS371</List.Item>
                <List.Item>P.O. Box 4500</List.Item>
                <List.Item>90014 Oulu, Finland</List.Item>
              </List>
            </Item.Description>
        </Item>
      </Item.Group>
)} right={(
      <Item.Group>
        <Item>
            <Item.Description style={styles.nomarginTop}>
              <List>
                <List.Item>E-Mail: {'{'}firstname.lastname{'}'}@oulu.fi</List.Item>
                <List.Item>www: jonaso.de</List.Item>
              </List>
            </Item.Description>
        </Item>
      </Item.Group>
)} />

<Row left="Research Interests" middle={(
      <Item.Group>
        <Item>
            <Item.Description style={styles.nomarginTop}>
              <List>
                <List.Item>
                  { cv.interests.join(", ") }
                </List.Item>
              </List>
            </Item.Description>
        </Item>
      </Item.Group>
)} right="" rowspan={2} />


<div className="row">
  <div className="leftCol">
                <Header id="education" style={styles.headline} size="large">Education</Header>
  </div>
  <div className="mainCol">
                  <Item.Group>
                    <Item>
                        <Item.Description style={styles.nomarginTop}>
                          <List>
                            <List.Item><a href="http://www.oulu.fi/university/">University of Oulu</a>, Oulu, Finland</List.Item>
                            <List.Item>Doctoral Student</List.Item>
                            <List.Item>Supervisor: <a href="http://simohosio.com/">Adjunct Prof. Dr. Simo Hosio</a></List.Item>
                          </List>
                        </Item.Description>
                    </Item>
                  </Item.Group>
  </div>
  <div style={styles.rightCol}>since 2018</div>
</div>
<div className="row">
  <div className="leftCol"></div>
  <div className="mainCol">
                  <Item.Group>
                    <Item>
                        <Item.Description>
                          <List>
                            <List.Item><a href="https://www.southampton.ac.uk/">University of Southampton</a>, Southampton, United Kingdom</List.Item>
                            <List.Item>M.Sc. Computer Science</List.Item>
                            <List.Item>Supervisor: <a href="https://www.ecs.soton.ac.uk/people/tt2">Dr. Thanassis Tiropanis</a></List.Item>
                          </List>
                        </Item.Description>
                    </Item>
                  </Item.Group>
  </div>
  <div style={styles.rightCol}>2014 - 2015</div>
</div>
<div className="row">
  <div className="leftCol"></div>
  <div className="mainCol">
                  <Item.Group>
                    <Item>
                        <Item.Description>
                          <List>
                            <List.Item><a href="https://learn.utoronto.ca/">School of Continuing Studies</a>,{' '}
                            <a href="https://www.utoronto.ca/">University of Toronto</a></List.Item>
                            <List.Item>Certificate in Business Analysis</List.Item>
                          </List>
                        </Item.Description>
                    </Item>
                  </Item.Group>
  </div>
  <div style={styles.rightCol}>2013</div>
</div>
<div className="row">
  <div className="leftCol"></div>
  <div className="mainCol">
                  <Item.Group>
                    <Item>
                        <Item.Description>
                          <List>
                            <List.Item><a href="https://www.tu-darmstadt.de/">Technical University of Darmstadt</a>, Darmstadt, Germany</List.Item>
                            <List.Item><i>Diplom-Wirtschaftsingenieur</i> (equivalent to a M.Sc. degree in Industrial Engineering)</List.Item>
                            <List.Item>Supervisor: Dr.-Ing. Dirk Hanusch</List.Item>
                          </List>
                        </Item.Description>
                    </Item>
                  </Item.Group>
  </div>
  <div style={styles.rightCol}>2002 - 2011</div>
</div>
<div className="row">
  <div className="leftCol"></div>
  <div className="mainCol">
                  <Item.Group>
                    <Item>
                        <Item.Description>
                          <List>
                            <List.Item><a href="http://www.gad-vs.de/">Gymnasium am Deutenberg</a>, Villingen-Schwenningen, Germany</List.Item>
                            <List.Item>University Entrance Qualification (<i>Abitur</i>)</List.Item>
                            <List.Item>Majors: English, Arts</List.Item>
                          </List>
                        </Item.Description>
                    </Item>
                  </Item.Group>
  </div>
  <div style={styles.rightCol}>2000</div>
</div>


<div className="row">
  <div className="leftCol">
                <Header id="research-exerience" style={styles.headline} size="large">Research Experience</Header>
  </div>
  <div className="mainCol">
                  <Item.Group>

                    <Item>
                        <Item.Description style={styles.nomarginTop}>
                          <List>
                            <List.Item><a href="http://www.mi.fu-berlin.de/en/inf/groups/hcc/">Human-Centered Computing Group</a>, Institute of Computer Science</List.Item>
                            <List.Item><a href="http://www.fu-berlin.de/">Freie Universit&auml;t Berlin</a>, Berlin, Germany</List.Item>
                            <List.Item>Research Assistant</List.Item>
                          </List>
                        </Item.Description>
                    </Item>
                  </Item.Group>
  </div>
  <div style={styles.rightCol}>2016 - 2018</div>
</div>
<div className="row">
  <div className="leftCol"></div>
  <div className="mainCol">
                  <Item.Group>

                    <Item>
                        <Item.Description style={styles.nomarginTop}>
                          <List>
                            <List.Item><a href="https://www.interdisciplinary-laboratory.hu-berlin.de/en/content/jonas-oppenlander/">Cluster of Excellence "Image Knowledge Gestaltung"</a></List.Item>
                            <List.Item><a href="https://www.hu-berlin.de/">Humboldt University of Berlin</a>, Berlin, Germany</List.Item>
                            <List.Item>Scientific Staff</List.Item>
                          </List>
                        </Item.Description>
                    </Item>
                  </Item.Group>
  </div>
  <div style={styles.rightCol}>2016 - 2017</div>
</div>
<div className="row">
  <div className="leftCol"></div>
  <div className="mainCol">
                  <Item.Group>
                    <Item>
                        <Item.Description>
                          <List>
                            <List.Item><a href="http://www.seme4.com/">Seme 4 Ltd.</a>, Southampton, United Kingdom</List.Item>
                            <List.Item>Data Scientist and Web Developer</List.Item>
                            <List.Item>Supervisors: <a href="http://www.seme4.com/team/ian-millard/">Dr. Ian Millard</a>, <a href="http://www.seme4.com/team/hugh-glaser/">Dr. Hugh Glaser</a></List.Item>
                          </List>
                        </Item.Description>
                    </Item>
                  </Item.Group>
  </div>
  <div style={styles.rightCol}>2015 - 2016</div>
</div>
<div className="row">
  <div className="leftCol"></div>
  <div className="mainCol">
                  <Item.Group>
                    <Item>
                        <Item.Description>
                          <List>
                            <List.Item><a href="https://liu.se/">Link&ouml;ping University</a>, Link&ouml;ping, Sweden</List.Item>
                            <List.Item>Graduate exchange student (two semesters)</List.Item>
                          </List>
                        </Item.Description>
                    </Item>
                  </Item.Group>
  </div>
  <div style={styles.rightCol}>2005 - 2006</div>
</div>

<div className="row">
  <div className="leftCol">
                <Header id="other-exerience" style={styles.headline} size="large">Other Work Experience</Header>
  </div>
  <div className="mainCol">

                  <Item.Group>

                    <Item>
                        <Item.Description style={styles.nomarginTop}>
                          <List>
                            <List.Item><a href="https://www.liip.ch/">Liip AG</a>, Bern, Switzerland</List.Item>
                            <List.Item>Full-Stack Web Developer</List.Item>
                          </List>
                        </Item.Description>
                    </Item>
                  </Item.Group>
  </div>
  <div style={styles.rightCol}>2016</div>
</div>
<div className="row">
  <div className="leftCol"></div>
  <div className="mainCol">
                  <Item.Group>
                    <Item>
                        <Item.Description>
                          <List>
                            <List.Item><a href="http://www.alstom.com/">Alstom IS&amp;T</a>, La Défense, Paris, France</List.Item>
                            <List.Item>IT Business Analyst</List.Item>
                          </List>
                        </Item.Description>
                    </Item>
                  </Item.Group>
  </div>
  <div style={styles.rightCol}>2014 - 2015</div>
</div>
<div className="row">
  <div className="leftCol"></div>
  <div className="mainCol">
                  <Item.Group>
                    <Item>
                        <Item.Description>
                          <List>
                            <List.Item><a href="https://www.gepower.com/steam">Alstom Power</a>, Baden, Switzerland</List.Item>
                            <List.Item>Strategy Analyst (Trainee)</List.Item>
                          </List>
                        </Item.Description>
                    </Item>
                  </Item.Group>
  </div>
  <div style={styles.rightCol}>2011 - 2012</div>
</div>
<div className="row">
  <div className="leftCol"></div>
  <div className="mainCol">
                  <Item.Group>
                    <Item>
                        <Item.Description>
                          <List>
                            <List.Item><a href="http://www.jonaso.de/portfolio/">Freelance Web Developer</a>, Darmstadt, Germany</List.Item>
                            <List.Item>Full-Stack Web Developer</List.Item>
                          </List>
                        </Item.Description>
                    </Item>
                  </Item.Group>
  </div>
  <div style={styles.rightCol}>2006 - 2013</div>
</div>
<div className="row">
  <div className="leftCol"></div>
  <div className="mainCol">
                  <Item.Group>
                    <Item>
                        <Item.Description>
                          <List>
                            <List.Item><a href="http://radovis.gov.mk/">Radoviš Municipality</a>, Radoviš, Macedonia</List.Item>
                            <List.Item>Volunteer at Local Economic Development Department</List.Item>
                          </List>
                        </Item.Description>
                    </Item>
                  </Item.Group>
  </div>
  <div style={styles.rightCol}>2010</div>
</div>
<div className="row">
  <div className="leftCol"></div>
  <div className="mainCol">
                  <Item.Group>
                    <Item>
                        <Item.Description>
                          <List>
                            <List.Item><a href="https://en.wikipedia.org/wiki/Franco-German_Brigade">Franco-German Brigade</a>, Donaueschingen, Germany</List.Item>
                            <List.Item>Military service in 292nd Light Infantry Battalion</List.Item>
                          </List>
                        </Item.Description>
                    </Item>

                  </Item.Group>
  </div>
  <div style={styles.rightCol}>2000 - 2002</div>
</div>


<Row left="Publications" middle={(
      <a href="javascript:void();" onClick={this.redirectToPublications}>&rarr; &nbsp; See Publications</a>
)} right="" />


{
  cv.awards.map((row, i) => (
    <Row key={i} left={row.left} middle={(
          <Item.Group>
            <Item>
              <List>
                <List.Item>{row.name}, {row.institution}</List.Item>
              </List>
            </Item>
          </Item.Group>
    )} right={row.year} />
  ))
}

<Row left="Technical Skills" middle={(
    <a href="javascript:void();" onClick={this.redirectToPortfolio}>&rarr; &nbsp; Visit my Web Development Portfolio</a>
)} right="" />


{
    cv.teaching.map((row, i) => (
        <Row key={i} left={row.left} middle={(
              <Item.Group>
                <Item>
                  <List>
                    <List.Item>
                      {row.position}, {row.course}{row.coursecode && " (" + row.coursecode + ")"}, {row.institution}<br />
                      ({row.num_students && row.num_students +  " students, "} {row.ECTS && row.ECTS + " ECTS, "} {row.level} level)
                    </List.Item>
                  </List>
                </Item>
              </Item.Group>
        )} right={row.year} />
    ))
}


{
    cv.academicservice.map((row, i) => (
        <Row key={i} left={row.left} middle={(
          <Item.Group>
            <Item>
              <List>
                <List.Item>
                  {row.name}, <a href={row.url}>{row.venue}{row.series && " (" + row.series + ")"}</a>{row.location && ", " + row.location}
                </List.Item>
              </List>
            </Item>
          </Item.Group>
        )} right={row.year} />
    ))
}


<Row left="Reviewer Experience" middle={(
      <Item.Group>
        <Item>
              <List>
                <List.Item>
                {
                  cv.hasOwnProperty("peer-review") &&
                    cv['peer-review'].map((item, i) => (
                      <div key={item.series + i}><a href={item.url} title={item.title}>{item.series} {item.years.join(", ")}</a></div>
                    ))
                }
                </List.Item>
              </List>
        </Item>
      </Item.Group>
)} right="" />


<Row left="Certificates" middle={(
      <Item.Group>
        {
          cv.hasOwnProperty("certificates") &&
            cv.certificates.map((item, i) => (
              <Item key={i}>
                {/*<div style={styles.datum}>{item.year}</div>*/}
                <Item.Header style={styles.nonbold}>{item.name} ({item.institution})</Item.Header>
              </Item>
            ))
        }
      </Item.Group>
)} right="" />



{
    cv.supervisions.map((row, i) => (
        <Row key={i} left={row.left} middle={(
          <Item.Group>
            <Item>
              <List>
                <List.Item>
                  {row.type}, {row.supervisee}
                </List.Item>
              </List>
            </Item>
          </Item.Group>
        )} right={row.year} />
    ))
}


<Row left="Memberships in Scientific Associations" middle={(
      <Item.Group>
        {
          cv.hasOwnProperty("associations") &&
            cv.associations.map((item, i) => (
              <Item key={i}>
                <Item.Content>
                  <Item.Header style={styles.nonbold}>{item}</Item.Header>
                </Item.Content>
              </Item>
            ))
        }
      </Item.Group>
)} right="" />


<Row left="Languages" middle={(
      <Item.Group>
        {
          cv.hasOwnProperty("languages") &&
            cv.languages.map((item, i) => (
              <Item key={i}>
                <Item.Content>
                  <Item.Header style={styles.nonbold}>{item.name} ({item.level})</Item.Header>
                </Item.Content>
              </Item>
            ))
        }
      </Item.Group>
)} right="" />

                  <div className="spacer" style={spacer}></div>

              </Container>
        )
  }
}

export default CV
