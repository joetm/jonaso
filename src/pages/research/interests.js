import React from "react"
import Keywords from "../../components/keywords"
import Layout from "../../components/layout"
import GraphSwitcher from "../../components/GraphSwitcher"
import { Seo } from "../../components/Seo"
import { spacer } from "../../common"
import { Button } from 'semantic-ui-react'

const _KEYWORDS = 'https://raw.githubusercontent.com/joetm/jonaso/master/reading_list/keywords.json'


export function Head() {
  return (
    <Seo title="Research Interests // jonaso.de">
      <link id="canonical" rel="canonical" href="https://www.jonaso.de/interests" />
    </Seo>
  )
}

class Interests extends React.Component { //
  state = {
    keywords: [],
    isZoomed: false,
    breadcrumb: null,
  }
  zoom = (val, bc = null) => {
    this.setState({
      isZoomed: val,
      breadcrumb: bc,
    })
  }
  componentDidMount = () => {
    fetch(_KEYWORDS)
    .then(response => {
      if (response.status >= 400) {
        throw new Error("Bad response from server")
      }
      return response.json()
    })
    .then(keywords => this.setState({ keywords }))
  }
  render() {
    const { keywords, isZoomed, breadcrumb } = this.state
    const filtered_keywords = keywords.filter(kw => kw.num > 19)
    return (
      <Layout>
        <div className="ui container">
          <div className="ui segment" style={{clear:'both', border:0, boxShadow: '0px 0px 0px #FFFFFF'}}>
              <h2 style={{float:'left', display:'inline-block', marginRight: '1rem'}}>Research Interests</h2>
                {' '}
                <GraphSwitcher active="interests" />
              {
                isZoomed &&
                  <div style={{float:'right', fontSize: 'initial', marginRight:'1em'}}>
                    <span style={{marginRight: '1em'}}>{breadcrumb}</span>
                    <Button circular onClick={() => this.zoom(false)} icon='left arrow' />
                  </div>
              }
          </div>
          <Keywords keywords={filtered_keywords} isZoomed={isZoomed} zoom={this.zoom} />
          <div style={spacer}></div>
        </div>
      </Layout>
    )
  }
}

export default Interests
