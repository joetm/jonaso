/*
  DEV: this is supposed to become an up-to-date reading list synced from my PC
*/

import React from "react"
import { Container, Label, Checkbox } from 'semantic-ui-react'
import md5 from "md5"

import "./influencer.css"


const styles = {
  label: {
    marginBottom: '0.5em',
    marginRight: '1em',
    float:'left',
  },
  coauthor: {
    textDecoration: 'underline',
  },
}


// ----------------

const Wrapper = {
  KeywordWrapper: ({title, items}) => (
    <div className="wrapperBox">
      <h4>{title}</h4>
      <div style={{clear:'both'}}>{items}</div>
    </div>
  ),
  CoauthorWrapper: ({title, authorid, toggleCoauthors, coauthorToggleActive}) => (
    <div className="wrapperBox">
      <h4>{title}</h4>
      <div><Checkbox checked={coauthorToggleActive} onChange={() => toggleCoauthors(authorid)} label='Show co-authors' toggle /></div>
    </div>
  ),
  PubWrapper: ({title, items}) => (
    <div className="wrapperBox">
      <h4>{title}</h4>
      <ol>{items}</ol>
    </div>
  ),
}

// ----------------

const DetailContainer = ({authorid, details, priority, keywordClick, activeKeyword, toggleCoauthors, coauthorToggleActive}) => {
  const { docs=[], keywords=[] } = details
  // const kwlist = keywords.join(", ")
  const kwlist = keywords.map((kw, i) => (
    <Label
      style={styles.label}
      as="a"
      color={activeKeyword === kw ? 'orange' : 'teal'}
      onClick={(e) => keywordClick(e)}
      key={`kw${i}${authorid}${kw}`}
    >{kw}</Label>
  )) //`;

  const publist = docs.filter(doc => doc.priority === priority).map((doc, i) => (
            <li key={`p${i}${authorid}${doc.priority}${doc.title}`}>{doc.title}</li>
        )) //`

  return (
    <div className="clear" key={`a-a${authorid}`}>
      <Wrapper.KeywordWrapper title="Keywords" items={kwlist} />
      <Wrapper.CoauthorWrapper title="Co-Authors" authorid={authorid} toggleCoauthors={toggleCoauthors} coauthorToggleActive={coauthorToggleActive} />
      <Wrapper.PubWrapper title="Publications" items={publist} />
    </div>
  )
} //


class AuthorList extends React.Component {
  state = {
    details: {}, // cache of details
    activeKeyword: null,
    coauthorToggleActive: false,
    coauthors: [],
  }
  componentDidMount() {
    const url = `https://jonaso.de/static/publications.json`
    const coauthors = []
    fetch(url).then(response => {
      if (response.status === 404) {
        return []
      } else {
        if (response.status >= 400) {
          throw new Error("Bad response from server")
        }
      }
      return response.json()
    })
    .then(ownPublications => {
      ownPublications.filter(pub => typeof pub['author'] != "undefined").forEach(pub => {
          pub.author.forEach(author => {
            if (author['dropping-particle']) {
              author = `${author.given} ${author['dropping-particle']} ${author.family}`.toLowerCase()
            } else {
              author = `${author.given} ${author.family}`.toLowerCase()
            }
            if (!coauthors.includes(author)) {
              coauthors.push(author)
            }
          })
      })
      this.setState({ coauthors })
    })
  }
  keywordClick = (e) => {
    const { updateActive } = this.props
    const { activeKeyword } = this.state
    const keyword = e.target.innerText
    // console.info('Querying keyword:', keyword)
    // toggle the checkbox off
    this.setState({coauthorToggleActive: false})
    // click on already active author?
    if (keyword === activeKeyword) {
      // deselect this author
      this.setState({ activeKeyword: null })
      updateActive({ activeAuthors: [] })
      return
    }
    // load the authors of this keyword
    const kwid = md5(keyword);
    const url = `https://raw.githubusercontent.com/joetm/jonaso/master/reading_list/keywordauthors/${kwid}.json`
    fetch(url)
    .then(response => {
      if (response.status === 404) {
        // no authors found. Just highlight the clicked keyword.
        return []
      } else {
        if (response.status >= 400) {
          throw new Error("Bad response from server")
        }
      }
      return response.json()
    })
    .then(activeAuthors => {
      // console.info("Ajax response", activeAuthors)
  	  this.setState({ activeKeyword: keyword })
  	  updateActive({ activeAuthors })
    })
  }
  toggleCoauthors = (authorid) => {
    const { coauthorToggleActive } = this.state
    const { updateActive } = this.props
    if (coauthorToggleActive) {
      updateActive({ activeAuthors: [] })
      // deselect highlighted keyword
      // deselect all highlighted coauthors
      this.setState({ activeKeyword: null, coauthorToggleActive: false })
      return
    }
    this.setState({coauthorToggleActive: true})
    const url = `https://raw.githubusercontent.com/joetm/jonaso/master/reading_list/coauthors/${authorid}.json`
    fetch(url)
    .then(response => {
      if (response.status === 404) {
        // no co-authors found.
        return []
      } else {
        if (response.status >= 400) {
          throw new Error("Bad response from server")
        }
      }
      return response.json()
    })
    .then(activeAuthors => {
      // console.info("Ajax response", activeAuthors)
      // this.setState({ activeKeyword: keyword })
      updateActive({ activeAuthors })
      // deselect highlighted keyword
      this.setState({ activeKeyword: null })
    })
  }
  getAuthorDetails = (author) => {
  	const { activeid, updateActive } = this.props
    const id = author.id
    // ------
    // remove, when the same author is clicked a second time
    // ------
    if (id === activeid) {
      const details = this.state.details
      delete details[id];
      this.setState({
        details,
        coauthorToggleActive: false,
      })
      updateActive({activeid: null, activeAuthors: []})
      return
    }
    // reset the highlighted labels
    this.setState({
      activeKeyword: null,
      coauthorToggleActive: false,
    })
    updateActive({activeAuthors: []})
    // ------
    // add
    // ------
    // cache check
    const details = this.state.details
    if (details[id]) {
      updateActive({activeid: id})
      return
    }    
    // load from remote
    const url = `https://raw.githubusercontent.com/joetm/jonaso/master/reading_list/influencers/${id}.json`
    fetch(url)
    .then(response => {
      if (response.status >= 400) {
        throw new Error("Bad response from server")
      }
      return response.json()
    })
    .then(res => {
      // console.info("Ajax response", res)
      // update cache with details
      const details = this.state.details
      details[id] = res
      this.setState({ details })
      updateActive({activeid: id})
    })
  }
  render () {
    const { list, priority, activeid, activeAuthors } = this.props
    const { details, activeKeyword, coauthorToggleActive, coauthors } = this.state
    // console.log('list', list)
    if (!list) {
      return null
    }
    return (
      <React.Fragment>
        {
          list.map((author, index) => {
            if (author.num <= 1) { return null }
            // label color
            let labelColor = null
        	if (activeAuthors.includes(author.id)) {
        		labelColor = 'yellow'
        	}
        	if (activeid === author.id) {
        		labelColor = 'red'
        	}
        	// return the list of authors
            return (
              <div key={`${index}_${author.id}`} id={author.id}>
              <Label
                style={styles.label}
                as="a"
                color={labelColor}
                title={author.num > 1 ? author.num + ' publications' : author.num + ' publication'}
                onClick={() => this.getAuthorDetails(author)}
              >
                {
                  coauthors.includes(author.name.toLowerCase()) ? (<span style={styles.coauthor}>{author.name}</span>) : author.name
                }
                <Label.Detail>{author.num}</Label.Detail>
              </Label>
                {details[author.id] && activeid === author.id &&
                  <DetailContainer
                  	authorid={author.id}
                  	activeKeyword={activeKeyword}
                  	priority={priority}
                  	details={details[author.id]}
                  	keywordClick={this.keywordClick}
                    toggleCoauthors={this.toggleCoauthors}
                    coauthorToggleActive={coauthorToggleActive}
                  />
                }
              </div>
            )
          })
        }
      </React.Fragment>
    )
  }
}
//`

class Influencer extends React.Component {
  state = {
    activeid: null,
    activeAuthors: [],
  }
  updateActive = (obj) => {
  	this.setState({ ...obj })
  }
  render() {
    const { influencer = [] } = this.props
    const { activeid, activeAuthors } = this.state
    // console.log('influencer', influencer)
    return (
        <Container>
          <div className="clear">
            <h3>Highly influential</h3>
            <AuthorList
            	priority={3}
            	list={influencer[3]}
            	activeid={activeid}
            	activeAuthors={activeAuthors}
            	updateActive={this.updateActive}
            />
          </div>
          <div className="clear">
            <h3>Influential</h3>
            <AuthorList
            	priority={2}
            	list={influencer[2]}
            	activeid={activeid}
            	activeAuthors={activeAuthors}
            	updateActive={this.updateActive}
            />
          </div>
          <div className="clear">
            <h3>Relevant</h3>
            <AuthorList
            	priority={1}
            	list={influencer[1]}
            	activeid={activeid}
            	activeAuthors={activeAuthors}
            	updateActive={this.updateActive}
            />
          </div>
          <div className="clear"></div>
        </Container>
    )
  }
}

export default Influencer
