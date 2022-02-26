import React from 'react'
import { navigate } from "gatsby"
import { Menu, Icon } from 'semantic-ui-react'

import { createMedia } from "@artsy/fresnel"
const { MediaContextProvider, Media } = createMedia({
  // breakpoints values can be either strings or integers
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
  state = {
    activeItem: 'home',
    menuIsOpen: false,
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
    this.setState({activeItem: name})
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
    this.setState({menuIsOpen: !this.state.menuIsOpen})
  }
  componentDidMount() {
    this.setState({activeItem: window.location.pathname.replace(/\//g, '') || 'home'})
  }
  render() {
    const MenuItem = this.createMenu
    const menuIsOpen = this.state.menuIsOpen
    return (
      <header>
        <MediaContextProvider>
          <Media at="sm">
            <Menu fluid pointing stackable secondary widths="7" style={styles.navSpacer}>
              <Menu.Item style={{cursor:'pointer'}} onClick={this.toggleMenu}>
                <Icon name="sidebar" size="large" />
              </Menu.Item>
              <div style={{display: menuIsOpen ? 'block' : 'none'}}>
                <MenuItem item='Home' />
                <MenuItem item='Publications' />
                <MenuItem item='Projects' />
                <MenuItem item='CV' />
                <MenuItem item='Reading' />
                <MenuItem item='Interests' url='/research/interests' />
              </div>
            </Menu>
          </Media>
          <Media at="md">
            <Menu fluid pointing stackable secondary widths="7" style={styles.navSpacer}>
              <MenuItem item='Home' />
              <MenuItem item='Publications' />
              <MenuItem item='Projects' />
              <MenuItem item='CV' />
              <MenuItem item='Reading' />
              <MenuItem item='Interests' url='/research/interests' />
              <MenuItem item='Influences' url='/research/influences' />
            </Menu>
          </Media>
        </MediaContextProvider>
      </header>
    )
  }
}
