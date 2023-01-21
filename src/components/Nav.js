import React from 'react'
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


export default class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      activeItem: '',
      researchNavOpen: false,
    };
  }
  handleItemClick = (e) => {
    e.preventDefault()
    const name = e.target.name
    let url = e.target.getAttribute('url')
    console.log(name, url)
    const activeItem = name.toLowerCase()
    this.setState({ activeItem })
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
  prepareUrl(url) {
    return url.replace(/\//g, '').toLowerCase()
  }
  componentDidMount() {
    let url = this.prepareUrl(window.location.pathname)
    let researchNavOpen = url.startsWith('research') || url.startsWith('projects')
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
          <div className="ui fluid pointing stackable seven item menu" primary="true">
            <MenuItem key="home"  active={activeItem === 'home'} item='Home' handleItemClick={this.handleItemClick} />
            <MenuItem key="artworks" active={activeItem.startsWith('artworks')} item='Artworks' link={false} header={true} handleItemClick={this.handleItemClick} />
            <MenuItem key="publications" active={activeItem === 'publications'} item='Publications' handleItemClick={this.handleItemClick} />
            <MenuItem key="research" active={activeItem.startsWith('research') || activeItem === 'projects'} item='Research' link={false} header={true} handleItemClick={this.handleItemClick} />
            <MenuItem key="cv" active={activeItem === 'cv'} item='CV' handleItemClick={this.handleItemClick} />
          </div>
          {
            researchNavOpen &&
              <div className="ui small pointing secondary stackable seven item menu">
                <MenuItem key="researchinterests"  active={activeItem === 'research' || activeItem === 'researchinterests'}  item='Interests' url='/research/interests' handleItemClick={this.handleItemClick} />
                <MenuItem key="researchprojects"   active={activeItem === 'researchprojects'}   item='Projects' url='/research/projects' handleItemClick={this.handleItemClick} />
                <MenuItem key="researchreading"    active={activeItem === 'researchreading'}    item='Reading' url='/research/reading' handleItemClick={this.handleItemClick} />
                {/*
                <MenuItem key="researchnetwork"    active={activeItem === 'researchnetwork'}    item='Network' url='/research/network' handleItemClick={this.handleItemClick} />
                */}
                <MenuItem key="researchinfluences" active={activeItem === 'researchinfluences'} item='Influences' url='/research/influences' handleItemClick={this.handleItemClick} />
              </div>
          }
        </div>
        <div style={styles.navSpacer}></div>
      </header>
    )
  }
}
