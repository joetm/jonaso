import React, { Component } from 'react'
import { Input, Menu } from 'semantic-ui-react'
import { navigateTo } from "gatsby-link"

const styles = {
  spacer: {
    marginBottom: '2em',
  },
}


export default class Nav extends Component {
  state = {
    activeItem: 'home'
  }
  handleItemClick = (e, { name }) => {
    this.setState({activeItem: name})
    if (name === 'home') {
      navigateTo('/')
    } else {
      navigateTo(`/${name}`)
    }
  }
  render() {
    const { activeItem } = this.state
    // console.log('activeItem:', activeItem)
    return (
      <Menu fluid pointing stackable secondary widths="6" style={styles.spacer}>
        <Menu.Item name='home' active={activeItem === 'home'} onClick={this.handleItemClick}>
          Home
        </Menu.Item>
        <Menu.Item name='publications' active={activeItem === 'publications'} onClick={this.handleItemClick}>
          Publications
        </Menu.Item>
        <Menu.Item name='cv' active={activeItem === 'cv'} onClick={this.handleItemClick}>
          CV
        </Menu.Item>
        {/*
          <Menu.Menu position='right'>
            <Menu.Item>
              <Input icon='search' placeholder='Search...' />
            </Menu.Item>
          </Menu.Menu>
        */}
      </Menu>
    )
  }
}
