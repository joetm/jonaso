import React from 'react'
import { navigate } from "gatsby"
import { Menu } from 'semantic-ui-react'
import ResponsiveMenu from './ResponsiveMenu'

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
  // Faux Menu on first render
  FauxMenu() {
    return (
      <div id="fauxmenu">
        <Menu fluid pointing stackable secondary primary="true" widths="7"></Menu>
      </div>
    )
  }
  render() {
    const { activeItem, researchNavOpen, mobileMenuIsOpen } = this.state
    const isBrowser = typeof window !== 'undefined'
    return (
      <header>
        {
          isBrowser ? 
            <ResponsiveMenu active={activeItem} handleItemClick={this.handleItemClick} mobileMenuIsOpen={mobileMenuIsOpen} researchNavOpen={researchNavOpen} />
            : this.FauxMenu()
        }
        <div style={styles.navSpacer}></div>
      </header>
    )
  }
}
