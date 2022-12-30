import React from 'react'
import { navigate } from "gatsby"
import { Menu } from 'semantic-ui-react'

const styles = {
  navSpacer: {
    marginBottom: '2em',
  },
}


const MenuItem = ({active, handleItemClick, item, url = null}) => {
    return (
      <Menu.Item
        name={item}
        url={url}
        active={active}
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
      activeItem: '',
      researchNavOpen: false,
    };
  }
  handleItemClick = (e, { name, url }) => {
    e.preventDefault()
    const activeItem = name.toLowerCase()
    this.setState({ activeItem })
    if (activeItem === 'home') {
      navigate('/')
    } else {
      if (url) {
        url = url.charAt(0) === '/' ? url.slice(1) : url;
        navigate(`/${url}`)
      } else {
        navigate(`/${activeItem}`)
      }
    }
  }
  prepareUrl(url) {
    return url.replace(/\//g, '').toLowerCase()
  }
  componentDidMount() {
    let url = this.prepareUrl(window.location.pathname)
    let researchNavOpen = url.startsWith('research') || url.startsWith('publications') || url.startsWith('projects')
    this.setState({
      activeItem: url || 'home',
      researchNavOpen,
    })
  }
  render() {
    const { activeItem, researchNavOpen } = this.state

    return (
      <header>
        <div id="desktopmenu">
          <Menu fluid pointing stackable primary="true" widths="7">
            <MenuItem key="home" active={activeItem === 'home'} item='Home' handleItemClick={this.handleItemClick} />
            <MenuItem key="artworks" active={activeItem.startsWith('artworks')} item='Artworks' link={false} header={true} handleItemClick={this.handleItemClick} />
            <MenuItem key="cv" active={activeItem === 'cv'} item='CV' handleItemClick={this.handleItemClick} />
            <MenuItem key="research" active={activeItem.startsWith('research') || activeItem === 'publications' || activeItem === 'projects'} item='Research' link={false} header={true} handleItemClick={this.handleItemClick} />
          </Menu>
          {
            researchNavOpen &&
              <Menu pointing stackable secondary size="small" widths="7">
                <MenuItem key="publications" active={activeItem === 'research' || activeItem === 'publications'} item='Publications' handleItemClick={this.handleItemClick} />
                <MenuItem key="projects" active={activeItem === 'projects'} item='Projects' handleItemClick={this.handleItemClick} />
                <MenuItem key="researchinterests" active={activeItem === 'researchinterests'} item='Interests' url='/research/interests' handleItemClick={this.handleItemClick} />
                <MenuItem key="researchreading" active={activeItem === 'researchreading'} item='Reading' url='/research/reading' handleItemClick={this.handleItemClick} />
                <MenuItem key="researchinfluences" active={activeItem === 'researchinfluences'} item='Influences' url='/research/influences' handleItemClick={this.handleItemClick} />
              </Menu>
          }
        </div>
        <div style={styles.navSpacer}></div>
      </header>
    )
  }
}
