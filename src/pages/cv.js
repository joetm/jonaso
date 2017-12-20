import React from "react"
import Link from "gatsby-link"
import { Label, Button, Icon, Header, Divider, List, Item, Image, Container } from 'semantic-ui-react'


const _PORTFOLIO_URL = 'http://www.jonaso.de/portfolio/'

const styles = {
  datum: {
    paddingRight: '2em',
    minWidth: '120px',
  },
  spacer: {
    height: '5em',
  },
  nonbold: {
    fontWeight: 'normal',
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
                      <div style={styles.datum}>2014 - 2015</div>
                      <Item.Content>
                        <Item.Header><a href="https://soton.ac.uk/">University of Southampton</a></Item.Header>
                        <Item.Meta>
                          <List>
                            <List.Item><a href="http://www.wais.ecs.soton.ac.uk/">Web and Internet Science Research Group</a> (WAIS) {/*, Electronics and Computer Science (ECS)*/}</List.Item>
                          </List>
                        </Item.Meta>
                        <Item.Description>
                          <List>
                            <List.Item>Degree: <i>MSc Computer Science</i></List.Item>
                            <List.Item>Specialisation: Semantic Web Technologies, Web Development</List.Item>
                            <List.Item>Thesis: <i><a href="http://crowdui.com/">CrowdUI</a> - A Remote Tool to Crowdsource and Evaluate User Interface Adaptions</i></List.Item>
                            <List.Item>Supervisor: <a href="https://www.ecs.soton.ac.uk/people/tt2">Dr Thanassis Tiropanis</a></List.Item>
                            <List.Item>Distinction (84)</List.Item>
                          </List>
                        </Item.Description>
                        {/*<Item.Extra>Additional Details</Item.Extra>*/}
                      </Item.Content>
                    </Item>

                    <Item>
                      <div style={styles.datum}>2002 - 2011</div>
                      <Item.Content>
                        <Item.Header><a href="https://www.tu-darmstadt.de/">Technical University of Darmstadt</a></Item.Header>
                        <Item.Meta>
                          <List>
                            <List.Item><a href="http://www.pmd.tu-darmstadt.de/">Institute for Product Development and Machine Elements</a> (pmd)</List.Item>
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
                      <div style={styles.datum}>since 2016</div>
                      <Item.Content>
                        <Item.Header><a href="http://www.fu-berlin.de/">Freie Universit&auml;t Berlin</a></Item.Header>
                        <Item.Meta>
                          <List>
                            <List.Item><a href="http://www.mi.fu-berlin.de/en/inf/groups/hcc/">Human-Centered Computing Group</a>, Institute of Computer Science</List.Item>
                            <List.Item>Group Lead: <a href="https://www.clmb.de/" target="_blank">Junior-Prof. Dr. Claudia Müller-Birn</a></List.Item>
                          </List>
                        </Item.Meta>
                        <Item.Description>
                          <List>
                            <List.Item>Research Associate</List.Item>
                            <List.Item id="idlab">Project: <i><a href="https://www.interdisciplinary-laboratory.hu-berlin.de/en/content/idlab/">ID+Lab</a></i>, Cluster of Excellence &quot;Image Knowledge Gestaltung&quot;, Humboldt University, Berlin:</List.Item>
                            <List.Item>Design of a Linked Data-backed publication platform of interdisciplinary research projects</List.Item>
                            <List.Item id="ikon">Project: <i><a href="http://www.mi.fu-berlin.de/en/inf/groups/hcc/projects/ikon/index.html">IKON</a></i>, Natural History Museum, Berlin:</List.Item>
                            <List.Item>Design and implementation of a Linked Open Data research project information system and visualization</List.Item>
                          </List>
                        </Item.Description>
                        {/*<Item.Extra>Additional Details</Item.Extra>*/}
                      </Item.Content>
                    </Item>

                    <Item>
                      <div style={styles.datum}>2015 - 2016</div>
                      <Item.Content>
                        <Item.Header><a href="http://www.seme4.com/">Seme 4 Ltd.</a></Item.Header>
                        <Item.Meta>
                          <List>
                            <List.Item>Southampton, United Kingdom</List.Item>
                            <List.Item>Supervisors: <a href="">Dr Ian Millard</a>, <a href="http://www.seme4.com/team/hugh-glaser/">Dr Hugh Glaser</a></List.Item>
                          </List>
                        </Item.Meta>
                        <Item.Description>
                          <List>
                            <List.Item>Data Scientist and Web Developer</List.Item>
                            <List.Item>Project: <i><a href="http://www.skillsplanner.net/">SkillsPlanner</a></i></List.Item>
                            <List.Item>SkillsPlanner is an ambitious Linked Data research project, funded with &pound;1.3 mio. by InnovateUK and partners, involving heterogeneous data contributed by partners in London&apos;s construction industry</List.Item>
                            <List.Item>Project: <i><a href="https://github.com/seme4/sameAs-Lite">SameAs-Lite</a></i></List.Item>
                            <List.Item>Project: <i>MakeRDF</i> (conversion of tabular data into RDF/XML)</List.Item>
                            <List.Item>Project: <i>Data Cube</i> pivot table and visualisation components</List.Item>
                          </List>
                        </Item.Description>
                        {/*<Item.Extra>Additional Details</Item.Extra>*/}
                      </Item.Content>
                    </Item>

                    <Item>
                      <div style={styles.datum}>2005 - 2006</div>
                      <Item.Content>
                        <Item.Header><a href="https://liu.se/">Link&ouml;ping University</a></Item.Header>
                        <Item.Meta>
                          <List>
                            <List.Item><a href="https://www.lith.liu.se/">Institute of Technology, Faculty of Science and Engineering</a></List.Item>
                            <List.Item>Graduate exchange student</List.Item>
                          </List>
                        </Item.Meta>
                        <Item.Meta>Link&ouml;ping, Sweden</Item.Meta>
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
                            <List.Item>Agile development of web-based Open Data and e-Government solutions</List.Item>
                          </List>
                        </Item.Description>
                        {/*<Item.Extra>Additional Details</Item.Extra>*/}
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
                        {/*<Item.Extra>Additional Details</Item.Extra>*/}
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
                        {/*<Item.Extra>Additional Details</Item.Extra>*/}
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
                        {/*<Item.Extra>Additional Details</Item.Extra>*/}
                      </Item.Content>
                    </Item>

                    <Item>
                      <div style={styles.datum}>2010</div>
                      <Item.Content>
                        <Item.Header><a href="http://radovis.gov.mk/">Radoviš Municipality</a></Item.Header>
                        <Item.Meta>Radoviš, Macedonia</Item.Meta>
                        <Item.Description>
                          Volunteer in Local Economic Development Department
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
                        <Item.Header>Distinction (84)</Item.Header>
                        <Item.Meta>MSc Computer Science, University of Southampton</Item.Meta>
                        {/*
                        <Item.Description>
                          xxx
                        </Item.Description>
                        */}
                        {/*<Item.Extra>Additional Details</Item.Extra>*/}
                      </Item.Content>
                    </Item>

                    <Item>
                      <div style={styles.datum}>2005 - 2006</div>
                      <Item.Content>
                        <Item.Header>Erasmus Mundus Scholarship</Item.Header>
                        <Item.Meta>German Academic Exchange Service (DAAD)</Item.Meta>
                      </Item.Content>
                    </Item>

                  </Item.Group>


                <Header id="service" size="large">Academic Service</Header>

                  <Item.Group>

                    <Item>
                      <div style={styles.datum}>2016 - 2017</div>
                      <Item.Content>
                        <Item.Header>MSc Thesis Supervision</Item.Header>
                        <Item.Meta><a href="https://www.linkedin.com/in/immanuel-pelzer-408505133/">Immanuel Pelzer</a></Item.Meta>
                        <Item.Description>
                          Topic: Linked Data Conversion and Visualisation
                        </Item.Description>
                      </Item.Content>
                    </Item>

                    <Item>
                      <div style={styles.datum}>2016 - 2017</div>
                      <Item.Content>
                        <Item.Header>Software Project Supervision</Item.Header>
                        <Item.Meta>&quot;Picture Identification Challenge&quot;</Item.Meta>
                        <Item.Description>
                          Topic: Game with a Purpose for collaborative annotation
                          of digitised images of the dia archive of the Institute
                          for Art and Visual History, Humboldt University Berlin
                        </Item.Description>
                      </Item.Content>
                    </Item>

                    <Item>
                      <div style={styles.datum}>2016</div>
                      <Item.Content>
                        <Item.Header>Peer Reviewer</Item.Header>
                        <Item.Meta>ESCW&apos;17</Item.Meta>
                        <Item.Description>
                          Topic: Semantic Web, Information Extraction, Ontology Learning
                        </Item.Description>
                      </Item.Content>
                    </Item>

                    <Item>
                      <div style={styles.datum}>2016</div>
                      <Item.Content>
                        <Item.Header>Co-author of a funding proposal</Item.Header>
                        <Item.Meta>German Federal Ministry of Education and Research</Item.Meta>
                        <Item.Description>
                           &quot;int.FDM - An integrated maturity model for research data management&quot;<br />
                           together with
                           <a href="http://www.mi.fu-berlin.de/en/inf/groups/hcc/members/professor/mueller-birn.html" target="_blank">Junior-Prof. Dr. Claudia M&uuml;ller Birn</a> and <a href="https://www.naturkundemuseum.berlin/einblicke/mitarbeiter/jana.hoffmann">Dr. Jana Hofmann</a>, <a href="https://www.naturkundemuseum.berlin/de/einblicke/mitarbeiter/falko.gloeckler">Falko Gl&ouml;ckler</a> (Natural History Museum, Berlin) and <a href="http://www.aip.de/mitglieder/henke">Dr. Harry Enke</a> (Supercomputing and E-Science, Leibniz Institute for Astrophysics Potsdam)
                        </Item.Description>
                      </Item.Content>
                    </Item>

                    <Item>
                      <div style={styles.datum}>2006 - 2007</div>
                      <Item.Content>
                        <Item.Header>Teaching Assistant (Excercise Tutor)</Item.Header>
                        <Item.Meta>Undergraduate Mathematics and Engineering Mechanics</Item.Meta>
                      </Item.Content>
                    </Item>

                  </Item.Group>


                <Header id="conferences" size="large">Conference Attendance</Header>

                  <Item.Group>

                    <Item>
                      <div style={styles.datum}>2018</div>
                      <Item.Content>
                        <Item.Header><a href="https://www.humancomputation.com/2018/">6<sup>th</sup> AAAI Conf. on Human Computation and Crowdsourcing (HCOMP)</a></Item.Header>
                        <Item.Meta>
                          <List>
                            <List.Item><Label><Icon name='calendar' /> planned</Label></List.Item>
                            <List.Item>Z&uuml;rich, Switzerland</List.Item>
                            <List.Item>July 5-8, 2018</List.Item>
                          </List>
                        </Item.Meta>
                      </Item.Content>
                    </Item>

                    <Item>
                      <div style={styles.datum}></div>
                      <Item.Content>
                        <Item.Header><a href="http://mkwi2018.leuphana.de/">Multikonferenz Wirtschaftsinformatik (MKWI)</a></Item.Header>
                        <Item.Meta>
                          <List>
                            <List.Item><Label><Icon name='checkmark' /> confirmed</Label></List.Item>
                            <List.Item>L&uuml;neburg, Germany</List.Item>
                            <List.Item>March 6-9, 2018</List.Item>
                          </List>
                        </Item.Meta>
                      </Item.Content>
                    </Item>

                    <Item>
                      <div style={styles.datum}>2017</div>
                      <Item.Content>
                        <Item.Header><a href="https://www.humancomputation.com/2017/">5<sup>th</sup> AAAI Conf. on Human Computation and Crowdsourcing (HCOMP)</a></Item.Header>
                        <Item.Meta>
                          <List>
                            <List.Item>Quebec City, Quebec, Canada</List.Item>
                            <List.Item>Oct 24-26, 2017</List.Item>
                          </List>
                        </Item.Meta>
                      </Item.Content>
                    </Item>

                    <Item>
                      <div style={styles.datum}></div>
                      <Item.Content>
                        <Item.Header><a href="https://www.humancomputation.com/2017/crowdcamp.html">CrowdCamp Workshop</a></Item.Header>
                        <Item.Meta>
                          <List>
                            <List.Item>Quebec City, Quebec, Canada</List.Item>
                            <List.Item>Oct 24, 2017</List.Item>
                          </List>
                        </Item.Meta>
                      </Item.Content>
                    </Item>

                    <Item>
                      <div style={styles.datum}></div>
                      <Item.Content>
                        <Item.Header>Wikidata Workshop</Item.Header>
                        <Item.Meta>
                          <List>
                            <List.Item>DIGIS, Zuse Institute, Berlin, Germany</List.Item>
                            <List.Item>June 9, 2017</List.Item>
                          </List>
                        </Item.Meta>
                      </Item.Content>
                    </Item>

                    <Item>
                      <div style={styles.datum}>2016</div>
                      <Item.Content>
                        <Item.Header>#DKT16 - Smart Technologies for Knowledge Workers</Item.Header>
                        <Item.Meta>
                          <List>
                            <List.Item>Berlin, Germany</List.Item>
                            <List.Item>Oct 11, 2016</List.Item>
                          </List>
                        </Item.Meta>
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

                  </Item.Group>


                  <div style={styles.spacer}></div>

              </Container>
            </div>
        )
    }
}

export default CV
