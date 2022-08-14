import React from 'react'
import { navigate } from "gatsby"
import { Menu } from 'semantic-ui-react'
// import ResponsiveMenu from './ResponsiveMenu'

const styles = {
  navSpacer: {
    marginBottom: '2em',
  },
}


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


export default class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      activeItem: 'home',
      mobileMenuIsOpen: false,
      researchNavOpen: false,
    };
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
    return (
      <header>
        {/*
          <ResponsiveMenu active={activeItem} handleItemClick={this.handleItemClick} mobileMenuIsOpen={mobileMenuIsOpen} researchNavOpen={researchNavOpen} />
        */}
      <div id="desktopmenu">
        <Menu fluid pointing stackable primary="true" widths="7">
          <MenuItem active={activeItem === 'home'} item='Home' handleItemClick={this.handleItemClick} />
          <MenuItem active={activeItem === 'publications'} item='Publications' handleItemClick={this.handleItemClick} />
          <MenuItem active={activeItem.startsWith('artworks')} item='Artworks' link={false} header={true} handleItemClick={this.handleItemClick} />
          <MenuItem active={activeItem === 'projects'} item='Projects' handleItemClick={this.handleItemClick} />
          <MenuItem active={activeItem === 'cv'} item='CV' handleItemClick={this.handleItemClick} />
          <MenuItem active={activeItem.startsWith('research')} item='Research' link={false} header={true} handleItemClick={this.handleItemClick} />
        </Menu>
        {
          researchNavOpen &&
            <Menu pointing stackable secondary size="small" widths="7">
              <MenuItem active={activeItem === 'researchinterests'} item='Interests' url='/research/interests' handleItemClick={this.handleItemClick} />
              <MenuItem active={activeItem === 'researchreading'} item='Reading' url='/research/reading' handleItemClick={this.handleItemClick} />
              <MenuItem active={activeItem === 'researchinfluences'} item='Influences' url='/research/influences' handleItemClick={this.handleItemClick} />
            </Menu>
        }
        </div>
        <div style={styles.navSpacer}></div>
      </header>
    )
  }
}
