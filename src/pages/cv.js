import 'semantic-ui-css/components/grid.min.css'
import 'semantic-ui-css/components/icon.min.css'
import 'semantic-ui-css/components/item.min.css'

import React from "react"
import Layout from "../components/layout"
import { Seo } from "../components/Seo"
import { navigate } from "gatsby"
import { spacer } from "../common"

import cv from "../cv.json"

// headlines
cv.education[0].left = "Education"
cv.research_experience[0].left = "Research Experience"
cv.work_experience[0].left = "Professional Experience"
cv.awards[0].left = "Recognition & Awards" // Honors & Awards
cv.grants[0].left = "Scholarships & Grants"
cv.academicservice[0].left = "Academic Service"
cv.studentvolunteering[0].left = "Student Volunteering"
cv.supervisions[0].left = "Student Supervisions"
cv.teaching[0].left = "Teaching"


const _PORTFOLIO_URL = '/portfolio/'
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
      return (<div className="item" role="listitem">Advisor: <a href={link}>{supervisor}</a></div>)
  }
  return (<div className="item" role="listitem">Advisor: {supervisor}</div>)
} //


const Left = ({content}) => (
  <div className="four wide computer sixteen wide mobile three wide tablet column">
    <span style={styles.headline} size="large">{content}</span>
  </div>
) //
const Right = ({content}) => (
  <div className="stretched two wide computer sixteen wide mobile three wide tablet column">
    {content}
  </div>
) //
const Center = ({content}) => (
  <div className="stretched ten wide computer sixteen wide mobile ten wide tablet column">
    {content}
  </div>
) //


const Row = ({left, middle, right, stretched = true}) => {
	return (
    <div className="ui clearing">
      <div className="ui mobile vertically reversed three column grid">
        <Left content={left} />
        <Center content={middle} />
        <Right content={right} />
      </div>
    </div>
	)
} //


const PdfCVButton = () => (
  <div style={{float:'right',marginTop:'0.5em'}}>
    <a title="Download cv as pdf" href="/cv/oppenlaender-cv.pdf" target="_blank">
      <i aria-hidden="true" className="file pdf outline large icon"></i>
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
  redirectToPublications = () => navigate("/publications") // window.location = '/publications/'
  redirectToInterests = () => navigate("/research/interests") // window.location = '/research/interests/'
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
      <div className="ui container print cv">
        <PdfCVButton />
        <h1 className="print-only">Jonas Oppenlaender</h1>

{/**********************
        CONTACT
***********************/}
    <div className="ui segment">
      <div className="ui stackable two column grid">
        <div className="row">
          <div className="stretched four wide computer sixteen wide mobile three wide tablet column">
              <span style={styles.headline} size="large">Contact Information</span>
          </div>
          <div className="stretched twelve wide computer sixteen wide mobile thirteen wide tablet column">
            <div className="ui items">
              <div className="item" style={styles.nomargin}>
                  <div className="description" style={styles.nomarginTop}>
                    <div className="ui list" role="list">
                      <div className="item" role="listitem"><a href="https://www.jyu.fi/">University of Jyv&auml;skyl&auml;</a></div>
                      <div className="item" role="listitem">Seminaarinkatu 15</div>
                      <div className="item" role="listitem">40014 Jyväskylän yliopisto</div>
                      <div className="item" role="listitem">Finland</div>
                    </div>
                    <div className="ui list" role="list">
                      <div className="item" role="listitem">E-Mail: {/*'{'}firstname.lastname{'}'*/} jonas.x1.oppenlander@jyu.fi</div>
                      <div className="item" role="listitem"><a href="https://www.jonaso.de/">www.jonaso.de</a></div>
                    </div>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>


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
            <div className="ui items">
              <div className="item" style={styles.nomargin}>
                <div className="description" style={styles.nomarginTop}>
                  <div className="ui list" role="list">
                    <div className="item" role="listitem"><a href={row.institution_link}>{row.institution}</a>, {row.location}</div>
                    <div className="item" role="listitem">{row.position}</div>
                    <SupervisorWrap supervisor={row.supervisor} link={row.supervisor_link} />
                    {/*
                      row.keywords.length > 0 && (
                        <div className="item" role="listitem">
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
                        </div>
                      )
                    */}
                  </div>
                </div>
              </div>
            </div>
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
          <div className="ui items">
            <div className="item" style={styles.nomargin}>
              <div className="description" style={styles.nomarginTop}>
                <div className="ui list" role="list">
                  {
                    row.group &&
                      <div className="item" role="listitem"><a href={row.group_link}>{row.group}</a></div>
                  }
                  {
                    row.institute &&
                      <div className="item" role="listitem"><a href={row.institute_link}>{row.institute}</a></div>
                  }
                  {
                    row.university &&
                      <div className="item" role="listitem"><a href={row.university_link}>{row.university}</a>, {row.location}</div>
                  }
                  <div className="item" role="listitem">{row.position}</div>
                  {
                    row.double_affiliation &&
                    (
                      <React.Fragment>
                        <div className="item" role="listitem">&amp; <a href={row.double_affiliation.group_link}>{row.double_affiliation.group}</a></div>
                        <div className="item" role="listitem"><a href={row.double_affiliation.university_link}>{row.double_affiliation.university}</a>, {row.location}</div>
                        <div className="item" role="listitem">{row.double_affiliation.position}</div>
                      </React.Fragment>
                    )
                  }
                  {/*
                    row.keywords.length > 0 && (
                      <div className="item" role="listitem">
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
                      </div>
                    )
                  */}
                </div>
              </div>
            </div>
          </div>
    )} right={startEndYear(row)} />
  ))
}


{/**********************
     WORK EXPERIENCE
***********************/}

{
  cv.work_experience.map((row, i) => (
    <Row key={i} left={row.left} middle={(
          <div className="ui items">
            <div className="item" style={styles.nomargin}>
              <div className="description" style={styles.nomarginTop}>
                <div className="ui list" role="list">
                  <div className="item" role="listitem"><a href={row.organization_link}>{row.organization}</a>, {row.location}</div>
                  <div className="item" role="listitem">{row.position}</div>
                  {/*
                    row.keywords.length > 0 && (
                      <div className="item" role="listitem">
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
                      </div>
                    )
                  */}
                </div>
              </div>
            </div>
          </div>
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
          <div className="ui items">
            <div className="item" style={styles.nomargin}>
              <div className="ui list" role="list">
                <div className="item" role="listitem">
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
                </div>
              </div>
            </div>
          </div>
    )} right={row.year} />
  ))
}

{/**********************
         GRANTS
***********************/}

{
  cv.grants.map((row, i) => (
    <Row key={i} left={row.left} middle={(
          <div className="ui items">
            <div className="item" style={styles.nomargin}>
              <div className="ui list" role="list">
                <div className="item" role="listitem">
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
                </div>
              </div>
            </div>
          </div>
    )} right={row.year} />
  ))
}


{/**********************
    ACADEMIC SERVICE
***********************/}

{
    cv.academicservice.map((row, i) => (
        <Row key={i} left={row.left} middle={(
          <div className="ui items">
            <div className="item" style={styles.nomargin}>
              <div className="ui list" role="list">
                <div className="item" role="listitem">
                  {row.name}, <a href={row.url}>{row.venue}{row.series && " (" + row.series + ")"}</a>{row.location && ", " + row.location}
                </div>
              </div>
            </div>
          </div>
        )} right={row.year} />
    ))
}


{/**********************
   STUDENT VOLUNTEERING
***********************/}

{
    cv.studentvolunteering.map((row, i) => (
        <Row key={i} left={row.left} middle={(
          <div className="ui items">
            <div className="item" style={styles.nomargin}>
              <div className="ui list" role="list">
                <div className="item" role="listitem">
                  <a href={row.url}>{row.venue}{row.series && " (" + row.series + ")"}</a>{row.location && ", " + row.location}
                </div>
              </div>
            </div>
          </div>
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
            <div className="item" role="listitem">
              {
                Object.keys(peerreviews).map(year => peerreviews[year].map((item, i) => (
                  <div key={item.series + i}><a href={item.url} title={item.title}>{item.series} {item.years.join(", ")}</a></div>
                )))
              }
            </div>
          </List>
        </Item>
      </Item.Group>
)} right="" />
*/}

        <Row key="pr-header" left="Peer Reviewer" middle={(
          <div className="ui items">
            <div className="item" style={styles.nomargin}>
              <div className="ui list" role="list">
                <div className="item" role="listitem">
                  {reviews.total} reviews in PCS
                </div>
              </div>
            </div>
          </div>
        )} right={""} />

{
    Object.keys(peerreviews).reverse().map(year => (
        <Row key={`pr${year}`} left={peerreviews[year].left} middle={(
          <div className="ui items">
            <div className="item" style={styles.nomargin}>
              <div className="ui list" role="list">
                <div className="item" role="listitem">
                  {
                    peerreviews[year].map((item, i) => (
                       <a key={item.series + i} href={item.url} title={item.title}>{item.series}</a>
                    )).reduce((prev, next) => [prev, ', ', next])
                  }
                </div>
              </div>
            </div>
          </div>
        )} right={year} />
    ))
}



{/**********************
        TEACHING
***********************/}

{/*
<Row left="Teaching Experience" middle={(
      <div className="ui items">
        {
          teachingPositions.map((pos, index) => {
            return (
              <Item key={index} style={styles.nomargin}>
                <div className="ui list" role="list">
                  <List.Item>{pos}</List.Item>
                  {
                    cv.teaching[pos].map((row, i) => (
                          <List.Item style={{paddingLeft:'20px'}} key={i}>
                            {row.course}{row.coursecode && " (" + row.coursecode + ")"}, {row.institution}<br />
                            ({row.num_students && row.num_students +  " students, "} {row.ECTS && row.ECTS + " ECTS, "} {row.level} level)
                          </List.Item>
                    ))
                  }
                </div>
              </Item>
            )
          })
        }
      </div>
)} right="" />
*/}

{
    cv.teaching.map((row, i) => (
        <Row key={i} left={row.left} middle={(
          <div className="ui items">
            <div className="item" style={styles.nomargin}>
              <div className="ui list" role="list">
                <div className="item" role="listitem">
                  {row.coursename}{row.coursecode && <> ({row.coursecode})</>}{row.period && ", " + row.period}, {row.num_students} students, {row.level}<br />
                  {
                    row.url ? <a href={row.url}>{row.organization}</a> : row.organization
                  }
                  {row.location && ", " + row.location}
                </div>
              </div>
            </div>
          </div>
        )} right={row.year} />
    ))
}

{/**********************
      SUPERVISIONS
***********************/}

{
    cv.supervisions.map((row, i) => (
        <Row key={i} left={row.left} middle={(
          <div className="ui items">
            <div className="item" style={styles.nomargin}>
              <div className="ui list" role="list">
                <div className="item" role="listitem">
                  {row.type}, {row.supervisee}
                </div>
              </div>
            </div>
          </div>
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
      <div className="ui items">
        {
          cv.hasOwnProperty("certificates") &&
            cv.certificates.map((item, i) => (
              <div className="item" key={i} style={styles.nomargin}>
                {/*<div style={styles.datum}>{item.year}</div>*/}
                <div className="header" style={styles.nonbold}>{item.name} ({item.institution})</div>
              </div>
            ))
        }
      </div>
)} right="" />



{/**********************
        LANGUAGES
***********************/}

<Row left="Languages" middle={(
      <div className="ui items">
        {
          cv.hasOwnProperty("languages") &&
            cv.languages.map((item, i) => (
              <div className="item" key={i} style={styles.nomargin}>
                <div className="content">
                  <div className="header" style={styles.nonbold}>{item.name} ({item.level})</div>
                </div>
              </div>
            ))
        }
      </div>
)} right="" />


{/**********************
      ASSOCIATIONS
***********************/}

<Row left="Memberships in Scientific Associations" middle={(
      <div className="ui items">
        {
          cv.hasOwnProperty("associations") &&
            cv.associations.map((item, i) => (
              <div className="item" key={i} style={styles.nomargin}>
                <div className="content">
                  <div className="header" style={styles.nonbold}>{item}</div>
                </div>
              </div>
            ))
        }
      </div>
)} right="" />

                  <div className="spacer" style={spacer}></div>

              </div>
        </Layout>
        )
  }
}


export default CV
