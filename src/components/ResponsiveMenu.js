import React from 'react'
import { Menu, Icon } from 'semantic-ui-react'

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


const ResponsiveMenu = ({active, researchNavOpen, mobileMenuIsOpen, handleItemClick}) => {
  // const isBrowser = typeof window !== 'undefined'
  const [width, setWidth] = React.useState(window.innerWidth)
  const breakpoint = 620
  React.useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth)
     window.addEventListener("resize", handleWindowResize)
    return () => window.removeEventListener("resize", handleWindowResize)
  }, [])
  return width < breakpoint ?
      <MobileMenu  activeItem={active} handleItemClick={handleItemClick} mobileMenuIsOpen={mobileMenuIsOpen} />
    : <DesktopMenu activeItem={active} handleItemClick={handleItemClick} researchNavOpen={researchNavOpen}   />
}

export default ResponsiveMenu
