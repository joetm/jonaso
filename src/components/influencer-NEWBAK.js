/*
  DEV: this is supposed to become an up-to-date reading list synced from my PC
*/

import React from "react"
import { Container, Label, Checkbox } from 'semantic-ui-react'
import AuthorList from "../components/AuthorList"

import "./influencer.css"



class Influencer extends React.Component {
  state = {
    activeid: null,
    activeAuthors: [],
  }
  updateActive = (obj) => {
  	this.setState({ ...obj })
  }
  render() {
    const { influencer = {} } = this.props

    const { activeid, activeAuthors } = this.state
    return (
        <Container>
          <h2>Influencers</h2>
          <div className="clear">
            <AuthorList
              list={influencer}
              activeid={activeid}
              activeAuthors={activeAuthors}
              updateActive={this.updateActive}
            />
          </div>
          {/*
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
          */}
          <div className="clear"></div>
        </Container>
    )
  }
}

export default Influencer
