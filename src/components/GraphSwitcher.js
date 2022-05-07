import React from "react"
import { navigate } from 'gatsby'
import { Button } from 'semantic-ui-react'


class GraphSwitcher extends React.Component {
  render() {
    const { active } = this.props
    return (
      <Button.Group size="mini">
          <Button positive={active === 'interests'}
            onClick={() => navigate('/research/interests')}>Bar</Button>
          <Button.Or />
          <Button positive={active === 'wordcloud'}
            onClick={() => navigate('/research/interests/wordcloud')}>Cloud</Button>
          {/*
            <Button.Or />
            <Button positive={active === 'treemap'}
              onClick={() => navigate('/research/interests/treemap')}>Tree</Button>
          */}
      </Button.Group>
    )
  }
}

export default GraphSwitcher
