import React from "react"
import { Grid, Icon, List, Segment, Item, Container } from 'semantic-ui-react'
import Layout from "../components/layout"
import { Seo } from "../components/Seo"

import { spacer } from "../common"
import cv from "../cv.json"
// headlines
cv.education[0].left = "Education"
cv.research_experience[0].left = "Research Experience"
cv.work_experience[0].left = "Professional Experience"
cv.awards[0].left = "Recognition & Awards" // Honors & Awards
cv.grants[0].left = "Scholarships & Grants"
cv.academicservice[0].left = "Academic Service"
cv.supervisions[0].left = "Student Supervisions"
cv.teaching[0].left = "Teaching"


const _PORTFOLIO_URL = 'https://www.jonaso.de/portfolio/'
const _PEERREVIEWS_URL = 'https://raw.githubusercontent.com/joetm/jonaso/master/stat_aggregator/peer-reviews.json'


const styles = {
  nonbold: {
    fontWeight: 'normal',
    fontSize: '1em',
  },
  headline: {
    fontWeight: 'normal',
    textTransform: 'uppercase',
    fontSize: '1em',
    display: 'inline',
  },
  nomarginTop: {
    marginTop: 0,
  },
  nomargin: {
    margin: 0,
  },
}


export function Head() {
  return (
    <Seo title="CV // jonaso.de">
      <link id="canonical" rel="canonical" href="https://www.jonaso.de/cv" />
    </Seo>
  )
} //


const SupervisorWrap = ({supervisor, link = false}) => {
  if (!supervisor) {
    return null;
  }
  if (link) {
      return (<List.Item>Advisor: <a href={link}>{supervisor}</a></List.Item>)
  }
  return (<List.Item>Advisor: {supervisor}</List.Item>)
} //


const Row = ({left, middle, right, stretched = true}) => {
	return (
    <Segment>
    <Grid>
      <Grid.Column
        mobile={16}
        tablet={3}
        computer={4}
        stretched={stretched}
      >
        <span style={styles.headline} size="large">{left}</span>
      </Grid.Column>
      <Grid.Column
        mobile={16}
        tablet={10}
        computer={10}
        stretched={stretched}
      >
        {middle}
      </Grid.Column>
      <Grid.Column
        mobile={16}
        tablet={3}
        computer={2}
        stretched={stretched}
      >
        {right}
      </Grid.Column>
    </Grid>
    </Segment>
	)
} //


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
    // activeTag: null,
    // isHovered: false, 
  }
  // setIsHovered = (isHovered) => {
  // 	console.info('isHovered', isHovered)
  // 	this.setState({isHovered})
  // }
  redirectToPortfolio = () => window.location = _PORTFOLIO_URL
  redirectToPublications = () => window.location = '/publications/'
  redirectToInterests = () => window.location = '/interests/'
  componentDidMount() {
    fetch(_PEERREVIEWS_URL)
    .then(response => response.json())
    .then(reviews => this.setState({reviews}))
  }
  // handleTagClick = (e) => {
    // const activeTag = e.target.innerHTML
    // if (activeTag === this.state.activeTag) {
    //   this.setState({ activeTag: null })
    //   return
    // }
  //   this.setState({ activeTag })
  // }
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
    // const { activeTag, isHovered } = this.state
    const { reviews } = this.state
    const startEndYear = this.startEndYear
    // const teachingPositions = Object.keys(cv.teaching)

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
    // const key1 = Object.keys(peerreviews).reverse()[0]
    // peerreviews[key1].left = "Peer Reviewer"

    return (
      <Layout>
      <Container className="print cv">
        <PdfCVButton />
        <h1 className="print-only">Jonas Oppenlaender</h1>

{/**********************
        CONTACT
***********************/}
    <Segment>
      <Grid columns={2} stackable>
      <Grid.Row>
        <Grid.Column
          mobile={16}
          tablet={3}
          computer={4}
          stretched
        >
            <span style={styles.headline} size="large">Contact Information</span>
        </Grid.Column>
        <Grid.Column
          mobile={16}
          tablet={13}
          computer={12}
          stretched
        >
          <Item.Group>
            <Item style={styles.nomargin}>
                <Item.Description style={styles.nomarginTop}>
                  <List>
                    <List.Item><a href="https://www.jyu.fi/">University of Jyv&auml;skyl&auml;</a></List.Item>
                    <List.Item>Seminaarinkatu 15</List.Item>
                    <List.Item>40014 Jyväskylän yliopisto</List.Item>
                    <List.Item>Finland</List.Item>
                  </List>
                  <List>
                    <List.Item>E-Mail: {/*'{'}firstname.lastname{'}'*/} jonas.x1.oppenlander@jyu.fi</List.Item>
                    <List.Item><a href="https://www.jonaso.de/">www.jonaso.de</a></List.Item>
                  </List>
                </Item.Description>
            </Item>
          </Item.Group>
        </Grid.Column>
      </Grid.Row>
      </Grid>
    </Segment>


{/**********************
        INTERESTS
***********************/}

<Row left="Research Interests" middle={(
      <button onClick={this.redirectToInterests}>&rarr; &nbsp; See Interests</button>
)}
  right=""
  stretched={false}
/>


{/**********************
        EDUCATION
***********************/}

{
  cv.education.map((row, i) => (
      <Row key={i} left={row.left} middle={(
            <Item.Group>
              <Item style={styles.nomargin}>
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
    <Row key={i} left={row.left}
        middle={(
          <Item.Group>
            <Item style={styles.nomargin}>
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
                  {
                    row.double_affiliation &&
                    (
                      <React.Fragment>
                        <List.Item>&amp; <a href={row.double_affiliation.group_link}>{row.double_affiliation.group}</a></List.Item>
                        <List.Item><a href={row.double_affiliation.university_link}>{row.double_affiliation.university}</a>, {row.location}</List.Item>
                        <List.Item>{row.double_affiliation.position}</List.Item>
                      </React.Fragment>
                    )
                  }
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
            <Item style={styles.nomargin}>
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
)}
  right=""
  stretched={false}
 />



{/**********************
         AWARDS
***********************/}

{
  cv.awards.map((row, i) => (
    <Row key={i} left={row.left} middle={(
          <Item.Group>
            <Item style={styles.nomargin}>
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
                      <span>, {row.institution}</span>
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
         GRANTS
***********************/}

{
  cv.grants.map((row, i) => (
    <Row key={i} left={row.left} middle={(
          <Item.Group>
            <Item style={styles.nomargin}>
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
                      <span>, {row.institution}</span>
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
    ACADEMIC SERVICE
***********************/}

{
    cv.academicservice.map((row, i) => (
        <Row key={i} left={row.left} middle={(
          <Item.Group>
            <Item style={styles.nomargin}>
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
        <Item style={styles.nomargin}>
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

        <Row key="pr-header" left="Peer Reviewer" middle={(
          <Item.Group>
            <Item style={styles.nomargin}>
              <List>
                <List.Item>
                  {reviews.total} reviews in PCS
                </List.Item>
              </List>
            </Item>
          </Item.Group>
        )} right={""} />

{
    Object.keys(peerreviews).reverse().map(year => (
        <Row key={`pr${year}`} left={peerreviews[year].left} middle={(
          <Item.Group>
            <Item style={styles.nomargin}>
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
        TEACHING
***********************/}

{/*
<Row left="Teaching Experience" middle={(
      <Item.Group>
        {
          teachingPositions.map((pos, index) => {
            return (
              <Item key={index} style={styles.nomargin}>
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
*/}

{
    cv.teaching.map((row, i) => (
        <Row key={i} left={row.left} middle={(
          <Item.Group>
            <Item style={styles.nomargin}>
              <List>
                <List.Item>
                  {row.coursename}{row.coursecode && <> ({row.coursecode})</>}{row.period && ", " + row.period}, {row.num_students} students, {row.level}<br />
                  {
                    row.url ? <a href={row.url}>{row.organization}</a> : row.organization
                  }
                  {row.location && ", " + row.location}
                </List.Item>
              </List>
            </Item>
          </Item.Group>
        )} right={row.year} />
    ))
}

{/**********************
      SUPERVISIONS
***********************/}

{
    cv.supervisions.map((row, i) => (
        <Row key={i} left={row.left} middle={(
          <Item.Group>
            <Item style={styles.nomargin}>
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
    Technical Skills
***********************/}

<Row left="Technical Skills" middle={(
    <button onClick={this.redirectToPortfolio}>&rarr; &nbsp; Visit my Web Development Portfolio</button>
)}
  right=""
  stretched={false}
 />



{/**********************
      CERTIFICATES
***********************/}

<Row left="Certificates" middle={(
      <Item.Group>
        {
          cv.hasOwnProperty("certificates") &&
            cv.certificates.map((item, i) => (
              <Item key={i} style={styles.nomargin}>
                {/*<div style={styles.datum}>{item.year}</div>*/}
                <Item.Header style={styles.nonbold}>{item.name} ({item.institution})</Item.Header>
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
              <Item key={i} style={styles.nomargin}>
                <Item.Content>
                  <Item.Header style={styles.nonbold}>{item.name} ({item.level})</Item.Header>
                </Item.Content>
              </Item>
            ))
        }
      </Item.Group>
)} right="" />


{/**********************
      ASSOCIATIONS
***********************/}

<Row left="Memberships in Scientific Associations" middle={(
      <Item.Group>
        {
          cv.hasOwnProperty("associations") &&
            cv.associations.map((item, i) => (
              <Item key={i} style={styles.nomargin}>
                <Item.Content>
                  <Item.Header style={styles.nonbold}>{item}</Item.Header>
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
