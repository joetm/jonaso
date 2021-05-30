import React from "react"


class AuthorListArray extends React.Component {
  state = {
    details: {}, // cache of details
    activeKeyword: null,
    coauthorToggleActive: false,
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
    const { details, activeKeyword, coauthorToggleActive } = this.state
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
                {author.name}
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

export default AuthorListArray
