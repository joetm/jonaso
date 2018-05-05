import React from "react"
import Link from "gatsby-link"
import { Icon, Label, Button, Header, Divider, List, Item, Image, Container } from 'semantic-ui-react'

import { spacer } from "../common"

const _PORTFOLIO_URL = 'http://www.jonaso.de/portfolio/'

const styles = {
  datum: {
    paddingRight: '2em',
    minWidth: '120px',
  },
  nonbold: {
    fontWeight: 'normal',
    fontSize: '1em',
  },
}


class CV extends React.Component {
  redirectToPortfolio = () => {
    window.location = _PORTFOLIO_URL
  }
  render() {
        return (
            <div>

              <Container>

                <Header id="education" size="large">Education</Header>

                  <Item.Group>

                    <Item>
                      <div style={styles.datum}>since 2018</div>
                      <Item.Content>
                        <Item.Header>
                          <a href="http://www.oulu.fi/university/">
                            University of Oulu
                          </a>
                        </Item.Header>
                        <Item.Meta>
                          <List>
                            <List.Item><a href="http://ubicomp.oulu.fi/">Center for Ubiquitous Computing</a></List.Item>
                            <List.Item>Oulu, Finland</List.Item>
                          </List>
                        </Item.Meta>
                        <Item.Description>
                          <List>
                            <List.Item>Doctoral student</List.Item>
                            <List.Item>Supervisor: <a href="http://simohosio.com/">Adjunct Prof. Dr. Simo Hosio</a></List.Item>
                          </List>
                        </Item.Description>
                      </Item.Content>
                    </Item>

                    <Item>
                      <div style={styles.datum}>2014 - 2015</div>
                      <Item.Content>
                        <Item.Header><a href="https://www.southampton.ac.uk/">University of Southampton</a></Item.Header>
                        <Item.Meta>
                          <List>
                            <List.Item><a href="http://www.wais.ecs.soton.ac.uk/">Web and Internet Science (WAIS)</a> Research Group</List.Item>
                            <List.Item>Southampton, United Kingdom</List.Item>
                          </List>
                        </Item.Meta>
                        <Item.Description>
                          <List>
                            <List.Item>Degree: <i>MSc in Computer Science</i></List.Item>
                            <List.Item>Specialisation: Semantic Web Technologies, Web Development</List.Item>
                            <List.Item>Thesis: <i><a href="http://crowdui.com/">CrowdUI</a> - A Remote Tool to Crowdsource and Evaluate User Interface Adaptions</i></List.Item>
                            <List.Item>Supervisor: <a href="https://www.ecs.soton.ac.uk/people/tt2">Dr. Thanassis Tiropanis</a></List.Item>
                            <List.Item>Distinction (84)</List.Item>
                          </List>
                        </Item.Description>
                      </Item.Content>
                    </Item>

                    <Item>
                      <div style={styles.datum}>2002 - 2011</div>
                      <Item.Content>
                        <Item.Header><a href="https://www.tu-darmstadt.de/">Technical University of Darmstadt</a></Item.Header>
                        <Item.Meta>
                          <List>
                            <List.Item><a href="http://www.pmd.tu-darmstadt.de/">Institute for Product Development and Machine Elements</a> (pmd)</List.Item>
                            <List.Item>Darmstadt, Germany</List.Item>
                          </List>
                        </Item.Meta>
                        <Item.Description>
                          <List>
                            <List.Item>Degree: <i>Diplom-Wirtschaftsingenieur</i> (equivalent to a MSc degree in Industrial Engineering)</List.Item>
                            <List.Item>Specialisation: Business Informatics, Product Development, Logistics</List.Item>
                            <List.Item>Thesis: <i>Applying Kano&apos;s Theory to Analyse and Characterise Social Product Requirements</i></List.Item>
                            <List.Item>Supervisor: Dr.-Ing. Dirk Hanusch</List.Item>
                          </List>
                        </Item.Description>
                      </Item.Content>
                    </Item>

                    <Item>
                      <div style={styles.datum}>2000</div>
                      <Item.Content>
                        <Item.Header><a href="http://www.gad-vs.de/">Gymnasium am Deutenberg</a></Item.Header>
                        <Item.Meta>
                          <List>
                            <List.Item>Villingen-Schwenningen, Germany</List.Item>
                          </List>
                        </Item.Meta>
                        <Item.Description>
                          <List>
                            <List.Item>University Entrance Qualification (Abitur)</List.Item>
                            <List.Item>Majors: English, Arts</List.Item>
                          </List>
                        </Item.Description>
                      </Item.Content>
                    </Item>

                  </Item.Group>

                <Header id="research-experience" size="large">Research Experience</Header>

                  <Item.Group>

                    <Item>
                      <div style={styles.datum}>2016 - 2018</div>
                      <Item.Content>
                        <Item.Header><a href="http://www.fu-berlin.de/">Freie Universit&auml;t Berlin</a></Item.Header>
                        <Item.Meta>
                          <List>
                            <List.Item><a href="http://www.mi.fu-berlin.de/en/inf/groups/hcc/">Human-Centered Computing Group</a>, Institute of Computer Science</List.Item>
                            <List.Item>Berlin, Germany</List.Item>
                          </List>
                        </Item.Meta>
                        <Item.Description>
                          <List>
                            <List.Item>Research Assistant</List.Item>
                            {/*
                            <List.Item>Group Lead: <a href="https://www.clmb.de/" target="_blank" rel="nofollow">Prof. Dr. Claudia M&uuml;ller-Birn</a></List.Item>
                              <List.Item id="idlab">Project: <i><a href="https://www.interdisciplinary-laboratory.hu-berlin.de/en/content/idlab/">ID+Lab</a></i>, Cluster of Excellence &quot;Image Knowledge Gestaltung&quot;, Humboldt University, Berlin:</List.Item>
                              <List.Item>Linked Data-backed enhanced publication platform for interdisciplinary research projects</List.Item>
                              <List.Item id="ikon">Project: <i><a href="http://www.mi.fu-berlin.de/en/inf/groups/hcc/projects/ikon/index.html">IKON</a></i>, Natural History Museum, Berlin:</List.Item>
                              <List.Item>Ontology engineering, data integration and implementation of a Linked Open Data platform for research project information</List.Item>
                            */}
                          </List>
                        </Item.Description>
                      </Item.Content>
                    </Item>

                    <Item>
                      <div style={styles.datum}>2015 - 2016</div>
                      <Item.Content>
                        <Item.Header><a href="http://www.seme4.com/">Seme 4 Ltd.</a></Item.Header>
                        <Item.Meta>
                          <List>
                            <List.Item>Southampton, United Kingdom</List.Item>
                          </List>
                        </Item.Meta>
                        <Item.Description>
                          <List>
                            <List.Item>Data Scientist and Web Developer</List.Item>
                            <List.Item>Supervisors: <a href="http://www.seme4.com/team/ian-millard/">Dr. Ian Millard</a>, <a href="http://www.seme4.com/team/hugh-glaser/">Dr. Hugh Glaser</a></List.Item>
                            {/*
                              <List.Item>Project: <i><a href="http://www.skillsplanner.net/">SkillsPlanner</a></i></List.Item>
                              <List.Item>SkillsPlanner is an ambitious Linked Data research project, funded with &pound;1.3 mio. by InnovateUK, involving heterogeneous data contributed by partners in London&apos;s construction industry</List.Item>
                              <List.Item>Project: <i><a href="https://github.com/seme4/sameAs-Lite">SameAs-Lite</a></i> (web service system for co-reference resolution and management)</List.Item>
                              <List.Item>Project: <i>MakeRDF</i> (conversion of tabular data into RDF/XML)</List.Item>
                              <List.Item>Project: <i>Data Cube</i> pivot table and visualisation components</List.Item>
                            */}
                          </List>
                        </Item.Description>
                      </Item.Content>
                    </Item>

                    <Item>
                      <div style={styles.datum}>2005 - 2006</div>
                      <Item.Content>
                        <Item.Header><a href="https://liu.se/">Link&ouml;ping University</a></Item.Header>
                        <Item.Meta>
                          <List>
                            <List.Item><a href="https://www.lith.liu.se/">Institute of Technology, Faculty of Science and Engineering</a></List.Item>
                            <List.Item>Link&ouml;ping, Sweden</List.Item>
                          </List>
                        </Item.Meta>
                        <Item.Description>
                          <List>
                            <List.Item>Graduate exchange student (two semesters)</List.Item>
                          </List>
                        </Item.Description>
                      </Item.Content>
                    </Item>

                  </Item.Group>

                <Header id="work-experience" size="large">Other Work Experience</Header>

                  <Item.Group>

                    <Item>
                      <div style={styles.datum}>2016</div>
                      <Item.Content>
                        <Item.Header><a href="https://www.liip.ch/">Liip AG</a></Item.Header>
                        <Item.Meta>Bern, Switzerland</Item.Meta>
                        <Item.Description>
                          <List>
                            <List.Item>Full-Stack Web Developer</List.Item>
                            {/*
                              <List.Item>Agile development of web-based Open Data and e-Government solutions</List.Item>
                              <List.Item>Project: <i>Pilot Open Data Platform Public Transport Switzerland</i>, <a href="https://www.sbb.ch/" target="_blank">Swiss Federal Railways (SBB)</a></List.Item>
                              <List.Item>Role: CKAN Developer (Python)</List.Item>
                              <List.Item>Project: <i>Eurapco Trend Monitoring Platform</i>, <a href="https://www.mobiliar.ch/" target="_blank">Swiss Mobiliar</a></List.Item>
                              <List.Item>Role: Full-Stack Web Developer (Python/Django, JavaScript)</List.Item>
                            */}
                          </List>
                        </Item.Description>
                      </Item.Content>
                    </Item>

                    <Item>
                      <div style={styles.datum}>2013 - 2014</div>
                      <Item.Content>
                        <Item.Header><a href="http://www.alstom.com/">Alstom IS&amp;T</a></Item.Header>
                        <Item.Meta>La Défense, Paris, France</Item.Meta>
                        <Item.Description>
                          <List>
                            <List.Item>IT Business Analyst</List.Item>
                            <List.Item>IT process and service design; IT service catalogue management; Beta testing of IT service website</List.Item>
                          </List>
                        </Item.Description>
                      </Item.Content>
                    </Item>

                    <Item>
                      <div style={styles.datum}>2011 - 2012</div>
                      <Item.Content>
                        <Item.Header><a href="https://www.gepower.com/steam">Alstom Power</a></Item.Header>
                        <Item.Meta>Baden, Switzerland</Item.Meta>
                        <Item.Description>
                          <List>
                            <List.Item>Strategy Analyst (Trainee)</List.Item>
                            <List.Item>Improvement of the idea management system; Migration of the Power Business division intranet to SharePoint; Support of the strategic planning</List.Item>
                          </List>
                        </Item.Description>
                      </Item.Content>
                    </Item>

                    <Item>
                      <div style={styles.datum}>2008 - 2013</div>
                      <Item.Content>
                        <Item.Header><a href="http://www.jonaso.de/portfolio/">Freelance Web Developer</a></Item.Header>
                        <Item.Meta>Darmstadt, Germany</Item.Meta>
                        <Item.Description>
                          <List>
                            <List.Item>Full-Stack Web Development</List.Item>
                            <List.Item>Online Community Administration</List.Item>
                          </List>
                        </Item.Description>
                      </Item.Content>
                    </Item>

                    <Item>
                      <div style={styles.datum}>2010</div>
                      <Item.Content>
                        <Item.Header><a href="http://radovis.gov.mk/">Radoviš Municipality</a></Item.Header>
                        <Item.Meta>Radoviš, Macedonia</Item.Meta>
                        <Item.Description>
                          Volunteer at Local Economic Development Department
                        </Item.Description>
                      </Item.Content>
                    </Item>

                    <Item>
                      <div style={styles.datum}>2000 - 2002</div>
                      <Item.Content>
                        <Item.Header><a href="https://en.wikipedia.org/wiki/Franco-German_Brigade">Franco-German Brigade</a></Item.Header>
                        <Item.Meta>Donaueschingen, Germany</Item.Meta>
                        <Item.Description>
                          Military service in 292nd Light Infantry Battalion
                        </Item.Description>
                      </Item.Content>
                    </Item>

                  </Item.Group>



                <Header id="awards" size="large">Awards and Scholarships</Header>

                  <Item.Group>

                    <Item>
                      <div style={styles.datum}>2015</div>
                      <Item.Content>
                        <Item.Header>Distinction</Item.Header>
                        <Item.Description>MSc Computer Science, University of Southampton</Item.Description>
                      </Item.Content>
                    </Item>

                    <Item>
                      <div style={styles.datum}>2005 - 2006</div>
                      <Item.Content>
                        <Item.Header>Erasmus Mundus Scholarship</Item.Header>
                        <Item.Description>German Academic Exchange Service (DAAD)</Item.Description>
                      </Item.Content>
                    </Item>

                  </Item.Group>


                <Header id="service" size="large">Academic Service</Header>

	              <Header id="service" size="medium">Program Committee Memberships</Header>

                  <Item.Group>

	                  <Item>
	                    <div style={styles.datum}>2018</div>
	                    <Item.Content>
	                      <Item.Header><a href="http://skill.informatik.uni-leipzig.de/">Studierendenkonferenz Informatik (SKILL)</a></Item.Header>
	                      <Item.Meta>Berlin, Germany</Item.Meta>
	                    </Item.Content>
	                  </Item>

	                </Item.Group>

                <Header id="service" size="medium">Supervisions</Header>

                  <Item.Group>

                    <Item>
                      <div style={styles.datum}>2016 - 2017</div>
                      <Item.Content>
                        <Item.Header>MSc Thesis Supervision</Item.Header>
                        <Item.Meta>
                          <a href="https://www.linkedin.com/in/immanuel-pelzer-408505133/">Immanuel Pelzer</a>
                        </Item.Meta>
                        <Item.Description>
                          Topic: Linked Data Conversion and Visualisation
                        </Item.Description>
                      </Item.Content>
                    </Item>

                    <Item>
                      <div style={styles.datum}>2016 - 2017</div>
                      <Item.Content>
                        <Item.Header>Software Project</Item.Header>
                        <Item.Description>
                          Topic: Web-based Game with a Purpose (GWAP) for collaboratively annotating
                          digitised images of the Institute for Art and Visual History,
                          Humboldt University Berlin
                        </Item.Description>
                      </Item.Content>
                    </Item>

                    <Item>
                      <div style={styles.datum}>2006 - 2007</div>
                      <Item.Content>
                        <Item.Header>Teaching Assistant (Excercise Tutor)</Item.Header>
                        <Item.Description>
                          Undergraduate Mathematics and Engineering Mechanics
                        </Item.Description>
                      </Item.Content>
                    </Item>

                  </Item.Group>

                <Header id="service" size="medium">Peer Review</Header>

                  <Item.Group>

                    <Item>
                      <div style={styles.datum}>2018</div>
                      <Item.Content>
                        <Item.Header><a href="http://skill.informatik.uni-leipzig.de/">SKILL-18</a></Item.Header>
                      </Item.Content>
                    </Item>

                    <Item>
                      <div style={styles.datum}>2016</div>
                      <Item.Content>
                        <Item.Header><a href="https://2017.eswc-conferences.org/">ESCW&apos;17</a></Item.Header>
                        {/*
                        <Item.Description>
                          Topic: Semantic Web, Information Extraction, Ontology Learning
                        </Item.Description>
                        */}
                      </Item.Content>
                    </Item>

                  </Item.Group>

                <Header id="service" size="medium">Funding Proposals</Header>

                  <Item.Group>

                    <Item>
                      <div style={styles.datum}>2016</div>
                      <Item.Content>
                        <Item.Header>&quot;int.FDM - An integrated maturity model for research data management&quot;</Item.Header>
                        <Item.Meta>German Federal Ministry of Education and Research</Item.Meta>
                        <Item.Description>
                           with <a href="http://www.mi.fu-berlin.de/en/inf/groups/hcc/members/professor/mueller-birn.html" target="_blank" rel="nofollow">Prof. Dr. Claudia M&uuml;ller Birn</a>, <a href="https://www.naturkundemuseum.berlin/einblicke/mitarbeiter/jana.hoffmann">Dr. Jana Hofmann</a>, <a href="https://www.naturkundemuseum.berlin/de/einblicke/mitarbeiter/falko.gloeckler">Falko Gl&ouml;ckler</a> (Natural History Museum, Berlin) and <a href="http://www.aip.de/mitglieder/henke">Dr. Harry Enke</a> (Supercomputing and E-Science, Leibniz Institute for Astrophysics Potsdam)
                        </Item.Description>
                      </Item.Content>
                    </Item>

                  </Item.Group>




                <Header id="conferences" size="large">Conference Attendance</Header>

                  <Item.Group>

                    {/*<Label><Icon name='checkmark' /> confirmed</Label>*/}

                    <Item>
                      <div style={styles.datum}>2018</div>
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

                <Header id="languages" size="large">Languages</Header>

                  <Item.Group>

                    <Item>
                      <div style={styles.datum}>German</div>
                      <Item.Content>
                        <Item.Header style={styles.nonbold}>mother tongue</Item.Header>
                      </Item.Content>
                    </Item>
                    <Item>
                      <div style={styles.datum}>English</div>
                      <Item.Content>
                        <Item.Header style={styles.nonbold}>business fluent</Item.Header>
                      </Item.Content>
                    </Item>
                    <Item>
                      <div style={styles.datum}>French</div>
                      <Item.Content>
                        <Item.Header style={styles.nonbold}>basic knowledge</Item.Header>
                      </Item.Content>
                    </Item>
                    <Item>
                      <div style={styles.datum}>Spanish</div>
                      <Item.Content>
                        <Item.Header style={styles.nonbold}>basic knowledge</Item.Header>
                      </Item.Content>
                    </Item>

                  </Item.Group>

                <Header id="technical-skills" size="large">Technical Skills</Header>

                  <Button onClick={this.redirectToPortfolio} primary>&rarr; &nbsp; Visit my Web Development Portfolio</Button>


                <Header id="certificates" size="large">Certificates</Header>

                  <Item.Group>

                    <Item>
                      <div style={styles.datum}>2014</div>
                      <Item.Content>
                        <Item.Header style={styles.nonbold}>Certified ScrumMaster (Scrum Alliance)</Item.Header>
                      </Item.Content>
                    </Item>

                    <Item>
                      <div style={styles.datum}>2014</div>
                      <Item.Content>
                        <Item.Header style={styles.nonbold}>Certified Associate in Project Management (PMI)</Item.Header>
                      </Item.Content>
                    </Item>

                    <Item>
                      <div style={styles.datum}>2014</div>
                      <Item.Content>
                        <Item.Header style={styles.nonbold}>ITIL v3 Foundation (Axelos)</Item.Header>
                      </Item.Content>
                    </Item>

                    <Item>
                      <div style={styles.datum}>2013</div>
                      <Item.Content>
                        <Item.Header style={styles.nonbold}>Certificate in Business Analysis (University of Toronto)</Item.Header>
                      </Item.Content>
                    </Item>

                    <Item>
                      <div style={styles.datum}>2013</div>
                      <Item.Content>
                        <Item.Header style={styles.nonbold}>Qualit&auml;tsmanagement-Beauftragter (DAkkS)</Item.Header>
                      </Item.Content>
                    </Item>

                    <Item>
                      <div style={styles.datum}>2013</div>
                      <Item.Content>
                        <Item.Header style={styles.nonbold}>SAP Certified - Associate Business Foundation &amp; Integration with SAP ERP 6.0 EHP5</Item.Header>
                      </Item.Content>
                    </Item>

                    <Item>
                      <div style={styles.datum}>2013</div>
                      <Item.Content>
                        <Item.Header style={styles.nonbold}>Integrated Business Processes with SAP ERP (TERP10)</Item.Header>
                      </Item.Content>
                    </Item>

                    <Item>
                      <div style={styles.datum}>2010</div>
                      <Item.Content>
                        <Item.Header style={styles.nonbold}>Zend Certified Engineer (PHP 5)</Item.Header>
                      </Item.Content>
                    </Item>

                    <Item>
                      <div style={styles.datum}>2009</div>
                      <Item.Content>
                        <Item.Header style={styles.nonbold}>Qualit&auml;tsmanagement-Fachkraft (T&uuml;v S&uuml;d Akademie)</Item.Header>
                      </Item.Content>
                    </Item>

                    <Item>
                      <div style={styles.datum}>2009</div>
                      <Item.Content>
                        <Item.Header style={styles.nonbold}>Business English Certificate Higher</Item.Header>
                      </Item.Content>
                    </Item>

                  </Item.Group>


                <Header id="associations" size="large">Membership in Scientific Associations</Header>

                  <Item.Group>

                    <Item>
                      <div style={styles.datum}></div>
                      <Item.Content>
                        <Item.Header style={styles.nonbold}>Association for Computing Machinery (ACM)</Item.Header>
                      </Item.Content>
                    </Item>

                    <Item>
                      <div style={styles.datum}></div>
                      <Item.Content>
                        <Item.Header style={styles.nonbold}>Association for Information Systems (AIS)</Item.Header>
                      </Item.Content>
                    </Item>

                  </Item.Group>


                  <div style={spacer}></div>

              </Container>
            </div>
        )
  }
}

export default CV
