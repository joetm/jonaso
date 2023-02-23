import 'semantic-ui-css/components/label.min.css'
import 'semantic-ui-css/components/checkbox.min.css'

import React from "react"
import { Label, Checkbox } from 'semantic-ui-react'
import md5 from "md5"
import { sortByKey } from "../common"

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

// https://stackoverflow.com/a/63775249/426266
// function interpolateColor(c0, c1, f){
//     c0 = c0.match(/.{1,2}/g).map((oct)=>parseInt(oct, 16) * (1-f))
//     c1 = c1.match(/.{1,2}/g).map((oct)=>parseInt(oct, 16) * f)
//     let ci = [0,1,2].map(i => Math.min(Math.round(c0[i]+c1[i]), 255))
//     return ci.reduce((a,v) => ((a << 8) + v), 0).toString(16).padStart(6, "0")
// }

// scale the available colors of semantic ui label with percentage
// function scaleLabelColor(perc) {
//   // invert colors
//   perc = 1 - perc
//   // const colors = ['red','orange','pink','brown','grey','black']
//   const colors = ['red','orange','olive','green','blue','violet','purple','pink','brown','grey','black']
//   const colMaxIndex = colors.length - 1
//   const key = Math.round(perc * colMaxIndex)
//   return colors[key]
// }


// ----------------

const Wrapper = {
  KeywordWrapper: ({title, items, updateActive}) => (
    <div className="wrapperBox">
      <h4 style={{float:'left', display:'inline-block'}}>{title}</h4>
      <i class="close icon"
        role="button" aria-label="close"
        tabIndex={0}
        style={{float:'right', cursor:'pointer'}}
        onClick={() => updateActive({activeid: null, activeAuthors: []})}
        onKeyDown={() => updateActive({activeid: null, activeAuthors: []})}
      ></i>
      <div style={{clear:'both'}}>{items}</div>
    </div>
  ), //
  CoauthorWrapper: ({title, authorid, toggleCoauthors, coauthorToggleActive}) => (
    <div className="wrapperBox">
      <h4>{title}</h4>
      <div>
        <Checkbox checked={coauthorToggleActive} onChange={() => toggleCoauthors(authorid)} label='Show co-authors' toggle />
      </div>
    </div>
  ), //
  PubWrapper: ({title, items, ratio321}) => (
      <div className="wrapperBox">
        <h4>{title}</h4>
        {
          ratio321 && <div>ratio: {ratio321}</div>
        }
        <ol>{items}</ol>
      </div>
    ),
}

// ----------------

// https://stackoverflow.com/a/14810714/426266
Object.map = function(o, f, ctx) {
    ctx = ctx || this;
    var result = {};
    Object.keys(o).forEach(function(k) {
        result[k] = f.call(ctx, o[k], k, o); 
    });
    return result;
}

function roundInt(num) {
  return Math.round((num + Number.EPSILON) * 10) / 10
}

const DetailContainer = ({authorid, details, keywordClick, activeKeyword, toggleCoauthors, coauthorToggleActive, updateActive}) => {
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
  )) //

  let priocount = {'3': 0, '2': 0, '1': 0, '0': 0}
  const doctotal = docs.length
  docs.forEach(doc => { priocount[""+doc.priority] += 1 })
  priocount = Object.map(priocount, function(v, k, o) {
     return roundInt(v/doctotal * 100)
  });

  const priocolors = {
    '3': 'red',
    '2': 'orange',
    '1': 'brown',
    '0': 'black',
  }
  const ratios = []
  Object.keys(priocolors).reverse().forEach(k => {
    ratios.push(<span class={`ui ${priocolors[k]} label`}>{priocount[k]}%</span>)
  }) //
  const ratio321 = (<span>{ratios}</span>) //

  const publist = sortByKey(docs, 'priority').map((doc, i) => (
          <li className="abbrev" key={`p${i}${authorid}${doc.priority}${doc.title}`}><span class={`ui ${priocolors[doc.priority]} circular label docprio`}>{doc.priority}</span> {doc.title}</li>
      )) //

  return (
    <>
      <div className="clear"></div>
      <div className="authordetails clear" key={`a-a${authorid}`}>
        <Wrapper.KeywordWrapper title="Keywords" items={kwlist} updateActive={updateActive} />
        <Wrapper.CoauthorWrapper title="Co-Authors" authorid={authorid} toggleCoauthors={toggleCoauthors} coauthorToggleActive={coauthorToggleActive} />
        <Wrapper.PubWrapper title="Publications" items={publist} ratio321={ratio321} />
      </div>
    </>
  )
} //

// ----------------

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
                  <DetailContainer
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
