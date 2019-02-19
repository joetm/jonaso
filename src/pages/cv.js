import React from "react"
import Link from "gatsby-link"
import { Icon, Label, Header, Divider, List, Item, Image, Container } from 'semantic-ui-react'

import { spacer } from "../common"
// import "../print.css"


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
  //rowspan2: {
  //  flex: '1 1 100%',
  //},
  table: {
    display: 'flex',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: '1.5em',
  },
  leftCol: {
    flex: 1,
    verticalAlign: 'top',
  },
  mainCol: {
    flex: 3,
    verticalAlign: 'top',
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


class CV extends React.Component {
  redirectToPortfolio = () => {
    window.location = _PORTFOLIO_URL
  }
  redirectToPublications = () => {
    window.location = '/publications/'
  }
  render() {
        return (
            <div>

              <Container>


<div style={styles.row}>
  <div style={styles.leftCol}>
                <Header id="contact" style={styles.headline} size="large">Contact Information</Header>
  </div>
  <div style={styles.mainCol}>
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
  </div>
  <div style={styles.rightCol}>
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
  </div>
</div>


<div style={styles.row}>
  <div style={styles.leftCol}>
                <Header id="interests" style={styles.headline} size="large">Research Interests</Header>
  </div>
  <div style={{...styles.mainCol, ...styles.rowspan2}}>
                  <Item.Group>
                    <Item>
                        <Item.Description style={styles.nomarginTop}>
                          <List>
                            <List.Item>
								Crowdsourcing; human computation; collective intelligence; web science; semantic web; social machines; computer supported collaborative work; {/*e-science;*/} hypertext and hypermedia; internet culture
                            </List.Item>
                          </List>
                        </Item.Description>
                    </Item>
                  </Item.Group>
  </div>
  <div style={styles.rightCol}>
  </div>
</div>


<div style={styles.row}>
  <div style={styles.leftCol}>
                <Header id="education" style={styles.headline} size="large">Education</Header>
  </div>
  <div style={styles.mainCol}>
                  <Item.Group>
                    <Item>
                        <Item.Description style={styles.nomarginTop}>
                          <List>
                            <List.Item><a href="http://www.oulu.fi/university/">University of Oulu</a>, Oulu, Finland</List.Item>
                            <List.Item>Ph.D. Candidate</List.Item>
                            <List.Item>Supervisor: <a href="http://simohosio.com/">Adjunct Prof. Dr. Simo Hosio</a></List.Item>
                          </List>
                        </Item.Description>
                    </Item>
                  </Item.Group>
  </div>
  <div style={styles.rightCol}>since 2018</div>
</div>
<div style={styles.row}>
  <div style={styles.leftCol}></div>
  <div style={styles.mainCol}>
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
<div style={styles.row}>
  <div style={styles.leftCol}></div>
  <div style={styles.mainCol}>
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
<div style={styles.row}>
  <div style={styles.leftCol}></div>
  <div style={styles.mainCol}>
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
<div style={styles.row}>
  <div style={styles.leftCol}></div>
  <div style={styles.mainCol}>
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

{/*
<div style={styles.row}>
  <div style={styles.leftCol}>
                <Header id="current-research" style={styles.headline} size="large">Current Research</Header>
  </div>
  <div style={styles.mainCol}>

  </div>
  <div style={styles.rightCol}>
  </div>
</div>
*/}

<div style={styles.row}>
  <div style={styles.leftCol}>
                <Header id="research-exerience" style={styles.headline} size="large">Research Experience</Header>
  </div>
  <div style={styles.mainCol}>
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
<div style={styles.row}>
  <div style={styles.leftCol}></div>
  <div style={styles.mainCol}>
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
<div style={styles.row}>
  <div style={styles.leftCol}></div>
  <div style={styles.mainCol}>
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

<div style={styles.row}>
  <div style={styles.leftCol}>
                <Header id="other-exerience" style={styles.headline} size="large">Other Work Experience</Header>
  </div>
  <div style={styles.mainCol}>

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
<div style={styles.row}>
  <div style={styles.leftCol}></div>
  <div style={styles.mainCol}>
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
<div style={styles.row}>
  <div style={styles.leftCol}></div>
  <div style={styles.mainCol}>
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
<div style={styles.row}>
  <div style={styles.leftCol}></div>
  <div style={styles.mainCol}>
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
<div style={styles.row}>
  <div style={styles.leftCol}></div>
  <div style={styles.mainCol}>
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
<div style={styles.row}>
  <div style={styles.leftCol}></div>
  <div style={styles.mainCol}>
                  <Item.Group>
                    <Item>
                        <Item.Description>
                          <List>
                            <List.Item><a href="https://en.wikipedia.org/wiki/Franco-German_Brigade">Franco-German Brigade</a>, Donaueschingen, Germany</List.Item>
                            <List.Item>Military service in 292<sup>nd</sup> Light Infantry Battalion</List.Item>
                          </List>
                        </Item.Description>
                    </Item>

                  </Item.Group>
  </div>
  <div style={styles.rightCol}>2000 - 2002</div>
</div>

<div style={styles.row}>
  <div style={styles.leftCol}>
                <Header id="publications" style={styles.headline} size="large">Publications</Header>
  </div>
  <div style={styles.mainCol}>
                <a href="javascript:void();" onClick={this.redirectToPublications}>&rarr; &nbsp; See Publications</a>
  </div>
  <div style={styles.rightCol}>
  </div>
</div>

<div style={styles.row}>
  <div style={styles.leftCol}>
                <Header id="awards" style={styles.headline} size="large">Honors &amp; Awards</Header>
  </div>
  <div style={styles.mainCol}>
                  <Item.Group>

                    <Item>
                      <List>
                        <List.Item>SIGCHI Travel Grant, C&amp;C 2019</List.Item>
                      </List>
                    </Item>

                    <Item>
                      <List>
                        <List.Item>Student Travel Grant, UbiComp/ISWC 2018</List.Item>
                      </List>
                    </Item>

                    <Item>
                      <List>
                        <List.Item>Distinction, M.Sc. Computer Science, University of Southampton</List.Item>
                      </List>
                    </Item>

                    <Item>
                      <List>
                        <List.Item>Erasmus Sokrates Scholarship, German Academic Exchange Service (DAAD)</List.Item>
                      </List>
                    </Item>

                  </Item.Group>
  </div>
  <div style={styles.rightCol}>
  </div>
</div>



<div style={styles.row}>
  <div style={styles.leftCol}>
                <Header id="technical-skills" style={styles.headline} size="large">Technical Skills</Header>
  </div>
  <div style={styles.mainCol}>
                  <a href="javascript:void();" onClick={this.redirectToPortfolio}>&rarr; &nbsp; Visit my Web Development Portfolio</a>
  </div>
  <div style={styles.rightCol}>
  </div>
</div>

<div style={styles.row}>
  <div style={styles.leftCol}>
                <Header id="teaching" style={styles.headline} size="large">Teaching Experience</Header>
  </div>
  <div style={styles.mainCol}>
              <Item.Group>
                <Item>
                  <List>
                    <List.Item>
                    	Co-Teacher, Social Computing (521044A), University of Oulu<br />
                        (5 ECTS, Bachelor level)
                    </List.Item>
                  </List>
                </Item>
              </Item.Group>
  </div>
  <div style={styles.rightCol}>2019</div>
</div>
<div style={styles.row}>
  <div style={styles.leftCol}>
  </div>
  <div style={styles.mainCol}>
              <Item.Group>

                <Item>
                  <List>
                    <List.Item>
                    	Teaching Assistant, Human Computer Interaction (521145A), University of Oulu<br />
                    	(164 students, 5 ECTS, Bachelor level)
                    </List.Item>
                  </List>
                </Item>
              </Item.Group>
  </div>
  <div style={styles.rightCol}>2018</div>
</div>
<div style={styles.row}>
  <div style={styles.leftCol}>
  </div>
  <div style={styles.mainCol}>
              <Item.Group>

                <Item>
                  <List>
                    <List.Item>
                    	Teaching Assistant, Applied Computing Project I (521152S), University of Oulu<br />
                    	(Group of three students, 10 ECTS, Bachelor level)
                    </List.Item>
                  </List>
                </Item>
              </Item.Group>
  </div>
  <div style={styles.rightCol}>2018</div>
</div>

<div style={styles.row}>
  <div style={styles.leftCol}>
  </div>
  <div style={styles.mainCol}>
              <Item.Group>
                <Item>
                  <List>
                    <List.Item>Teaching Assistant (Excercise Tutor), Undergraduate Mathematics and Engineering Mechanics, Technical University of Darmstadt</List.Item>
                  </List>
                </Item>
              </Item.Group>
  </div>
  <div style={styles.rightCol}>2006 - 2007</div>
</div>

<div style={styles.row}>
  <div style={styles.leftCol}>
                <Header id="peer-review" style={styles.headline} size="large">Reviewer Experience</Header>
  </div>
  <div style={styles.mainCol}>
                  <Item.Group>

                    <Item>
                          <List>
                            <List.Item>
                            	<a href="https://chi2019.acm.org/" title="ACM CHI Conference on Human Factors in Computing Systems">CHI&apos;19</a>,{' '}
                            	<a href="https://interact2019.org/" title="IFIP TC.13 International Conference on Human-Computer Interaction">INTERACT&apos;19</a>,{' '}
                            	<a href="http://cc.acm.org/2019/" title="Creativity &amp; Cognition">C&amp;C&apos;19</a>,{' '}
                            	<a href="http://cscw.acm.org/2018/" title="ACM Conference on Computer-Supported Cooperative Work and Social Computing">CSCW&apos;18</a>,{' '}
                            	<a href="http://hicss.hawaii.edu/">HICSS-52</a>,{' '}
                            	<a href="https://imwut.acm.org/">IMWUT&apos;18</a>,{' '}
                            	<a href="https://chiplay.acm.org/2018/">CHI PLAY 2018</a>,{' '}
                            	<a href="http://icmi.acm.org/2018/">ICMI&apos;18</a>,{' '}
                            	<a href="http://skill.informatik.uni-leipzig.de/">SKILL-18</a>,{' '}
                            	<a href="https://2017.eswc-conferences.org/">ESWC&apos;17</a>
                            </List.Item>
                          </List>
                    </Item>

                  </Item.Group>
  </div>
  <div style={styles.rightCol}></div>
</div>

<div style={styles.row}>
  <div style={styles.leftCol}>
                <Header id="service" style={styles.headline} size="large">Academic Service</Header>
  </div>
  <div style={styles.mainCol}>

                    <Item.Group>

                    <Item>
                          <List>
                            <List.Item>
                              Organizer, <a href="https://dc2s2.github.io/2019/">Workshop on Designing Crowd-powered Creativity Support Systems</a>, CHI&apos;19
                            </List.Item>
                          </List>
                    </Item>

	                  <Item>
                          <List>
                            <List.Item>
	                            Associate Chair, <a href="https://chi2019.acm.org/" target="_blank">CHI&apos;19 Late Breaking Work</a>
                            </List.Item>
                          </List>
	                  </Item>

	                  <Item>
                          <List>
                            <List.Item>
	                            Student Volunteer, <a href="http://ubicomp.org/ubicomp2018/" target="_blank">UbiComp 2018</a>
                            </List.Item>
                          </List>
	                  </Item>

	                  <Item>
                          <List>
                            <List.Item>
	                            Organizing Committee, <a href="http://ubicomp.oulu.fi/ubiss/">9<sup>th</sup> International UBI Summer School 2018 (UBISS 2018)</a>, Oulu, Finland
                            </List.Item>
                          </List>
	                  </Item>

	                  <Item>
                          <List>
                            <List.Item>
	                            Program Committee, <a href="http://skill.informatik.uni-leipzig.de/">Studierendenkonferenz Informatik (SKILL)</a>, Berlin, Germany
                            </List.Item>
                          </List>
	                  </Item>

	                </Item.Group>

  </div>
  <div style={styles.rightCol}>
  </div>
</div>

<div style={styles.row}>
  <div style={styles.leftCol}>
                <Header id="certificates" style={styles.headline} size="large">Certificates</Header>
  </div>
  <div style={styles.mainCol}>

                  <Item.Group>

                    <Item>
                      {/*<div style={styles.datum}>2014</div>
	                    <Item.Header style={styles.nonbold}>Certified ScrumMaster (Scrum Alliance)</Item.Header>
                    </Item>

                    <Item>
                      {/*<div style={styles.datum}>2014</div>*/}
                        <Item.Header style={styles.nonbold}>Certified Associate in Project Management (PMI)</Item.Header>
                    </Item>

                    <Item>
                      {/*<div style={styles.datum}>2014</div>*/}
                        <Item.Header style={styles.nonbold}>ITIL v3 Foundation (Axelos)</Item.Header>
                    </Item>

                    <Item>
                      {/*<div style={styles.datum}>2013</div>*/}
                        <Item.Header style={styles.nonbold}>Certificate in Business Analysis (University of Toronto)</Item.Header>
                    </Item>

                    <Item>
                      {/*<div style={styles.datum}>2013</div>*/}
                        <Item.Header style={styles.nonbold}>Qualit&auml;tsmanagement-Beauftragter (DAkkS)</Item.Header>
                    </Item>

                    <Item>
                      {/*<div style={styles.datum}>2013</div>*/}
                        <Item.Header style={styles.nonbold}>SAP Certified - Associate Business Foundation &amp; Integration with SAP ERP 6.0 EHP5</Item.Header>
                    </Item>

                    <Item>
                      {/*<div style={styles.datum}>2013</div>*/}
                        <Item.Header style={styles.nonbold}>Integrated Business Processes with SAP ERP (TERP10)</Item.Header>
                    </Item>

                    <Item>
                      {/*<div style={styles.datum}>2010</div>*/}
                        <Item.Header style={styles.nonbold}>Zend Certified Engineer (PHP 5)</Item.Header>
                    </Item>

                    <Item>
                      {/*<div style={styles.datum}>2009</div>*/}
                        <Item.Header style={styles.nonbold}>Qualit&auml;tsmanagement-Fachkraft (T&uuml;v S&uuml;d Akademie)</Item.Header>
                    </Item>

                    <Item>
                      {/*<div style={styles.datum}>2009</div>*/}
                        <Item.Header style={styles.nonbold}>Business English Certificate Higher</Item.Header>
                    </Item>

                  </Item.Group>

  </div>
  <div style={styles.rightCol}>
  </div>
</div>

<div style={styles.row}>
  <div style={styles.leftCol}>
                <Header id="supervisions" style={styles.headline} size="large">Student Supervisions</Header>
  </div>
  <div style={styles.mainCol}>
                  <Item.Group>
                  <Item>
                      <List>
                        <List.Item>
                          Summer internship project, Antonio Kongjonaj
                        </List.Item>
                      </List>
                  </Item>
                  </Item.Group>
  </div>
  <div style={styles.rightCol}>2018</div>
</div>
<div style={styles.row}>
  <div style={styles.leftCol}></div>
  <div style={styles.mainCol}>
                  <Item.Group>
                  <Item>
                      <List>
                        <List.Item>
                          M.Sc. Thesis, <a href="https://www.linkedin.com/in/immanuel-pelzer-408505133/">Immanuel Pelzer</a>
                        </List.Item>
                      </List>
                  </Item>
                  </Item.Group>
  </div>
  <div style={styles.rightCol}>2016 - 2017</div>
</div>
<div style={styles.row}>
  <div style={styles.leftCol}></div>
  <div style={styles.mainCol}>
                  <Item>
                      <List>
                        <List.Item>
                          Software Project
                        </List.Item>
                      </List>
                  </Item>
  </div>
  <div style={styles.rightCol}>2016 - 2017</div>
</div>


<div style={styles.row}>
  <div style={styles.leftCol}>
                <Header id="memberships" style={styles.headline} size="large">Memberships in Scientific Associations</Header>
  </div>
  <div style={styles.mainCol}>
                  <Item.Group>

                    <Item>
                      <Item.Content>
                        <Item.Header style={styles.nonbold}>Association for Computing Machinery (ACM)</Item.Header>
                      </Item.Content>
                    </Item>

                    <Item>
                      <Item.Content>
                        <Item.Header style={styles.nonbold}>Association for Information Systems (AIS)</Item.Header>
                      </Item.Content>
                    </Item>

                  </Item.Group>
  </div>
  <div style={styles.rightCol}>
  </div>
</div>


<div style={styles.row}>
  <div style={styles.leftCol}>
                <Header id="languages" style={styles.headline} size="large">Languages</Header>
  </div>
  <div style={styles.mainCol}>
                  <Item.Group>

                    <Item>
                      <Item.Content>
                        <Item.Header style={styles.nonbold}>German (mother tongue)</Item.Header>
                      </Item.Content>
                    </Item>
                    <Item>
                      <Item.Content>
                        <Item.Header style={styles.nonbold}>English (business fluent)</Item.Header>
                      </Item.Content>
                    </Item>
                    <Item>
                      <Item.Content>
                        <Item.Header style={styles.nonbold}>French (basic knowledge)</Item.Header>
                      </Item.Content>
                    </Item>
                    <Item>
                      <Item.Content>
                        <Item.Header style={styles.nonbold}>Spanish (basic knowledge)</Item.Header>
                      </Item.Content>
                    </Item>

                  </Item.Group>
  </div>
  <div style={styles.rightCol}>
  </div>
</div>


{/*
                <Header id="conferences" size="large">Conference and Workshop Attendance</Header>

                  <Item.Group>

                    <Item>
	                    <div style={styles.datum}>2018</div>
	                    <Item.Content>
	                      <Item.Header><a href="http://ubicomp.org/ubicomp2018/">UbiComp 2018</a></Item.Header>
	                      <Item.Meta>October 9-11, 2018 &ndash; Singapore</Item.Meta>
	                    </Item.Content>
                    </Item>

                    <Item>
	                    <div style={styles.datum}></div>
	                    <Item.Content>
	                      <Item.Header><a href="http://mhc2018.wordpress.com/">Mobile Human Contributions Workshop (MHC'18)</a></Item.Header>
	                      <Item.Meta>October 8, 2018 &ndash; Singapore</Item.Meta>
	                    </Item.Content>
                    </Item>

                    <Item>
	                    <div style={styles.datum}></div>
	                    <Item.Content>
	                      <Item.Header><a href="http://ubicomp.oulu.fi/ubiss/">9<sup>th</sup> International UBI Summer School (UBISS 2018)</a></Item.Header>
	                      <Item.Meta>June 4-9, 2018 &ndash; Oulu, Finland</Item.Meta>
	                    </Item.Content>
                    </Item>

                    <Item>
                      <div style={styles.datum}></div>
                      <Item.Content>
                        <Item.Header><a href="http://mkwi2018.leuphana.de/">Multikonferenz Wirtschaftsinformatik (MKWI)</a></Item.Header>
                        <Item.Meta>
                            March 6-9, 2018 &ndash; L&uuml;neburg, Germany
                        </Item.Meta>
                      </Item.Content>
                    </Item>

                    <Item>
                      <div style={styles.datum}></div>
                      <Item.Content>
                        <Item.Header><a href="https://gi.de/veranstaltung/mensch-computer-interaktion-die-arbeitswelten-der-zukunft-gestalten/">GI Symposium</a> <span style={styles.nonbold}>&ndash; Mensch-Computer Interaktion: Die Arbeitswelten der Zukunft gestalten!</span></Item.Header>
                        <Item.Meta>
                            January 29, 2018 &ndash; Berlin, Germany
                        </Item.Meta>
                      </Item.Content>
                    </Item>

                    <Item>
                      <div style={styles.datum}>2017</div>
                      <Item.Content>
                        <Item.Header><a href="https://www.humancomputation.com/2017/">5<sup>th</sup> AAAI Conf. on Human Computation and Crowdsourcing (HCOMP)</a></Item.Header>
                        <Item.Meta>
                            Oct 25-26, 2017 &ndash; Quebec City, Quebec, Canada
                        </Item.Meta>
                      </Item.Content>
                    </Item>

                    <Item>
                      <div style={styles.datum}></div>
                      <Item.Content>
                        <Item.Header><a href="https://www.humancomputation.com/2017/crowdcamp.html">CrowdCamp Workshop</a></Item.Header>
                        <Item.Meta>
                            Oct 24, 2017 &ndash; Quebec City, Quebec, Canada
                        </Item.Meta>
                      </Item.Content>
                    </Item>

                    <Item>
                      <div style={styles.datum}></div>
                      <Item.Content>
                        <Item.Header>Wikidata Workshop</Item.Header>
                        <Item.Meta>
                            June 9, 2017 &ndash; DIGIS, Zuse Institute, Berlin, Germany
                        </Item.Meta>
                      </Item.Content>
                    </Item>

                    <Item>
                      <div style={styles.datum}>2016</div>
                      <Item.Content>
                        <Item.Header>#DKT16 <span style={styles.nonbold}> &ndash; Smart Technologies for Knowledge Workers</span></Item.Header>
                        <Item.Meta>
                            Oct 11, 2016 &ndash; Berlin, Germany
                        </Item.Meta>
                      </Item.Content>
                    </Item>

                    <Item>
                      <div style={styles.datum}>2015</div>
                      <Item.Content>
                        <Item.Header>1<sup>st</sup> Open Data Camp</Item.Header>
                        <Item.Meta>
                            Feb 2015 &ndash; Winchester, Hampshire, UK
                        </Item.Meta>
                      </Item.Content>
                    </Item>

                  </Item.Group>
*/}


                  <div style={spacer}></div>

              </Container>
            </div>
        )
  }
}

export default CV
