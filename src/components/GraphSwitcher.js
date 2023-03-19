import React from "react"
import { navigate } from 'gatsby'
import 'semantic-ui-css/components/button.min.css'
import { Button } from 'semantic-ui-react'


export default function GraphSwitcher({ active }) {
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
