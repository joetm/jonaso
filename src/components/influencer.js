"use client"

import 'semantic-ui-css/components/label.min.css'
import 'semantic-ui-css/components/checkbox.min.css'

import React from "react"
import md5 from "md5"
import Sidebar from "./AuthorListSidebar"


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


class AuthorList extends React.Component {
  state = {
    details: {}, // cache of details
    activeKeyword: null,
    coauthorToggleActive: false,
    coauthors: [],
  }
  componentDidMount() {
    const url = `/static/publications.json`
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
    const kwid = md5(keyword)
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
    // up to three requests to fetch author details
    const id = author.id
    // if (!id) { return }
    if (id === activeid) {
      // remove, when the same author is clicked a second time
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
    // cache check
    const details = this.state.details
    if (details[id]) {
      // console.log('cache hit for', id)
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
      const details = this.state.details
      // example: {"docs":[{"title":"Arboretum and Arbility: Improving Web Accessibility Through a Shared Browsing Architecture","priority":3}]}
      details[id] = res
      this.setState({ details })
      updateActive({activeid: id})
    })
  }
  render () {
    const { list, activeid, activeAuthors, updateActive } = this.props
    const { details, activeKeyword, coauthorToggleActive, coauthors } = this.state
    // need to get min and max for color scaling:
    // const maxNum = Math.max.apply(Math, list.map(o => o.num))
    // const maxPrio = Math.max.apply(Math, list.map(o => o.priority))
    if (!list) {
      return null
    }
    return (
      <>
        {
          list.map((author, index) => {
            if (author.name === 'Jonas Oppenlaender') {
              // labelColor = 'grey'
              return (<></>) //
            }
            // label color
            let labelColor = null
            // TODO
            if (activeAuthors.includes(author.id)) {
          		labelColor = 'yellow'
            }
            if (activeid === author.id) {
          		labelColor = 'red'
            }
           // color scaling based on priority of this author
        	 // labelColor = scaleLabelColor(author.priority / maxPrio)
           // return the list of authors
            return (
              <div key={`${index}_${author.id}`} id={author.id}>
              <a
                className={"ui label " + labelColor}
                style={{...styles.label, opacity: author.name === 'Jonas Oppenlaender' ? 0.6 : 1}}
                color={labelColor}
                title={(author.num > 1 ? author.num + ' publications' : author.num + ' publication') + ', priority ' + author.priority}
                onClick={() => this.getAuthorDetails(author)}
              >
                {
                  coauthors.includes(author.name.toLowerCase()) ? (<span style={styles.coauthor}>{author.name}</span>) : author.name
                }
                <div className="detail">{author.num} | {author.priority}</div>
              </a>
                {details[author.id] && activeid === author.id &&
                  <Sidebar
                  	authorid={author.id}
                  	activeKeyword={activeKeyword}
                  	details={details[author.id]}
                  	keywordClick={this.keywordClick}
                    toggleCoauthors={this.toggleCoauthors}
                    coauthorToggleActive={coauthorToggleActive}
                    updateActive={updateActive}
                  />
                }
              </div>
            )
          })
        }
      </>
    )
  }
}

export default AuthorList
