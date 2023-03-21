"use client"

import 'semantic-ui-css/components/icon.min.css'

import React from 'react'
import { Menu } from 'semantic-ui-react'
import Icon from 'semantic-ui-react/dist/es/elements/Icon/Icon.js'

const MenuItem = ({activeItem, handleItemClick, item, url = null}) => {
    const lcitem = item.toLowerCase()
    return (
      <Menu.Item
        name={lcitem}
        url={url}
        active={activeItem === lcitem}
        onClick={handleItemClick}
      >
        {item}
      </Menu.Item>
    ) //
}

// Desktop Navigation Menu
const DesktopMenu = ({activeItem, researchNavOpen, handleItemClick}) => (
          <div id="desktopmenu">
            <Menu fluid pointing stackable primary="true" widths="7">
              <MenuItem active={activeItem === 'home'} item='Home' handleItemClick={handleItemClick} />
              <MenuItem active={activeItem === 'publications'} item='Publications' handleItemClick={handleItemClick} />
              <MenuItem active={activeItem.startsWith('artworks')} item='Artworks' link={false} header={true} handleItemClick={handleItemClick} />
              <MenuItem active={activeItem === 'projects'} item='Projects' handleItemClick={handleItemClick} />
              <MenuItem active={activeItem === 'cv'} item='CV' handleItemClick={handleItemClick} />
              <MenuItem active={activeItem.startsWith('research')} item='Research' link={false} header={true} handleItemClick={handleItemClick} />
            </Menu>
            {
              researchNavOpen &&
                <Menu pointing stackable secondary size="small" widths="7">
                  <MenuItem active={activeItem === 'researchinterests'} item='Interests' url='/research/interests' handleItemClick={handleItemClick} />
                  <MenuItem active={activeItem === 'researchreading'} item='Reading' url='/research/reading' handleItemClick={handleItemClick} />
                  <MenuItem active={activeItem === 'researchinfluences'} item='Influences' url='/research/influences' handleItemClick={handleItemClick} />
                </Menu>
            }
            </div>
) //

// Mobile Navigation Menu
const MobileMenu = ({activeItem, mobileMenuIsOpen, handleItemClick}) => (
            <div id="mobilemenu">
            <Menu fluid pointing stackable secondary widths="7">
              <Menu.Item style={{cursor:'pointer'}} onClick={this.toggleMenu}>
                <Icon name="sidebar" size="large" />
              </Menu.Item>
              {
                mobileMenuIsOpen &&
                  <React.Fragment>
                    <MenuItem active={activeItem === 'home'} item='Home' handleItemClick={handleItemClick} />
                    <MenuItem active={activeItem === 'publications'} item='Publications' handleItemClick={handleItemClick} />
                    <MenuItem active={activeItem.startsWith('artworks')} item='Artworks' handleItemClick={handleItemClick} />
                    <MenuItem active={activeItem === 'projects'} item='Projects' handleItemClick={handleItemClick} />
                    <MenuItem active={activeItem === 'cv'} item='CV' handleItemClick={handleItemClick} />
                    <MenuItem active={activeItem === 'researchreading'} item='Reading' handleItemClick={handleItemClick} />
                    <MenuItem active={activeItem === 'researchinterests'} item='Interests' url='/research/interests' handleItemClick={handleItemClick} />
                    <MenuItem active={activeItem === 'researchinfluences'} item='Influences' url='/research/influences' handleItemClick={handleItemClick} />
                  </React.Fragment>
              }
            </Menu>
          </div>
) //


// Faux Menu on first render
const FauxMenu = () => {
  return (
    <div id="fauxmenu">
      <Menu fluid pointing stackable secondary primary="true" widths="7"></Menu>
    </div>
  )
}


// const ResponsiveMenu = ({active, researchNavOpen, mobileMenuIsOpen, handleItemClick}) => {
//   // const isBrowser = typeof window !== 'undefined'
//   const breakpoint = 620
//   const [width, setWidth] = React.useState(window.innerWidth)
//   React.useEffect(() => {
//     const handleWindowResize = () => setWidth(window.innerWidth)
//      window.addEventListener("resize", handleWindowResize)
//     return () => window.removeEventListener("resize", handleWindowResize)
//   }, [])
//   return width < breakpoint ?
//       <MobileMenu  activeItem={active} handleItemClick={handleItemClick} mobileMenuIsOpen={mobileMenuIsOpen} />
//     : <DesktopMenu activeItem={active} handleItemClick={handleItemClick} researchNavOpen={researchNavOpen}   />
// }

export default class ResponsiveMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      M: FauxMenu(),
    };
  }
  componentDidMount() {
    const { active, researchNavOpen, mobileMenuIsOpen, handleItemClick } = this.props
    const breakpoint = 620
    const width = window.innerWidth
    this.setState({
      M: width < breakpoint ?
        <MobileMenu  activeItem={active} handleItemClick={handleItemClick} mobileMenuIsOpen={mobileMenuIsOpen} />
        : <DesktopMenu activeItem={active} handleItemClick={handleItemClick} researchNavOpen={researchNavOpen}   />
    })
  }
  render() {
    const { M } = this.state
    return ( M )
  }
}
