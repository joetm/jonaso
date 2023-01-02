import 'semantic-ui-css/components/grid.min.css'
import 'semantic-ui-css/components/icon.min.css'
import "../../libs/academicons/css/academicons.min.css"

import React from "react"
import { Link } from "gatsby"
import { Seo } from "../components/Seo"

import TravelRotary from "../components/TravelRotary"
import img from "../img/Jonas-Oppenlaender-500x500.jpg"
import LINKEDIN from "../img/linkedin.png"
// import ACMDL from "../img/ACM-DL-Logo-size3.webp"
// import MEDIUM from "../img/monogram-mask.svg"
// import WIKIDATA from "../img/wikidata.png"
import Layout from "../components/layout"
// import { nobottommargin } from "../common"


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


export function Head() {
  return (
    <Seo title="Jonas Oppenlaender, Doctor of Science (Technology)">
      <link id="canonical" rel="canonical" href="https://www.jonaso.de" />
    </Seo>
  )
} //

class Home extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      travel: [],
    }
  }
  render() {

    return (
      <Layout>
        <div className="ui container">

          <div className="ui divided mobile vertically reversed two column grid">
            <div className="eleven wide computer eleven wide large screen sixteen wide mobile ten wide tablet eleven wide widescreen column">

              <div className="row">

                {/*
                  I am <strong>Jonas Oppenlaender</strong>, a postdoctoral researcher at the <a href="https://www.jyu.fi/en" target="_blank" rel="noreferrer">University of Jyv&auml;skyl&auml;</a> in Central Finland.
                  </p>

                  <p>
                  Before, I was a Senior Researcher/PostDoc at <a href="https://www.fiz-karlsruhe.de/" target="_blank" rel="noopener noreferrer nofollow">FIZ Karlsruhe</a> (Leibniz Institute for Information Infrastructure) and <a href="https://www.kit.edu/" rel="noopener noreferrer nofollow" target="_blank">Karlsruhe Institute of Technology (KIT)</a>.
                  {" "}
                  Prior to my doctoral position at the <a href="http://ubicomp.oulu.fi/">Center for Ubiquitous Computing</a>, I was a researcher (Wissenschaftlicher Mitarbeiter) at the <a href="http://www.mi.fu-berlin.de/en/inf/groups/hcc/" rel="nofollow">Human-Centered Computing</a> group, <a href="https://www.fu-berlin.de/">Freie Universit&auml;t Berlin</a>
                  {" "}
                  and the <a href="https://gepris.dfg.de/gepris/projekt/194453117/ergebnisse?context=projekt&task=showDetail&id=194453117">Cluster of Excellence "Bild Wissen Gestaltung"</a> in Berlin.
                  {" "}
                  Before that, I worked in agile teams as a web developer at <a href="https://www.seme4.com/">Seme4</a> and <a href="https://www.liip.ch/">Liip</a>.
                  I also gained industry experience as Business Analyst and Strategy Analyst at <a href="https://www.alstom.com/">Alstom</a> (now <a href="https://www.ge.com/">GE</a>).
                  </p>

                <p>                  
                  I received my PhD from the <a href={"https://www.oulu.fi/"}>University of Oulu</a> in Associate Prof. <a href="https://simohosio.com/">Simo Hosio</a>'s <a href={'https://ubicomp.oulu.fi/research/cc/'}>Crowd Computing Group</a>.
                  {' '}
                  My doctoral thesis was awarded a disctinction and focused on creativity in microtask crowdsourcing platforms as well as creativity support tools and crowd feedback systems.
                                    I hold a MSc degree in Computer Science (with Distinction)
                  from the <a href="https://www.southampton.ac.uk/">University of Southampton</a> and studied Industrial Engineering at the <a href='https://www.tu-darmstadt.de/'>Technical University of Darmstadt</a> in Germany and <a href="https://liu.se/en">Link&ouml;ping University</a> in Sweden (leading to the degree of Diplom-Wirtschaftsingenieur).
                </p>

                <p>
                  Fun facts about me:
                  I dabble with <a href="/artworks/">AI-generated art</a> and I am a <a href="/kettlebells/">kettlebell</a> salesman.
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
                  {" "}
                  My current scientific research interests, based on the academic literature I have read, are reflected <Link to="/interests">here</Link>.
                </p>
                */}

                <p>
                Hi, my name is <strong>Jonas Oppenlaender</strong> and I am a postdoctoral researcher at the <a href="https://www.jyu.fi/en" target="_blank" rel="noreferrer">University of Jyv&auml;skyl&auml;</a> in Central Finland. I have a diverse background with a range of academic and professional experiences.
                </p>

                <p>
                I completed my PhD in the <a href="http://ubicomp.oulu.fi/">Center for Ubiquitous Computing</a> at the <a href="https://www.oulu.fi/">University of Oulu</a>, where I received a distinction for my thesis on creativity on microtask crowdsourcing platforms and the development of creativity support tools and crowd feedback systems. I also hold a M.Sc. degree in Computer Science with distinction from the <a href="https://www.southampton.ac.uk/">University of Southampton</a> and studied Industrial Engineering at the <a href='https://www.tu-darmstadt.de/'>Technical University of Darmstadt</a> in Germany and <a href="https://liu.se/en">Link&ouml;ping University</a> in Sweden, earning a degree of Diplom-Wirtschaftsingenieur.
                </p>

                <p>
                Before my doctoral position, I worked as a researcher at the <a href="https://www.mi.fu-berlin.de/en/inf/groups/hcc/" rel="nofollow">Human-Centered Computing</a> group at the Freie Universität Berlin and the <a href="https://gepris.dfg.de/gepris/projekt/194453117/ergebnisse?context=projekt&task=showDetail&id=194453117">Cluster of Excellence &quot;Bild Wissen Gestaltung&quot;</a> in Berlin. I also have industry experience as a Business Analyst and Strategy Analyst at <a href="https://www.alstom.com/">Alstom</a> (now <a href="https://www.ge.com/">GE</a>) and have worked in agile teams as a web developer at <a href="https://www.seme4.com/">Seme4</a> and <a href="https://www.liip.ch/">Liip</a>.
                </p>

                <p>
                In my academic research, I am interested in building socio-technical systems that allow humans and technology to work together to achieve tasks that would be beyond their individual capabilities. In the past, I have focused on facilitating knowledge transfer and supporting complex creative work. My scientific research interests, based on the academic literature I have read, are reflected <Link to="/interests">here</Link>. Currently, my scientific research interest is in generative artificial intelligence.
                </p>

                <p>
                  In my spare time, I enjoy dabbling with <a href="/artworks/">AI-generated art</a> and am a <a href="/kettlebells/">kettlebell</a> salesman. I have lived, studied, and/or worked in several countries including
                    Germany,
                    Switzerland,
                    France,
                    the United Kingdom,
                    Sweden,
                    Macedonia,
                    the United States, and
                    Finland.
                </p>

              </div>

            </div>

            <div className="five wide computer five wide large screen sixteen wide mobile six wide tablet five wide widescreen column">

              <div className="row">

                <img src={img} alt="Jonas Oppenlaender" className="ui fluid rounded image" />

                <p style={{marginTop:'1em'}}>
                Tutkijatohtori (Postdoctoral Researcher)
                </p>

                <p>
                    <strong>Office</strong><br />
                    Agora, Room C424.1<br />
                    University of Jyv&auml;skyl&auml;<br />
                    {/* Software and Communications Engineering<br /> */}
                    Faculty of Information Technology<br />
                    40014 University of Jyv&auml;skyl&auml;<br />
                    Finland<br />
                </p>

                <p>
                  E-Mail: jonas.x1.oppenlander@jyu.fi
                </p>
                <p>
                    Academic <a href="/cv/oppenlaender-cv.pdf">CV</a>
                    &nbsp;or&nbsp;
                    Professional <a href="/cv/resume.pdf">Resume</a>
                </p>

                <aside style={{marginTop:'2em'}}>
                  <TravelRotary />
                </aside>

                {/*
                <h4 style={nobottommargin}>Office Address:</h4>
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

              </div>

            </div>
          </div>

          <div className="ui divider"></div>

          <a href="https://www.linkedin.com/in/jonasopp/" target="_blank" rel="noopener noreferrer">
              <i style={{display:'inline-block', width: '25px', height: '25px',
                backgroundImage: `url(${LINKEDIN})`,
                verticalAlign: 'middle', backgroundPosition: 'center center', lineHeight: 1,
                margin: '0 0.5rem 0 0rem', backgroundSize: 'cover', opacity: 0.45}} title="Jonas Oppenlaender on LinkedIn"></i>
          </a>

          <a href="https://github.com/joetm" target="_blank" rel="noopener noreferrer">
              <i title="Jonas Oppenlaender on GitHub" aria-hidden="true" className="grey github square big link icon"></i>
          </a>

          <a href="https://orcid.org/0000-0002-2342-1540">
              <i style={styles.academicon} title="Jonas Oppenlaender on ORCID" className="ai ai-orcid-square ai-2x"></i>
          </a>

          {/*
          <a href="https://twitter.com/Duesynapse" target="_blank" rel="noopener noreferrer">
              <Icon title="Jonas Oppenlaender on Twitter" link={true} color="grey" size="big" name='twitter square' />
          </a>

          <a href="https://www.linkedin.com/in/jonasopp/" target="_blank" rel="noopener noreferrer">
              <Icon title="Jonas Oppenlaender on LinkedIn" link={true} color="grey" size="big" name='linkedin square' />
          </a>

          <a href="https://medium.com/@j.oppenlaender" target="_blank" rel="noopener noreferrer">
              <i style={{display:'inline-block', width: '25px', height: '25px',
                backgroundImage: `url(${MEDIUM})`,
                verticalAlign: 'middle', backgroundPosition: 'center center', lineHeight: 1,
                margin: '0 0.25rem 0 0.3rem', backgroundSize: 'cover', opacity: 0.45}} title="Jonas Oppenlaender on Medium"></i>
          </a>

          <a className="mobilehide" href="https://dl.acm.org/author_page.cfm?id=99659312669" target="_blank" rel="noopener noreferrer">
              <i style={{display:'inline-block', width: '25px', height: '25px',
                backgroundImage: `url(${ACMDL})`,
                verticalAlign: 'middle', backgroundPosition: 'center center', lineHeight: 1,
                margin: '0px 0.4rem 0px 0.4rem', backgroundSize: 'cover', opacity: 0.45}} title="Jonas Oppenlaender on ACM DL"></i>
          </a>

          <a className="mobilehide" href="https://arxiv.org/search/cs?searchtype=author&query=Oppenlaender%2C+J" target="_blank" rel="noopener noreferrer">
              <i style={styles.academicon} title="Jonas Oppenlaender on ArXiv" className="ai ai-arxiv-square ai-2x"></i>
          </a>


          <a className="mobilehide" href="https://dblp.uni-trier.de/pers/hd/o/Oppenlaender:Jonas">
              <i style={styles.academicon} title="Jonas Oppenlaender on DBLP" className="ai ai-dblp-square ai-2x"></i>
          </a>

          <a className="mobilehide" href="https://www.wikidata.org/wiki/Q57417597" target="_blank" rel="noopener noreferrer">
              <i style={{display:'inline-block', width: '25px', height: '25px',
                backgroundImage: `url(${WIKIDATA})`,
                verticalAlign: 'middle', backgroundPosition: 'center center', lineHeight: 1,
                margin: '0px 0.5rem 0px 0.25rem', backgroundSize: 'cover', opacity: 0.45}} title="Jonas Oppenlaender on Wikidata"></i>
          </a>

          <a href="https://figshare.com/authors/Jonas_Oppenlaender/4813044">
              <i style={styles.academicon} title="Jonas Oppenlaender on Figshare" className="ai ai-figshare-square ai-2x"></i>
          </a>
          */}

          <a href="https://scholar.google.com/citations?hl=de&user=ucO_QYQAAAAJ" target="_blank" rel="noopener noreferrer">
              <i style={styles.academicon} title="Jonas Oppenlaender on Google Scholar" className="ai ai-google-scholar-square ai-2x"></i>
          </a>

        </div>
      </Layout>
    )
  }
}

export default Home
