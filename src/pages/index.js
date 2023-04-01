"use client"

import 'semantic-ui-css/components/comment.min.css'
import 'semantic-ui-css/components/grid.min.css'
import 'semantic-ui-css/components/icon.min.css'
import "../../libs/academicons/css/academicons.min.css"

import { Link } from "gatsby"
import React from "react"
import { Seo } from "../components/Seo"
import img from "../img/Jonas-Oppenlaender-500x500.jpg"
import LINKEDIN from "../img/linkedin.png"
import Layout from "../components/layout"
import TravelRotary from "../components/TravelRotary"


export const Head = () => (
  <Seo title="Jonas Oppenlaender, Doctor of Science (Technology)">
    <link id="canonical" rel="canonical" href="https://www.jonaso.de" />
  </Seo>
)


export default function Home() {
  return (
    <Layout>
      <div className="ui container">

        <div className="ui divided mobile vertically reversed two column grid">
          <div className="eleven wide computer eleven wide large screen sixteen wide mobile ten wide tablet eleven wide widescreen column">

            <div className="row">
              <p>
              Hi, I am <strong>Jonas Oppenlaender</strong>
                {' '}
                (<a title="How to pronounce Oppenländer" href="https://www.howtopronounce.com/oppenlander" target="_blank" rel="noopener noreferrer">
                  <i className="fitted assistive listening systems icon"></i>
                </a>)
                {' '}
              and I am a postdoctoral researcher at the <a href="https://www.jyu.fi/en" target="_blank" rel="noreferrer">University of Jyv&auml;skyl&auml;</a> in Central Finland. I have a diverse background with a range of academic and professional experiences.
              </p>

              <p>
              I completed my PhD in the <a href="http://ubicomp.oulu.fi/">Center for Ubiquitous Computing</a> at the <a href="https://www.oulu.fi/">University of Oulu</a>, where I received a distinction for my thesis on creativity on microtask crowdsourcing platforms and the development of creativity support tools and crowd feedback systems. I also hold a M.Sc. degree in Computer Science with distinction from the <a href="https://www.southampton.ac.uk/">University of Southampton</a> and studied Industrial Engineering at the <a href='https://www.tu-darmstadt.de/'>Technical University of Darmstadt</a> in Germany and <a href="https://liu.se/en">Link&ouml;ping University</a> in Sweden, earning a degree of Diplom-Wirtschaftsingenieur.
              </p>

              <p>
              Before my doctoral position, I worked as a researcher at the <a href="https://www.mi.fu-berlin.de/en/inf/groups/hcc/" rel="nofollow">Human-Centered Computing</a> group at the Freie Universität Berlin and the <a href="https://gepris.dfg.de/gepris/projekt/194453117/ergebnisse?context=projekt&task=showDetail&id=194453117">Cluster of Excellence &quot;Bild Wissen Gestaltung&quot;</a> in Berlin. I also have industry experience as a Business Analyst and Strategy Analyst at <a href="https://www.alstom.com/">Alstom</a> (now <a href="https://www.ge.com/">GE</a>) and have worked in agile teams as a web developer at <a href="https://www.seme4.com/">Seme4</a> and <a href="https://www.liip.ch/">Liip</a>.
              </p>

              <p>
              In my academic research, I am interested in building socio-technical systems that allow humans and technology to work together to achieve tasks that would be beyond their individual capabilities. In the past, I have focused on facilitating knowledge transfer and supporting complex creative work. My scientific research interests, based on the academic literature I have read, are reflected <Link to="/interests/">here</Link>. Currently, my scientific research interest is in prompt-based learning and generative artificial intelligence.
              </p>

              <p>
                In my spare time, I enjoy dabbling with <Link to="/artworks/">AI-generated art</Link> and am a <Link to="/kettlebells/">kettlebell</Link> salesman.
                  I have lived, studied, and/or worked in several countries including
                  Germany, Switzerland, France, the United Kingdom, Sweden, Macedonia, the United States, and Finland.
              </p>

            </div>
          </div>

          <div className="five wide computer five wide large screen sixteen wide mobile six wide tablet five wide widescreen column">
            <div className="row">
              <img src={img} alt="" className="ui fluid rounded image" />
              <p style={{marginTop:'1em'}}>
              Tutkijatohtori (Postdoctoral Researcher)
              </p>
              <p>
                  {/*
                  <strong>Office</strong><br />
                  Agora, Room C424.1<br />
                  */}
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
                  &nbsp;|&nbsp;
                  Professional <a href="/cv/resume.pdf">Resume</a>
              </p>
              <aside style={{marginTop:'2em'}}>
                <TravelRotary />
              </aside>
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
            <i title="Jonas Oppenlaender on ORCID" className="academicon ai ai-orcid-square ai-2x"></i>
        </a>
        <a href="https://scholar.google.com/citations?hl=de&user=ucO_QYQAAAAJ" target="_blank" rel="noopener noreferrer">
            <i title="Jonas Oppenlaender on Google Scholar" className="academicon ai ai-google-scholar-square ai-2x"></i>
        </a>
      </div>
    </Layout>
  )
}

