/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */

import 'semantic-ui-css/components/comment.min.css'
import 'semantic-ui-css/components/grid.min.css'
import 'semantic-ui-css/components/icon.min.css'
import "../../libs/academicons/css/academicons.min.css"
// import "../css/accordion.css"

import React from "react"

// pronunciation audio: the icon is wired up by a small vanilla script in
// src/pages/index.astro (was useState/useRef/useEffect + Audio here)

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
                  <i id="pronounce" style={{cursor:'pointer'}} className="fitted assistive listening systems icon" title="How to pronounce Jonas Oppenländer"></i>
                ),
              a Postdoctoral Researcher at the <a href="https://www.oulu.fi/en/university/faculties-and-units/faculty-information-technology-and-electrical-engineering/center-for-ubiquitous-computing">Centre for Applied Computing</a>, University of Oulu.

              I hold a Doctor Science (Technology) in Computer Science (with distinction) from the <a href="https://www.oulu.fi/" target="_blank" rel="noreferrer">University of Oulu</a>,
              a Master of Science in Computer Science (with distinction) at the <a href="https://www.southampton.ac.uk/" target="_blank" rel="noreferrer">University of Southampton</a>,
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

              <p style={{marginTop:'1rem'}}>
                  <i className="arrow right icon"></i>
                  Academic <a href="/cv/oppenlaender-cv.pdf">CV</a>
                  {/*
                  &nbsp;|&nbsp;
                  <a href="/cv/resume.pdf">Resume</a>
                  */}
              </p>

              <div>
                <h3 style={{textAlign:'left'}}>
                  News
                </h3>
                <ul>
                  <li style={{paddingBottom:'.5rem'}}>
                    [Honorable Mention] Our paper <a href="https://default-images.github.io/" target="_blank"><i>&quot;An Exploration of Default Images in Text-to-Image Generation&quot;</i></a> has been presented at ACM CHI 2026.
                  </li>
                  <li style={{paddingBottom:'.5rem'}}>
                    [Honorable Mention] Our paper <a href="https://arxiv.org/abs/2601.22394" target="_blank"><i>&quot;Conversational Inoculation to Enhance Resistance to Misinformation&quot;</i></a> has been presented at ACM CHI 2026.
                  </li>
                  <li style={{paddingBottom:'.5rem'}}>
                    Our <a href="https://meta-hci.github.io/" target="_blank">Meta-HCI Meet-up</a> on Practising Reflection in HCI Research was accepted at ACM CHI '26.
                  </li>
                  <li style={{paddingBottom:'.5rem'}}>
                    My late-breaking-work <i>&quot;StatCounter: A Longitudinal Study of a Portable Scholarly Metric Display&quot;</i> was published at ACM PerDis 2026.
                  </li>
                  <li style={{paddingBottom:'.5rem'}}>
                    [Honorable Mention] Our paper <a href="https://dl.acm.org/doi/10.1145/3715928.3737467" target="_blank"><i>&quot;Quo Vadis, HCOMP?&quot;</i></a> was published at ACM Collective Intelligence 2025.
                  </li>
                  <li style={{paddingBottom:'.5rem'}}>
                    My paper <i>&quot;Past, Present, and Future of Citation Practices in HCI&quot;</i> was accepted at ACM CHI 2025.
                    [ <a href="https://dl.acm.org/doi/10.1145/3706598.3713556" target="_blank">Paper</a> | <a href="https://docs.google.com/presentation/d/1PNQzZWk6ogU75FnfeYFQP-Uyu7hhziGbbY1fN5Jzh-4/edit?usp=sharing" target="_blank">Presentation</a> ]
                  </li>
                  <li style={{paddingBottom:'.5rem'}}>
                    Our paper <i>&quot;Keeping Score: A Quantitative Analysis of How the CHI Community Appreciates Its Milestones&quot;</i> was accepted at ACM CHI 2025.
                    [ <a href="https://dl.acm.org/doi/10.1145/3706598.3713464" target="_blank">Paper</a> | <a href="https://docs.google.com/presentation/d/1-BjlqLd3Nsd8uleTeR9b0yfg_6IPrlGHtVrPOmoZYcU/edit?usp=sharing" target="_blank">Presentation</a> ]
                  </li>
                  <li>
                    Our workshop <i>&quot;Meta-HCI: First Workshop on Meta-Research in HCI&quot;</i> will be held at ACM CHI 2025 on April 26 in Yokohama, Japan.
                    {' '}
                    <a href="https://meta-hci.github.io/" target="_blank">Join us!</a>
                  </li>
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

            </div>
          </div>
        </div>

        <div className="ui divider"></div>
          <a href="https://github.com/joetm" target="_blank" rel="noopener noreferrer">
              <i style={{width:'36px',height:'30px'}} title="Jonas Oppenlaender on GitHub" aria-hidden="true" className="grey github square big link icon"></i>
          </a>
          <a href="https://scholar.google.com/citations?hl=de&user=ucO_QYQAAAAJ" target="_blank" rel="noopener noreferrer">
              <i style={{width:'36px',height:'30px'}} title="Jonas Oppenlaender on Google Scholar" className="academicon ai ai-google-scholar-square ai-2x"></i>
          </a>
      </div>
  )
}
