"use client"

import { useState, useEffect } from 'react'
import { navigate } from "gatsby"

const styles = {
  navSpacer: {
    marginBottom: '2em',
  },
}


const MenuItem = ({active, handleItemClick, item, url = null}) => {
    return (
      <a
        key={item}
        className={"item" + (active ? ' active' : '')}
        name={item}
        url={url}
        onClick={handleItemClick}
      >
        {item}
      </a>
    ) //
}

function prepareUrl(url) {
  return url.replace(/\//g, '').toLowerCase()
}

export default function Nav() {
  const [activeItem, setActiveItem] = useState('')
  const [researchNavOpen, setResearchNavOpen] = useState(false)

  function handleItemClick(e) {
    e.preventDefault()
    const name = e.target.name
    let url = e.target.getAttribute('url')
    const activeItem = name.toLowerCase()
    setActiveItem(activeItem)
    if (url) {
      url = url.charAt(0) === '/' ? url.slice(1) : url;
      navigate(`/${url}`)
    } else {
      if (activeItem === 'home') {
        navigate('/')
      } else {
        navigate(`/${activeItem}`)
      }
    }
  }

  useEffect(() => {
    const url = prepareUrl(window.location.pathname)
    const navstate = url.startsWith('research') || url.startsWith('projects')
    setActiveItem(url || 'home')
    setResearchNavOpen(navstate)
  }, [])

  return (
    <header>
      <div id="desktopmenu">
        <div className="ui fluid pointing stackable seven item menu" primary="true">
          <MenuItem key="home"  active={activeItem === 'home'} item='Home' handleItemClick={handleItemClick} />
          <MenuItem key="artworks" active={activeItem.startsWith('artworks')} item='Artworks' link={false} header={true} handleItemClick={handleItemClick} />
          <MenuItem key="publications" active={activeItem === 'publications'} item='Publications' handleItemClick={handleItemClick} />
          <MenuItem key="research" active={activeItem.startsWith('research') || activeItem === 'projects'} item='Research' link={false} header={true} handleItemClick={handleItemClick} />
          <MenuItem key="cv" active={activeItem === 'cv'} item='CV' handleItemClick={handleItemClick} />
        </div>
        {
          researchNavOpen &&
            <div className="ui small pointing secondary stackable seven item menu">
              <MenuItem key="researchinterests"  active={activeItem === 'research' || activeItem === 'researchinterests'}  item='Interests' url='/research/interests' handleItemClick={handleItemClick} />
              <MenuItem key="researchprojects"   active={activeItem === 'researchprojects'}   item='Projects' url='/research/projects' handleItemClick={handleItemClick} />
              <MenuItem key="researchreading"    active={activeItem === 'researchreading'}    item='Reading' url='/research/reading' handleItemClick={handleItemClick} />
              {/*
              <MenuItem key="researchnetwork"    active={activeItem === 'researchnetwork'}    item='Network' url='/research/network' handleItemClick={handleItemClick} />
              */}
              <MenuItem key="researchinfluences" active={activeItem === 'researchinfluences'} item='Influences' url='/research/influences' handleItemClick={handleItemClick} />
            </div>
        }
      </div>
      <div style={styles.navSpacer}></div>
    </header>
  )
}
