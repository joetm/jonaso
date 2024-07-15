/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */

import 'semantic-ui-css/components/comment.min.css'
import 'semantic-ui-css/components/grid.min.css'
import 'semantic-ui-css/components/icon.min.css'
import "../../libs/academicons/css/academicons.min.css"
import "../css/accordion.css"

import React, { useRef, useState, useEffect } from "react"
import { Link } from "gatsby"
import { Seo } from "../components/Seo"
// import LINKEDIN from "../img/linkedin.png"
import Layout from "../components/layout"
import Venn from "../../static/img/Research_areas_Venn.jpg"
// import TravelRotary from "../components/TravelRotary"
// import img from "../img/Jonas-Oppenlaender-500x500.jpg"
// import img from "../img/gen-24/ComfyUI_00011_.jpg"


export const Head = () => (
  <Seo title="Jonas Oppenlaender, Doctor of Science (Technology)">
    <link id="canonical" rel="canonical" href="https://www.jonaso.de" />
  </Seo>
) //


function AccordionItem({ title, content, link=null, link_is_doi=true, num, accordionActiveNum, expandAccordion }) {
  let linkname;
  if (link_is_doi) {
    linkname = link ? link.split(/\//).slice(-1)[0] : null
  } else {
    linkname = link
  }
  return (
    <>
      <div className="title" onClick={() => expandAccordion(num)}>
        <i className={`caret ${accordionActiveNum === num ? 'down' : 'right'} icon`}></i>
        {title}
        {' '}
        {
          link && <span>(<a href={link} rel="_blank">{linkname}</a>)</span>
        }
      </div>
      <div className="content" style={{clear: 'both', display: accordionActiveNum === num ? 'block' : 'none'}}>
        <div className="transition content">
          {content}
        </div>
      </div>
    </>
  )
}

export default function Home() {
  const audioRef = useRef()
  const [ isPlaying, setIsPlaying ] = useState(false)
  const [ accordionActiveNum, setAccordionActiveNum ] = useState(null)
  const [ imgUrl, setImgUrl ] = useState('/img/gen-24/index-pixel.png')

  useEffect(() => {
    setImgUrl(`/img/gen-24/ComfyUI_0000${Math.floor(Math.random() * 3) + 1}_.jpg`)
  }, [])

  useEffect(() => {
    audioRef.current = new Audio('/audio/speech_20230621150721178.mp3')
    audioRef.current.addEventListener('play', () => {
        setIsPlaying(true)
    })
    audioRef.current.addEventListener('ended', () => {
        setIsPlaying(false)
    })
    // cleanup event listeners
    return () => {
        audioRef.current.removeEventListener('play', () => {})
        audioRef.current.removeEventListener('ended', () => {})
    }
  }, [])

  const playAudio = () => {
    audioRef.current.play()
  }

  const expandAccordion = (num) => {
    if (accordionActiveNum === num) {
      setAccordionActiveNum(null)
    } else {
      setAccordionActiveNum(num)
    }
  }

  return (
    <Layout>
      <div className="ui container">
        <div className="ui divided mobile vertically reversed two column grid">

          <div className="ten wide computer
              nine wide tablet
              sixteen wide mobile
              column">

            <div className="row">

              <p>
              Hi, I am <strong>Jonas Oppenlaender</strong>
                {' '}
                (
                  {
                    isPlaying ?
                      <i style={{color: '#666666'}} className="volume up icon"></i>
                    :
                      <i style={{cursor:'pointer'}} className="fitted assistive listening systems icon" onClick={playAudio} title="How to pronounce Jonas Oppenländer"></i>
                  }
                ).
              </p>

              <p>
              In my previous position, I was a Senior Research Scientist at Elisa Corporation in Helsinki, Finland,
                  {/*
                  My primary research objective is to adapt LLMs to automate tasks in the telecommunications domain.
                  */}
                where my aim was to{' '}
                  {/*
                  enhance the industrial usability of AI, specifically
                  leveraging the capabilities of Large Language Models (LLMs), tailored for the telecommunications sector.
                  */}
                  {/* To this end, I */}
                  research, identify, propose, and evaluate effective recipes and technical solutions for adapting LLMs and LLM-based agents to specialized tasks within telecommunications and engineering.
              Prior to that, I was a postdoctoral researcher at the <a href="https://www.jyu.fi/en" target="_blank" rel="noreferrer">University of Jyv&auml;skyl&auml;</a> in Central Finland where I researched prompt engineering and text-to-image generation. Prompt engineering has been my primary research interest since 2021.
              </p>

              <p>
              I completed my PhD in the <a href="http://ubicomp.oulu.fi/">Center for Ubiquitous Computing</a> at the <a href="https://www.oulu.fi/">University of Oulu</a>, where I received a distinction for my thesis on creative crowdsourcing, creativity support tools, and crowd feedback systems.
              I also hold a M.Sc. degree in Computer Science with distinction from the <a href="https://www.southampton.ac.uk/">University of Southampton</a> and studied Industrial Engineering at the <a href='https://www.tu-darmstadt.de/'>Technical University of Darmstadt</a> in Germany and <a href="https://liu.se/en">Link&ouml;ping University</a> in Sweden, earning a degree of Diplom-Wirtschaftsingenieur.
              Before my doctoral position, I worked as a researcher at the <a href="https://www.mi.fu-berlin.de/en/inf/groups/hcc/" rel="nofollow">Human-Centered Computing</a> group at the Freie Universität Berlin and the <a href="https://gepris.dfg.de/gepris/projekt/194453117/ergebnisse?context=projekt&task=showDetail&id=194453117">Cluster of Excellence &quot;Bild Wissen Gestaltung&quot;</a> in Berlin. I also have industry experience as a Business Analyst and Strategy Analyst at <a href="https://www.alstom.com/">Alstom</a> (now <a href="https://www.ge.com/">GE</a>) and have worked in agile teams as a web developer at <a href="https://www.seme4.com/">Seme4</a> and <a href="https://www.liip.ch/">Liip</a>.
              </p>

              <div style={{margin: '1em 0 1em 0'}}>
                In my PhD and PostDoc years, I authored some highly innovative publications on topics that nobody had researched before:
                <div className="ui accordion">
                  <AccordionItem title="Creativity of text-to-image generation" content="This publication contributed a description of the online creative ecosystem of text-to-image generation and argued that in order to determine the creativity of text-to-image generation, we need to look beyond the generated image and the prompt." num="1" expandAccordion={expandAccordion} accordionActiveNum={accordionActiveNum} link="https://dx.doi.org/10.1145/3569219.3569352" />
                  {/*
                  <AccordionItem title="A taxonomy of prompt modifiers for text-to-image generation" content="TODO" num="2" expandAccordion={expandAccordion} accordionActiveNum={accordionActiveNum} />
                  */}
                  <AccordionItem title="Creativity on paid crowdsourcing platforms" content="Crowd workers are routinely invited to participate in creative tasks, yet it was unknown how crowd workers feel about such tasks. This survey study developed worker archetypes with varying levels of openess towards creative crowdsourcing tasks." num="3" expandAccordion={expandAccordion} accordionActiveNum={accordionActiveNum} link="https://dx.doi.org/10.1145/3313831.3376677" />
                  <AccordionItem title="Crowd Pilot Studies" content="Pilot studies are very common method of determining important design parameters of a crowdsourcing campaign. However, crowd pilot studies are critically underreported in the literature. This literature review shed light on this issue and provided recommendations for reporting crowd pilot studies." num="4" expandAccordion={expandAccordion} accordionActiveNum={accordionActiveNum} link="https://dx.doi.org/10.1145/3641023" />
                  <AccordionItem title="HCI Citation Practices" content="This metascience study investigated the rising number of references included in CHI articles, finding that if the current trend is not broken, articles in CHI 2030 will include on average over 130 references. The study also investigated a number of different co-occurring factors, such as an increase in the number of literature reviews in HCI and an increase in citations to arXiv and code repositories." num="5" expandAccordion={expandAccordion} accordionActiveNum={accordionActiveNum} link="https://chi-citation-practices.github.io/" link_is_doi={false} /> {/* https://arxiv.org/abs/2405.16526 */}
                </div>
              </div>

              <p>
              {/*
              In my research, I am interested in building socio-technical systems that allow humans and technology to work together to achieve tasks that would be beyond their individual capabilities. In the past, I have focused on facilitating knowledge transfer and supporting complex creative work.
              Currently, my scientific research interest is in prompt-based learning and generative artificial intelligence.
              */}
              My current research interests, based on the academic literature I read, are reflected <Link to="/research/interests/">on this page</Link>.
              A list of researchers who have inspired my work over the years can be found <Link to="/research/influences/">here</Link>.
              </p>

              <p>
                In my spare time, I enjoy dabbling with <Link to="/artworks/">AI-generated art</Link> and I am a <a href="/kettlebells/">kettlebell salesman</a>.
                  I have lived, studied, and/or worked in several countries including
                  Germany, Switzerland, France, the United Kingdom, Sweden,
                  Macedonia, the United States, and Finland.
              </p>

              <p style={{marginTop:'1rem'}}>
                  <i className="arrow right icon"></i>
                  Academic <a href="/cv/oppenlaender-cv.pdf">CV</a>
                  &nbsp;|&nbsp;
                  <a href="/cv/resume.pdf">Resume</a>
              </p>

            </div>
          </div>

          <div className="six wide computer
              seven wide tablet
              sixteen wide mobile
              column">
            <div className="row">

              {/*
              <p>
                Generative AI  is the  next  leap  in  human-machine  collaboration  that  transforms  industries,  labor  markets,  and society  on  a  scale  similar  to  the  internet, and personal computing.
                I have been interested in GenAI since 2021 when I learned about an image generation system called VQGAN-CLIP. It was crystal clear back then, that "prompt engineering" would become an important study area for human-computer interaction (HCI).
              </p>
              */}

              <img
                src={imgUrl}
                alt=""
                className="ui fluid rounded image"
                style={{
                  borderRadius: '10px',
                }}
              />

              {/*
                <p style={{marginTop:'1em'}}>
                  Tutkijatohtori (Postdoctoral Researcher)
                </p>
                <p>
                    University of Jyv&auml;skyl&auml;<br />
                    Faculty of Information Technology<br />
                    40014 University of Jyv&auml;skyl&auml;<br />
                    Finland<br />
                </p>
                <p>
                  E-Mail: jonas.x1.oppenlander@jyu.fi
                </p>
              */}
              {/*
              <p style={{marginTop:'2rem'}}>
                  <i className="arrow right icon"></i>
                  <a href="https://komasurfer.com/portfolio/">Project Portfolio</a>
              </p>
              */}

              <p style={{marginTop:'2rem', textAlign:'center'}}>
                <img src={Venn} style={{width:'100%'}} alt="" />
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
          {/*
          <a href="https://www.linkedin.com/in/jonasopp/" target="_blank" rel="noopener noreferrer">
              <i style={{display:'inline-block', width: '25px', height: '25px',
                backgroundImage: `url(${LINKEDIN})`,
                verticalAlign: 'middle', backgroundPosition: 'center center', lineHeight: 1,
                margin: '0 0.5rem 0 0rem', backgroundSize: 'cover', opacity: 0.45}} title="Jonas Oppenlaender on LinkedIn"></i>
          </a>
          */}
          <a href="https://github.com/joetm" target="_blank" rel="noopener noreferrer">
              <i title="Jonas Oppenlaender on GitHub" aria-hidden="true" className="grey github square big link icon"></i>
          </a>
          <a href="https://orcid.org/0000-0002-2342-1540" target="_blank" rel="noopener noreferrer">
              <i title="Jonas Oppenlaender on ORCID" className="academicon ai ai-orcid-square ai-2x"></i>
          </a>
          <a href="https://scholar.google.com/citations?hl=de&user=ucO_QYQAAAAJ" target="_blank" rel="noopener noreferrer">
              <i title="Jonas Oppenlaender on Google Scholar" className="academicon ai ai-google-scholar-square ai-2x"></i>
          </a>
      </div>
    </Layout>
  )
}

