import React from 'react'
import { navigate } from "gatsby"
import { Menu, Icon } from 'semantic-ui-react'

import { createMedia } from "@artsy/fresnel"
const { MediaContextProvider, Media } = createMedia({
  breakpoints: {
    sm: 0,
    md: 768,
  },
})

const styles = {
  navSpacer: {
    marginBottom: '2em',
  },
}


export default class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      activeItem: 'home',
      mobileMenuIsOpen: false,
      researchNavOpen: false,
    };
  }
  createMenu = ({item, url = null}) => {
    const { activeItem } = this.state
    const lcitem = item.toLowerCase()
    return (
      <Menu.Item
        name={lcitem}
        url={url}
        active={activeItem === lcitem}
        onClick={this.handleItemClick}
      >
        {item}
      </Menu.Item>
    ) //
  } 
  handleItemClick = (e, { name, url }) => {
    e.preventDefault()
    let activeItem = name.toLowerCase()
    this.setState({ activeItem })
    if (name === 'home') {
      navigate('/')
    } else {
      if (url) {
        url = url.charAt(0) === '/' ? url.slice(1) : url;
        navigate(`/${url}`)
      } else {
        navigate(`/${name}`)
      }
    }
  }
  toggleMenu = (e) => {
    e.preventDefault()
    this.setState({mobileMenuIsOpen: !this.state.mobileMenuIsOpen})
  }
  prepareUrl(url) {
    return url.replace(/\//g, '').toLowerCase()
  }
  componentDidMount() {
    let url = this.prepareUrl(window.location.pathname)
    let researchNavOpen = url.startsWith('research')
    this.setState({
      activeItem: url || 'home',
      researchNavOpen,
    })
  }
  render() {
    const { activeItem, researchNavOpen, mobileMenuIsOpen } = this.state
    const MenuItem = this.createMenu
    return (
      <header>
        <MediaContextProvider>

          <Media at="md">
            <Menu fluid pointing stackable primary="true" widths="7">
              <MenuItem active={activeItem === 'home'} item='Home' />
              <MenuItem active={activeItem === 'publications'} item='Publications' />
              <MenuItem active={activeItem.startsWith('artworks')} item='Artworks' />
              <MenuItem active={activeItem === 'projects'} item='Projects' />
              <MenuItem active={activeItem === 'cv'} item='CV' />
              <MenuItem active={activeItem.startsWith('research')} item='Research' link={false} header={true} />
            </Menu>
            {
              researchNavOpen &&
                <Menu pointing stackable secondary size="small" widths="7">
                  <MenuItem active={activeItem === 'researchinterests'} item='Interests' url='/research/interests' />
                  <MenuItem active={activeItem === 'researchreading'} item='Reading' url='/research/reading' />
                  <MenuItem active={activeItem === 'researchinfluences'} item='Influences' url='/research/influences' />
                </Menu>
            }
          </Media>

          {/* Mobile Navigation Menu */}
          <Media at="sm">
            <Menu fluid pointing stackable secondary widths="7" style={{display: 'none'}}>
              <Menu.Item style={{cursor:'pointer'}} onClick={this.toggleMenu}>
                <Icon name="sidebar" size="large" />
              </Menu.Item>
              {
                mobileMenuIsOpen &&
                  <React.Fragment>
                    <MenuItem active={activeItem === 'home'} item='Home' />
                    <MenuItem active={activeItem === 'publications'} item='Publications' />
                    <MenuItem active={activeItem.startsWith('artworks')} item='Artworks' />
                    <MenuItem active={activeItem === 'projects'} item='Projects' />
                    <MenuItem active={activeItem === 'cv'} item='CV' />
                    <MenuItem active={activeItem === 'researchreading'} item='Reading' />
                    <MenuItem active={activeItem === 'researchinterests'} item='Interests' url='/research/interests' />
                    <MenuItem active={activeItem === 'researchinfluences'} item='Influences' url='/research/influences' />
                  </React.Fragment>
              }
            </Menu>
          </Media>

        </MediaContextProvider>
        <div style={styles.navSpacer}></div>
      </header>
    )
  }
}
