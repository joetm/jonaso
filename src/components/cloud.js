import React from "react"
import { Container } from 'semantic-ui-react'
import TagCloud from 'react-tag-cloud'
// import randomColor from 'randomcolor'


//DEV
import keywordcloud from '../keyword-cloud-priority.json'


class Cloud extends React.Component {
  render() {
    const baseSize = 20
    const words = keywordcloud.filter(x => x.value > 2)
    return (
      <Container style={{marginBottom: '2em'}}>
      <TagCloud 
        style={{
          fontFamily: 'sans-serif',
          fontSize: baseSize,
          fontWeight: 'bold',
          fontStyle: 'italic',
          // color: () => randomColor(),
          // padding: 5,
          width: '100%',
          height: '580px'
        }}>
        {
          words.map(w => (
            <div key={`${w.text}${w.value}`} style={{fontSize: baseSize * w.value / 100}}>{w.text}</div>
          ))
        }
      </TagCloud>
      </Container>
    )
  }
}


export default Cloud
