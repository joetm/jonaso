"use client"

import { navigate } from "gatsby"
import React, { useEffect, useState } from "react"


const styles = {
  navSpacer: {
    marginBottom: '2em',
  }
}


const MenuItem = ({active, item, url=null, link=null, handleItemClick=null}) => {
    if (link) {
      return (
        <a
          key={item}
          href={link}
          name={item}
          target='_blank'
          rel="noreferrer"
          tabIndex={-42}
          role='presentation'
          className={"item" + (active ? ' active' : '')}
        >
          {item}
        </a>
      )
    }
    return (
      <a
        key={item}
        href={url}
        name={item}
        target={link ? '_blank' : '_self'}
        rel="noreferrer"
        tabIndex={-42}
        role='presentation'
        onClick={handleItemClick}
        className={"item" + (active ? ' active' : '')}
      >
        {item}
      </a>
    )
}

const CVMenuItem = ({active, item, link=null}) => {
    return (
      <a
        key={item}
        href={link}
        name={item}
        target='_blank'
        rel="noreferrer"
        tabIndex={-42}
        role='presentation'
        className={"item" + (active ? ' active' : '')}
      >
        {item}
        <i aria-hidden="true" class="file pdf outline large icon" style={{marginLeft:'.2em'}}></i>
      </a>
    )
}


export default function Nav() {
  const [activeItem, setActiveItem] = useState('')
  // const [researchNavOpen, setResearchNavOpen] = useState(false)

  function handleItemClick(e) {
    e.preventDefault()
    let targeturl = e.target.getAttribute('href')
    const activeItem = e.target.name.toLowerCase()
    setActiveItem(activeItem)
    if (targeturl) {
      targeturl = targeturl.charAt(0) === '/' ? targeturl.slice(1) : targeturl;
      navigate(`/${targeturl}`)
    } else {
      if (activeItem === 'home') {
        navigate('/')
      } else {
        navigate(`/${activeItem}`)
      }
    }
  }

  useEffect(() => {
    const url = window.location.pathname.replace(/\//g, '').toLowerCase()
    setActiveItem(url || 'home')
    // const navstate = url.startsWith('research') || url.startsWith('projects')
    // setResearchNavOpen(navstate)
  }, [])

  return (
    <header>
      <div id="desktopmenu">
        <div className="ui fluid pointing stackable seven item menu" primary="true">
          <MenuItem key="home" active={activeItem === 'home'} item='Home' handleItemClick={handleItemClick} />
          <MenuItem key="publications" active={activeItem === 'publications'} item='Publications' handleItemClick={handleItemClick} />
          {/*
          <MenuItem key="oracle" active={activeItem === 'oracle'} item='Oracle' handleItemClick={handleItemClick} />
          */}
{/*          <MenuItem
            key="research"
            active={activeItem.startsWith('research') || activeItem === 'projects'}
            item='Research Interests'
            url='/research/interests'
            header={true}
            handleItemClick={handleItemClick}
          />
*/}
          <MenuItem
            key="researchinterests"
            active={activeItem === 'research' || activeItem === 'researchinterests'}
            item='Research Interests'
            url='/research/interests'
            handleItemClick={handleItemClick}
          />
          <MenuItem
            key="researchprojects"
            active={activeItem === 'researchprojects'}
            item='Research Projects'
            url='/research/projects'
            handleItemClick={handleItemClick}
          />
          <MenuItem
            key="art"
            active={activeItem.startsWith('art')}
            item='Art'
            link={false}
            header={true}
            handleItemClick={handleItemClick}
          />
          <MenuItem
            key="webdev"
            active={activeItem === 'webdev'}
            item='WebDev Portfolio'
            link='https://komasurfer.com/portfolio/'
          />
          {/*
          <CVMenuItem
            key="cv"
            active={activeItem === 'cv'}
            item='CV'
            link="/cv/oppenlaender-cv.pdf"
          />
          */}
        </div>
        {/*
          researchNavOpen &&
            <div className="ui small pointing secondary stackable seven item menu">
              <MenuItem
                key="researchapplications"
                active={activeItem === 'researchapplications'}
                item='Application Domains'
                url='/research/applications'
                handleItemClick={handleItemClick}
              />
              <MenuItem
                key="researchreading"
                active={activeItem === 'researchreading'}
                item='Reading'
                url='/research/reading'
                handleItemClick={handleItemClick}
              />
              <MenuItem key="researchnetwork"      active={activeItem === 'researchnetwork'}      item='Network' url='/research/network' handleItemClick={handleItemClick} />
              <MenuItem key="researchinfluences"
                active={activeItem === 'researchinfluences'}
                item='Influences'
                url='/research/influences'
                handleItemClick={handleItemClick}
              />
            </div>
        */}
      </div>
      <div style={styles.navSpacer}></div>
    </header>
  )
}
