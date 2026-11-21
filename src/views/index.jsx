import 'semantic-ui-css/components/grid.min.css'
// import "../css/accordion.css"

import React from "react"
import Icon from "../components/Icon.jsx"
import news from "../data/news.json"
import { selectedPublications } from "./publications-data"

// pronunciation audio: the button is wired up by a small vanilla script in
// src/pages/index.astro (was useState/useRef/useEffect + Audio here)
// News: src/data/news.json (newest first). Selected publications: bib keys
// in src/data/selected-publications.json.

export default function Home() {
  return (
      <div className="ui container">
        <div className="ui divided mobile vertically reversed two column grid">

          <div className="ten wide computer
              nine wide tablet
              sixteen wide mobile
              column">

            <div className="row">

              <p>
              Hi, I am {' '}
               <strong>Jonas Oppenlaender</strong>
               {/* D.Sc. (Tech.), M.Sc., Dipl.-Wirtsch.-Ing., */}
                {' '}
                (
                  <button type="button" id="pronounce" className="icon-button" title="How to pronounce Jonas Oppenländer" aria-label="How to pronounce Jonas Oppenländer">
                    <Icon name="assistive listening systems" className="fitted" />
                    <Icon name="volume up" className="fitted" hidden />
                  </button>
                ),
              {/*a curiosity-driven computer scientist*/}
              {' '}
              an AI & Creativity Researcher
              and an Adjunct Professor (Docent) at the <a href="https://www.oulu.fi/en/research-groups/centre-for-applied-computing">Centre for Applied Computing</a>, University of Oulu.
              </p>

              <p>
              I hold the Title of Docent in Creative Generative AI (Computer Science and Engineering) and a Doctor of Science (Technology) in Computer Science (Human-Computer Interaction; with distinction) from the <a href="https://www.oulu.fi/" target="_blank" rel="noreferrer">University of Oulu</a>.
              I was awarded a Master of Science in Computer Science (with distinction) from the <a href="https://www.southampton.ac.uk/" target="_blank" rel="noreferrer">University of Southampton</a>,
              and a Diplom-Wirtschaftsingenieur degree from <a href='https://www.tu-darmstadt.de/' target="_blank" rel="noreferrer">TU Darmstadt</a>.
              Prior to coming to the University of Oulu, I held academic positions at
              Karlsruhe Institute of Technology,
              University of Jyv&auml;skyl&auml;,
              and
              Freie Universit&auml;t Berlin,
              and worked in industry positions at Elisa, Alstom, Seme4, and Liip.
              </p>

              <p>
              My work focuses on the creativity and creative applications of Artificial Intelligence (AI) in science and work, with a specific emphasis on prompt/context engineering and text-to-image generation, as well as meta-research in Human-Computer Interaction (HCI).
              In the past, I have focused on crowdsourcing complex creative work, ontology engineering, and facilitating knowledge transfer.
              </p>

              <p>
              My current research interests, based on the academic literature I read, are reflected <a href="/research/interests/">on this page</a> and in my <a href="/research/ontology/">personal research ontology</a>.
              {/* In my research, I am interested in building socio-technical systems that allow humans and technology to work together to achieve tasks that would be beyond their individual capabilities.
              A list of researchers who have inspired my work over the years can be found <a href="/research/influences/">here</a>.
              */}
              </p>

              <p>
                In my spare time, I enjoy dabbling with <a href="/art/">AI-generated art</a> and I am a <a href="/kettlebells/">kettlebell salesman</a>.
                  I have lived, studied, and/or worked in several countries including
                  Switzerland, France, Germany, the United Kingdom, Sweden,
                  Macedonia, the United States, and Finland.
              </p>

              <div>
                <h3 style={{textAlign:'left'}}>
                  Selected Publications
                </h3>
                <ul className="selected-pubs">
                  {selectedPublications.map(p => (
                    <li key={p.key} dangerouslySetInnerHTML={{__html: p.__html}}></li>
                  ))}
                </ul>
                <p>
                  <Icon name="arrow right" />
                  <a href="/publications/">All publications</a>
                </p>
              </div>

              <div>
                <h3 style={{textAlign:'left'}}>
                  News
                </h3>
                <ul>
                  {news.map((item, i) => (
                    <li key={i} style={{paddingBottom:'.5rem'}} dangerouslySetInnerHTML={{__html: item.html}}></li>
                  ))}
                </ul>
              </div>

            </div>
          </div>

          <div className="six wide computer
              seven wide tablet
              sixteen wide mobile
              column">
            <div className="row">

              <p style={{marginTop:'2rem', textAlign:'center'}}>
                <img src="/img/research-areas-bubbles-creative-genAI.jpg" style={{width:'100%'}} alt="" />
              </p>

              {/*
              <aside style={{marginTop:'2em'}}>
                <TravelRotary />
              </aside>
              */}

              <p style={{marginTop:'1rem'}}>
                  <Icon name="arrow right" />
                  Academic <a href="/cv/oppenlaender-cv.pdf">CV</a>
                  {/*
                  &nbsp;|&nbsp;
                  <a href="/cv/resume.pdf">Resume</a>
                  */}
              </p>

              {/*
              Japanese name: 高地 (Takachi)
              Chinese name: 高民 (gāomín)
              */}

            </div>
          </div>
        </div>

        <div className="ui divider"></div>
          <a href="https://github.com/joetm" target="_blank" rel="noopener noreferrer" title="Jonas Oppenlaender on GitHub">
              <Icon name="github square" className="grey big link" label="Jonas Oppenlaender on GitHub" />
          </a>
          <a href="https://scholar.google.com/citations?user=ucO_QYQAAAAJ" target="_blank" rel="noopener noreferrer" title="Jonas Oppenlaender on Google Scholar">
              <Icon name="google scholar square" className="grey big link" label="Jonas Oppenlaender on Google Scholar" />
          </a>
      </div>
  )
}
