import 'semantic-ui-css/components/checkbox.min.css'

import React from "react"
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
  render () {
    const { list, activeid, activeAuthors, updateActive } = this.props
    const { details, activeKeyword, coauthorToggleActive, coauthors } = this.state
    if (!list) {
      return null
    }
    return (
      <>
        {
          list.map((author, index) => {
            return (
              <div key={`${index}_${author.id}`} id={author.id}>
                {
                  author.name + " " +author.num + " " + author.priority
                }
                {
                  coauthors.includes(author.name.toLowerCase()) ? " (co-author)" : ''
                }
              </div>
            )
          })
        }
      </>
    )
  }
}

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
    return (
        <div className="ui container">
          <div className="clear">
            <AuthorList
            	list={influencer}
            	activeid={activeid}
            	activeAuthors={activeAuthors}
            	updateActive={this.updateActive}
            />
          </div>
          <div className="clear"></div>
        </div>
    ) //
  }
}

export default Influencer
