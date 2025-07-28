"use client"

import 'semantic-ui-css/components/checkbox.min.css'
import 'semantic-ui-css/components/label.min.css'

import '../css/fields.css'

import React, { useState, useEffect, useRef } from "react"
import md5 from "md5"
import Sidebar from "./AuthorListSidebar"

const _PUB_URL = `/static/publications.json`

const styles = {
  label: {
    marginBottom: '0.5em',
    marginRight: '1em',
    float:'left',
  },
  coauthor: {
    textDecoration: 'underline',
  },
}

// const formula = () => (
//   <div style={{ display: 'inline-flex', alignItems: 'baseline' }}>
//     <span style={{ marginRight: '10px' }}>recency factor = &sum; (</span>
//     <span style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center' }}>
//       <span style={{ paddingBottom: '5px' }}>
//         priority × (decay_factor<sup style={{ fontSize: '0.8em' }}>(current_year - year)</sup>)
//       </span>
//     </span>
//     <span style={{ marginLeft: '10px' }}>)</span>
//   </div>
// ) //


export default function AuthorList({ list }) {
  const [details, setDetails] = useState({})
  const [activeid, setActiveid] = useState(null)
  const [activeAuthors, setActiveAuthors] = useState([])
  const [activeKeyword, setActiveKeyword] = useState(null)
  const [coauthorToggleActive, setCoauthorToggleActive] = useState(false)
  const [mycoauthors, setCoauthors] = useState([])

  const sidebarRef = useRef(null)

  useEffect(() => {
    fetch(_PUB_URL).then(res => res.json()).then(pubs => {
      const authors = []
      pubs.filter(pub => typeof pub['author'] != "undefined").forEach(pub => {
          pub.author.forEach(author => {
            if (author['dropping-particle']) {
              author = `${author.given} ${author['dropping-particle']} ${author.family}`.toLowerCase()
            } else {
              author = `${author.given} ${author.family}`.toLowerCase()
            }
            if (!authors.includes(author)) {
              authors.push(author)
            }
          })
      })
      setCoauthors(authors)
    })
  }, [])

  useEffect(() => {
    function handleClickOutside(event) {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        closeSidebar()
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => { document.removeEventListener('mousedown', handleClickOutside) }
  }, [])

  function updateActive(obj) {
    setActiveid(obj.activeid || null)
    setActiveAuthors(obj.activeAuthors || [])
  }

  function closeSidebar() {
      setActiveid(null)
      setActiveAuthors([])
  }

  function keywordClick(e) {
    const keyword = e.target.innerText
    // toggle the checkbox off
    setCoauthorToggleActive(false)
    // click on already active author?
    if (keyword === activeKeyword) {
      // deselect this author
      setActiveKeyword(null)
      setActiveAuthors([])
      return
    }
    // load the authors of this keyword
    const kwid = md5(keyword)
    fetch(`https://raw.githubusercontent.com/joetm/jonaso/master/reading_list/keywordauthors/${kwid}.json`)
    .then(res => res.json())
    .then(aAuthors => {
  	  setActiveKeyword(keyword)
  	  setActiveAuthors(aAuthors)
    })
  }

  function toggleCoauthors(authorid) {
    if (coauthorToggleActive) {
      setActiveAuthors([])
      // deselect highlighted keyword
      // deselect all highlighted coauthors
      setActiveKeyword(null)
      setCoauthorToggleActive(false)
      return
    }
    setCoauthorToggleActive(true)
    const url = `https://raw.githubusercontent.com/joetm/jonaso/master/reading_list/coauthors/${authorid}.json`
    fetch(url).then(res => res.json())
    .then(aAuthors => {
      setActiveAuthors(aAuthors)
      // deselect highlighted keyword
      setActiveKeyword(null)
    })
  }
  
  function getAuthorDetails(author) {
    // up to three requests to fetch author details
    const id = author.id
    if (id === activeid) {
      // remove, when the same author is clicked a second time
      const dcopy = Object.assign({}, details)
      delete dcopy[id]
      setDetails(dcopy)
      setCoauthorToggleActive(false)
      updateActive({activeid: null, activeAuthors: []})
      return
    }
    // reset the highlighted labels
    setActiveKeyword(null)
    setCoauthorToggleActive(false)
    setActiveAuthors([])
    // cache check
    if (details[id]) {
      setActiveid(id)
      return
    }
    // load from remote
    const url = `https://raw.githubusercontent.com/joetm/jonaso/master/reading_list/influencers/${id}.json`
    fetch(url).then(res => res.json())
    .then(res => {
      const dcopy = Object.assign({}, details)
      // example: {"docs":[{"title":"Arboretum and Arbility: Improving Web Accessibility Through a Shared Browsing Architecture","priority":3}]}
      dcopy[id] = res
      setDetails(dcopy)
      updateActive({activeid: id})
    })
  }

  // need to get min and max for color scaling:
  // const maxNum = Math.max.apply(Math, list.map(o => o.num))
  // const maxPrio = Math.max.apply(Math, list.map(o => o.priority))

  if (!list) {
    return null
  }

  return (
    <>
      {
        list.map((author, index) => {
          if (author.name === 'Jonas Oppenlaender') {
            return (<React.Fragment key={`${index}_${author.id}`}></React.Fragment>) //
          }
          // label color
          let labelColor = null
          if (activeAuthors.includes(author.id)) {
        		labelColor = 'black'
          }
          if (activeid === author.id) {
        		labelColor = 'red'
          }
          if (!['black', 'red'].includes(labelColor)) {
            labelColor = author.area ? 'ra ' + author.area.replace(" ", "_").replace("/", ".") : 'black'
          }
         // color scaling based on priority of this author
      	 // labelColor = scaleLabelColor(author.priority / maxPrio)
         // return the list of authors
          return (
            <div key={`${index}_${author.id}`} id={author.id}>
              <a
                className={`ui label ` + labelColor}
                style={{...styles.label, opacity: author.name === 'Jonas Oppenlaender' ? 0.6 : 1}}
                color={labelColor}
                title={(author.num > 1 ? `Research area: ${author.area}` + `, ${author.num} publications` : author.num + ' publication') + ', recency factor ' + Number(author.recency.toFixed(2))}
                onClick={() => getAuthorDetails(author)}
              >
                {
                  mycoauthors.includes(author.name.toLowerCase()) ? (<span style={styles.coauthor}>{author.name}</span>) : author.name
                }
                <div className="detail">{author.num} | {Number(author.recency.toFixed(2))}</div>
              </a>
                {details[author.id] && activeid === author.id &&
                  <Sidebar
                  	authorid={author.id}
                    authorname={author.name}
                    forwardRef={sidebarRef}
                  	activeKeyword={activeKeyword}
                  	details={details[author.id]}
                    area={author.area}
                  	keywordClick={keywordClick}
                    closeSidebar={closeSidebar}
                    toggleCoauthors={toggleCoauthors}
                    coauthorToggleActive={coauthorToggleActive}
                    updateActive={updateActive}
                  />
                }
            </div>
          )
        })
      }
    </>
  )
}
