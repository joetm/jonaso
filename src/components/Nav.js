import React from 'react'
import { Menu } from 'semantic-ui-react'
import { navigate } from "gatsby"

const styles = {
  navSpacer: {
    marginBottom: '2em',
  },
}


export default class Nav extends React.Component {
  state = {
    activeItem: 'home'
  }
  createMenu = ({item}) => {
    const { activeItem } = this.state
    const lcitem = item.toLowerCase()
    return (
      <Menu.Item name={lcitem} active={activeItem === lcitem} onClick={this.handleItemClick}>
        {item}
      </Menu.Item>
    )
  }
  handleItemClick = (e, { name }) => {
    e.preventDefault()
    this.setState({activeItem: name})
    if (name === 'home') {
      navigate('/')
    } else {
      navigate(`/${name}`)
    }
  }
  componentDidMount() {
    this.setState({activeItem: window.location.pathname.replace(/\//g, '') || 'home'})
  }
  render() {
    const MenuItem = this.createMenu
    return (
      <header>
        <Menu fluid pointing stackable secondary widths="6" style={styles.navSpacer}>
          <MenuItem item='Home' />
          <MenuItem item='Publications' />
          <MenuItem item='Projects' />
          <MenuItem item='CV' />
          <MenuItem item='Reading' />
          <MenuItem item='Interests' />
        </Menu>
      </header>
    )
  }
}
