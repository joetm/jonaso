import React from "react"
import { Header, Grid, Divider, Image, Container, Icon } from 'semantic-ui-react'
import { Link } from "gatsby"

import "../../libs/academicons/css/academicons.min.css"
import TravelRotary from "../components/TravelRotary"
import img from "../img/opp.jpg"
import ACMDL from "../img/ACM-DL-Logo-size3.webp"
import MEDIUM from "../img/monogram-mask.svg"
import WIKIDATA from "../img/wikidata.png"
import { nobottommargin } from "../common"
import Layout from "../components/layout"


const keywords = {
  primary: [
    "human-centered computing",
    "crowdsourcing",
    "crowd feedback systems",
    "creativity support tools",
    // "human computation",
    "ontology engineering",
    // "collaborative ontology engineering",
    // "semantic web",
    // "linked data",
  ],
  secondary: [
    "collective intelligence",
    "web science",
    "social machines",
    // "knowledge transfer",
    "computer supported collaborative work",
    // "e-science",
    // "hypertext and hypermedia",
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
  constructor (props) {
    super(props)
    this.state = {
      travel: [],
    }
  }
  render() {

console.info(process.env.NODE_ENV);

    return (
      <Layout>
        <Container style={{marginBottom: '14px'}}>

          <Grid>
            <Grid.Row>

              <Grid.Column mobile={9} tablet={9} computer={9} widescreen={9} largeScreen={9}>

				{/* in the Community Instrumentation and Awareness research group */}

                <p>
                  I am <strong>Jonas Oppenlaender</strong>, a Senior Researcher actively looking for employment as Lecturer, Assistant Professor, or PostDoc.
                </p>

                <p>
                  Previously, I was a Senior Researcher at <a href="https://www.fiz-karlsruhe.de/" target="_blank">FIZ Karlsruhe</a> and <a href="https://www.kit.edu/" target="_blank">Karlsruhe Institute of Technology (KIT)</a>.
                  {/*
                  <a href="https://www.fiz-karlsruhe.de/en/forschung/information-service-engineering">Information Service Engineering (ISE)</a> group
                  &ndash; Leibniz Institute for Information Infrastructure
                  */}
                  {" "}
                  Prior to that, I was a doctoral researcher
                  in the <a href="https://crowdcomputing.net/">Crowd Computing</a> group
                  {" "}
                  at the <a href="http://ubicomp.oulu.fi/">Center for Ubiquitous Computing</a>,
                  {" "}
                  <a href="http://www.oulu.fi/university/">University of Oulu</a> in Finland
                  where I worked towards a doctoral degree in Computer Science
                  {" "}
                  advised by Associate Prof. <a href="http://www.simohosio.com/">Simo Hosio</a>.
                  {/*
                  Previously, I was a research assistant (Wissenschaftlicher Mitarbeiter)
                  {" "}
                  at the <a href="http://www.mi.fu-berlin.de/en/inf/groups/hcc/" rel="nofollow">Human-Centered Computing</a> group, <a href="https://www.fu-berlin.de/">Freie Universit&auml;t Berlin</a>
                  and the <a href="https://gepris.dfg.de/gepris/projekt/194453117/ergebnisse?context=projekt&task=showDetail&id=194453117">Cluster of Excellence "Bild Wissen Gestaltung"</a> in Berlin.
                  */}
                </p>

                <p>
                  I hold a MSc degree in Computer Science (with Distinction)
                  from the <a href="https://www.southampton.ac.uk/">University of Southampton</a> and studied Industrial Engineering at the <a href="https://www.tu-darmstadt.de/">Technical University of Darmstadt</a> in Germany and <a href="https://liu.se/en">Linköping University</a> in Sweden (leading to the degree of Diplom-Wirtschaftsingenieur which is equivalent to a Master of Science).<br />
                  In the past, I worked as research assistant (Wissenschaftlicher Mitarbeiter) at <a href="https://www.fu-berlin.de/">Freie Universität</a> and the <a href="https://gepris.dfg.de/gepris/projekt/194453117/ergebnisse?context=projekt&task=showDetail&id=194453117">Cluster of Excellence "Bild Wissen Gestaltung"</a> in Berlin.
                   Before that, I worked in agile teams as a web developer at <a href="https://www.seme4.com/">Seme4</a> and <a href="https://www.liip.ch/">Liip</a>.
                   Finally, I gained industry experience as Business Analyst and Strategy Analyst at <a href="https://www.alstom.com/">Alstom</a> (now <a href="https://www.ge.com/">GE</a>).
                </p>

                <p>
                  I am a <a href="https://www.jonaso.de/kettlebells/">kettlebell</a> salesman, and
                  {" "}
                  I have lived, studied, and/or worked in
                  Germany,
                  Switzerland,
                  France,
                  the United Kingdom,
                  Sweden,
                  Macedonia,
                  the United States, and
                  Finland.
                </p>

                <p>
                  In my academic research, I am interested in building socio-technical systems
                  in which the human and technological elements perform complex tasks better than either
                  human or machine could independently.
                  {" "}
                  In the past, I have concentrated on two topics in this research space: facilitating knowledge transfer and supporting complex creative work.
                  <br />
                  My current scientific research interests, based on the academic literature I have read, are reflected <Link to="/interests">here</Link>.
                  Some of my past interests include{" "}
                    { keywords.primary.join(", ") }
                  {" "} and{" "}
                    { keywords.secondary.join(", ") }.
                </p>

                {/*
                <p>
        	        <Header size="tiny" style={{...nobold, ...notopmargin, ...nobottommargin}}>My <strong>primary research interests</strong> are:</Header>
            	      { keywords.primary.join(", ") }
                </p>
                <p>
	                <Header size="tiny" style={{...nobold, ...notopmargin, ...nobottommargin}}><strong>Further research interests</strong> include:</Header>
    	              { keywords.secondary.join(", ") }
                </p>
                */}

                {/*
                <TravelRotary />
                */}

              </Grid.Column>

              <Grid.Column mobile={7} tablet={7} computer={5}>

                <Image src={img} alt="Jonas Oppenlaender" rounded fluid />

                <p>
                  <br />
                  <a href="/cv/oppenlaender-cv.pdf">CV</a><br /><br />
                  <a href="/cv/oppenlaender-publications.pdf">Publications</a>
                </p>

                {/*
                <p>
                  <br />
                  <a href="https://www.fiz-karlsruhe.de/en/forschung/lebenslauf-und-publikationen-jonas-oppenlaender" target="_blank">FIZ Karlsruhe</a> profile
                  <br />
                  <a href="https://www.aifb.kit.edu/web/Jonas_Oppenl%C3%A4nder" target="_blank">Institute AIFB</a> profile
                </p>

                <Header size="tiny" style={nobottommargin}>Office Address:</Header>
                <p>
                    FIZ Karlsruhe<br />
                    Leibniz Institute for Information Infrastructure<br />
                    Hermann-von-Helmholtz-Platz 1<br />
                    76344 Eggenstein-Leopoldshafen<br />
                    Germany<br /><br />
                    E-Mail: {'{'}firstname.lastname{'}'}@fiz-karlsruhe.de
                </p>
                */}

              {/*
                <p>
                    <strong>Consultation hour</strong>: <i>on demand</i> - just send me an email and we&apos;ll arrange a meeting
                </p>
                <p>
                    <Icon as="i" link={true} size="large" name='hand outline right' />
                    <a href="http://www.mi.fu-berlin.de/en/inf/groups/hcc/theses/open/index.html">Open BSc and MSc theses</a>
                </p>
	            */}

              </Grid.Column>
            </Grid.Row>
          </Grid>

          <Divider />

          <a href="https://www.linkedin.com/in/jonasopp/" target="_blank" rel="noopener noreferrer">
              <Icon title="Jonas Oppenlaender on LinkedIn" link={true} color="grey" size="big" name='linkedin square' />
          </a>

          <a href="https://twitter.com/Duesynapse" target="_blank" rel="noopener noreferrer">
              <Icon title="Jonas Oppenlaender on Twitter" link={true} color="grey" size="big" name='twitter square' />
          </a>

          <a href="https://github.com/joetm" target="_blank" rel="noopener noreferrer">
              <Icon title="Jonas Oppenlaender on GitHub" link={true} color="grey" size="big" name='github square' />
          </a>

          <a href="https://medium.com/@j.oppenlaender" target="_blank" rel="noopener noreferrer">
              <i style={{display:'inline-block', width: '25px', height: '25px',
              	backgroundImage: `url(${MEDIUM})`,
              	verticalAlign: 'middle', backgroundPosition: 'center center', lineHeight: 1,
              	margin: '0 0.25rem 0 0.3rem', backgroundSize: 'cover', opacity: 0.45}} title="Jonas Oppenlaender on Medium"></i>
          </a>

          <a href="https://dl.acm.org/author_page.cfm?id=99659312669" target="_blank" rel="noopener noreferrer">
              <i style={{display:'inline-block', width: '25px', height: '25px',
              	backgroundImage: `url(${ACMDL})`,
              	verticalAlign: 'middle', backgroundPosition: 'center center', lineHeight: 1,
              	margin: '0px 0.4rem 0px 0.4rem', backgroundSize: 'cover', opacity: 0.45}} title="Jonas Oppenlaender on ACM DL"></i>
          </a>

          <a href="https://arxiv.org/search/cs?searchtype=author&query=Oppenlaender%2C+J" target="_blank" rel="noopener noreferrer">
              <i style={styles.academicon} title="Jonas Oppenlaender on ArXiv" className="ai ai-arxiv-square ai-2x"></i>
          </a>

          <a href="https://orcid.org/0000-0002-2342-1540">
              <i style={styles.academicon} title="Jonas Oppenlaender on ORCID" className="ai ai-orcid-square ai-2x"></i>
          </a>

          <a href="https://figshare.com/authors/Jonas_Oppenlaender/4813044">
              <i style={styles.academicon} title="Jonas Oppenlaender on Figshare" className="ai ai-figshare-square ai-2x"></i>
          </a>

          <a href="https://dblp.uni-trier.de/pers/hd/o/Oppenlaender:Jonas">
              <i style={styles.academicon} title="Jonas Oppenlaender on DBLP" className="ai ai-dblp-square ai-2x"></i>
          </a>

          <a href="https://www.wikidata.org/wiki/Q57417597" target="_blank" rel="noopener noreferrer">
              <i style={{display:'inline-block', width: '25px', height: '25px',
                backgroundImage: `url(${WIKIDATA})`,
                verticalAlign: 'middle', backgroundPosition: 'center center', lineHeight: 1,
                margin: '0px 0.5rem 0px 0.25rem', backgroundSize: 'cover', opacity: 0.45}} title="Jonas Oppenlaender on Wikidata"></i>
          </a>

          <a href="https://scholar.google.com/citations?hl=de&user=ucO_QYQAAAAJ" target="_blank" rel="noopener noreferrer">
              <i style={styles.academicon} title="Jonas Oppenlaender on Google Scholar" className="ai ai-google-scholar-square ai-2x"></i>
          </a>

        </Container>
      </Layout>
    )
  }
}

export default Home
