import React from "react"
import { Icon, Header, List, Item, Container, Label } from 'semantic-ui-react'
import Layout from "../components/layout"

import { spacer } from "../common"
import cv from "../cv.json"
// headlines
cv.education[0].left = "Education"
cv.research_experience[0].left = "Research Experience"
cv.work_experience[0].left = "Other Work Experience"
cv.awards[0].left = "Honors & Awards"
cv.academicservice[0].left = "Academic Service"
cv.supervisions[0].left = "Student Supervisions"


const _PORTFOLIO_URL = 'http://www.jonaso.de/portfolio/'
const _PEERREVIEWS_URL = 'https://raw.githubusercontent.com/joetm/jonaso/master/stat_aggregator/peer-reviews.json'


const styles = {
  datum: {
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


const SupervisorWrap = ({supervisor, link}) => {
  if (!supervisor) {
    return null;
  }
  if (link) {
      return (<List.Item>Supervisor: <a href={link}>{supervisor}</a></List.Item>)
  }
  return (<List.Item>Supervisor: {supervisor}</List.Item>)
}


// TODO: ROWSPAN
// {/*style={rowspan ? styles.rowspan2 : null}*/}
const Row = ({left, middle, right}) => ( //rowspan=false
  <div className="row">
    <div className="leftCol">
      <Header style={styles.headline} size="large">{left}</Header>
    </div>
    <div className="mainCol">{middle}</div>
    <div style={styles.rightCol}>{right}</div>
  </div>
)


const PdfCVButton = () => (
  <div style={{float:'right',marginTop:'0.5em'}}>
    <a title="Download cv as pdf" href="/cv/oppenlaender-cv.pdf" target="_blank">
      <Icon size='large' name='file pdf outline' />
    </a>
  </div>
)


class CV extends React.Component {
  state = {
    reviews: {total: 0},
    activeTag: null,
  }
  redirectToPortfolio = () => window.location = _PORTFOLIO_URL
  redirectToPublications = () => window.location = '/publications/'
  componentDidMount() {
    fetch(_PEERREVIEWS_URL)
    .then(response => response.json())
    .then(reviews => this.setState({reviews}))
  }
  handleTagClick = (e) => {
    const activeTag = e.target.innerHTML
    if (activeTag === this.state.activeTag) {
      this.setState({ activeTag: null })
      return
    }
    this.setState({ activeTag })
  }
  startEndYear(row) {
    if (row.hasOwnProperty('year')) {
      return row.year
    }
    return row.end === null ? "since " + row.start : row.start + " - " + row.end
  }
  // countKeywords = () => {
  //   const arrays = [cv.education, cv.research_experience, cv.work_experience]
  //   const keyword_list = arrays.map(arr => arr.map(entry => entry.keywords).reduce((acc, curr) => acc.concat(curr))).reduce((acc, curr) => acc.concat(curr))
  //   console.log(keywords)
  // }
  render() {
    const { activeTag } = this.state
    const startEndYear = this.startEndYear
    const teachingPositions = Object.keys(cv.teaching)

    // const keyword_count = this.countKeywords()

    const peerreviews = {}
    cv['peer-review'].forEach(entry => {
        entry.years.forEach(year => {
            if (peerreviews.hasOwnProperty("" + year)) {
                peerreviews["" + year].push(entry)
            } else {
                peerreviews["" + year] = [entry]
            }
        })
    })
    // add section header to first item
    const key1 = Object.keys(peerreviews).reverse()[0]
    peerreviews[key1].left = "Peer Reviewer"

    return (
      <Layout>
      <Container className="print cv">
        <PdfCVButton />
        <h1 className="print-only">Jonas Oppenlaender</h1>

{/**********************
        CONTACT
***********************/}

<Row left="Contact Information" middle={(
      <Item.Group>
        <Item>
            <Item.Description style={styles.nomarginTop}>
              <List>
                <List.Item><a href="http://ubicomp.oulu.fi/">Center for Ubiquitous Computing</a></List.Item>
                <List.Item><a href="http://www.oulu.fi/university/">University of Oulu</a></List.Item>
                <List.Item>Pentti Kaiteran katu 1</List.Item>
                <List.Item>Room TS370</List.Item>
                <List.Item>90570 Oulu, Finland</List.Item>
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


{/**********************
        INTERESTS
***********************/}

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


{/**********************
        EDUCATION
***********************/}

{
  cv.education.map((row, i) => (
      <Row key={i} left={row.left} middle={(
            <Item.Group>
              <Item>
                <Item.Description style={styles.nomarginTop}>
                  <List>
                    <List.Item><a href={row.institution_link}>{row.institution}</a>, {row.location}</List.Item>
                    <List.Item>{row.position}</List.Item>
                    <SupervisorWrap supervisor={row.supervisor} link={row.supervisor_link} />
                    {/*
                      row.keywords.length > 0 && (
                        <List.Item>
                          <Label.Group>
                          {
                            row.keywords.sort().map(kw => <Label
                                                            key={kw}
                                                            color={activeTag === kw ? 'olive': null}
                                                            size='mini'
                                                            onClick={this.handleTagClick}
                                                            as='a'>{kw}</Label>)
                          }
                          </Label.Group>
                        </List.Item>
                      )
                    */}
                  </List>
                </Item.Description>
              </Item>
            </Item.Group>
      )} right={startEndYear(row)} />
    ))
}


{/**********************
  Research EXPERIENCE
***********************/}

{
  cv.research_experience.map((row, i) => (
    <Row key={i} left={row.left} middle={(
          <Item.Group>
            <Item>
              <Item.Description style={styles.nomarginTop}>
                <List>
                  {
                    row.group &&
                      <List.Item><a href={row.group_link}>{row.group}</a></List.Item>
                  }
                  {
                    row.institute &&
                      <List.Item><a href={row.institute_link}>{row.institute}</a></List.Item>
                  }
                  {
                    row.university &&
                      <List.Item><a href={row.university_link}>{row.university}</a>, {row.location}</List.Item>
                  }
                  <List.Item>{row.position}</List.Item>
                  {/*
                    row.supervisor &&
                      <List.Item>Supervisor: <a href={row.supervisor_link}>{row.supervisor}</a></List.Item>
                  */}
                  {/*
                    row.keywords.length > 0 && (
                      <List.Item>
                        <Label.Group>
                        {
                          row.keywords.sort().map(kw => <Label
                                                          key={kw}
                                                          color={activeTag === kw ? 'olive': null}
                                                          size='mini'
                                                          onClick={this.handleTagClick}
                                                          as='a'>{kw}</Label>)
                        }
                        </Label.Group>
                      </List.Item>
                    )
                  */}
                </List>
              </Item.Description>
            </Item>
          </Item.Group>
    )} right={startEndYear(row)} />
  ))
}


{/**********************
     WORK EXPERIENCE
***********************/}

{
  cv.work_experience.map((row, i) => (
    <Row key={i} left={row.left} middle={(
          <Item.Group>
            <Item>
              <Item.Description style={styles.nomarginTop}>
                <List>
                  <List.Item><a href={row.organization_link}>{row.organization}</a>, {row.location}</List.Item>
                  <List.Item>{row.position}</List.Item>
                  {/*
                    row.keywords.length > 0 && (
                      <List.Item>
                        <Label.Group>
                        {
                          row.keywords.sort().map(kw => <Label
                                                          key={kw}
                                                          color={activeTag === kw ? 'olive': null}
                                                          size='mini'
                                                          onClick={this.handleTagClick}
                                                          as='a'>{kw}</Label>)
                        }
                        </Label.Group>
                      </List.Item>
                    )
                  */}
                </List>
              </Item.Description>
            </Item>
          </Item.Group>
    )} right={startEndYear(row)} />
  ))
}


{/**********************
      PUBLICATIONS
***********************/}

<Row left="Publications" middle={(
      <button onClick={this.redirectToPublications}>&rarr; &nbsp; See Publications</button>
)} right="" />



{/**********************
         AWARDS
***********************/}

{
  cv.awards.map((row, i) => (
    <Row key={i} left={row.left} middle={(
          <Item.Group>
            <Item>
              <List>
                <List.Item>
                  {row.name}
                  {
                    row.event && row.institution &&
                        <span> ({row.event})</span>
                  }
                  {
                    (row.institution && row.url) ?
                      <span>, <a href={row.url}>{row.institution}</a></span>
                      :
                      <span>{row.institution}</span>
                  }
                  {
                    row.event && row.url && !row.institution &&
                        <span>, <a href={row.url}>{row.event}</a></span>
                  }
                  {
                    row.event && !row.url && !row.institution &&
                        <span>, {row.event}</span>
                  }
                </List.Item>
              </List>
            </Item>
          </Item.Group>
    )} right={row.year} />
  ))
}

{/**********************
    Technical Skills
***********************/}

<Row left="Technical Skills" middle={(
    <button onClick={this.redirectToPortfolio}>&rarr; &nbsp; Visit my Web Development Portfolio</button>
)} right="" />



{/**********************
        TEACHING
***********************/}

<Row left="Teaching Experience" middle={(
      <Item.Group>
        {
          teachingPositions.map((pos, index) => {
            return (
              <Item key={index}>
                <List>
                  <List.Item>{pos}</List.Item>
                  {
                    cv.teaching[pos].map((row, i) => (
                          <List.Item style={{paddingLeft:'20px'}} key={i}>
                            {row.course}{row.coursecode && " (" + row.coursecode + ")"}, {row.institution}<br />
                            ({row.num_students && row.num_students +  " students, "} {row.ECTS && row.ECTS + " ECTS, "} {row.level} level)
                          </List.Item>
                    ))
                  }
                </List>
              </Item>
            )
          })
        }
      </Item.Group>
)} right="" />


{/**********************
    ACADEMIC SERVICE
***********************/}

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


{/**********************
      PEER REVIEW
***********************/}

{/*
<Row left="Peer Reviewer" middle={(
      <Item.Group>
        <Item>
          <List>
            <List.Item>
              {
                Object.keys(peerreviews).map(year => peerreviews[year].map((item, i) => (
                  <div key={item.series + i}><a href={item.url} title={item.title}>{item.series} {item.years.join(", ")}</a></div>
                )))
              }
            </List.Item>
          </List>
        </Item>
      </Item.Group>
)} right="" />
*/}

{
    Object.keys(peerreviews).reverse().map(year => (
        <Row key={`pr${year}`} left={peerreviews[year].left} middle={(
          <Item.Group>
            <Item>
              <List>
                <List.Item>
                  {
                    peerreviews[year].map((item, i) => (
                       <a key={item.series + i} href={item.url} title={item.title}>{item.series}</a>
                    )).reduce((prev, next) => [prev, ', ', next])
                  }
                </List.Item>
              </List>
            </Item>
          </Item.Group>
        )} right={year} />
    ))
}



{/**********************
      CERTIFICATES
***********************/}

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


{/**********************
      SUPERVISIONS
***********************/}

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


{/**********************
      ASSOCIATIONS
***********************/}

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


{/**********************
        LANGUAGES
***********************/}

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
        </Layout>
        )
  }
}

export default CV
