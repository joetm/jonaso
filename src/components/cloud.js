import React from "react"
import TagCloud from 'react-tag-cloud'
import { Container } from 'semantic-ui-react'
// import randomColor from 'randomcolor'


//DEV
import keywordcloud from '../keyword-cloud-priority.json'


export default function Cloud() {
  const baseSize = 25
  const words = keywordcloud.filter(x => x.value > 15)
  return (
    <Container style={{marginBottom: '2em'}}>
      <TagCloud 
        style={{
          fontFamily: 'sans-serif',
          fontSize: baseSize,
          fontWeight: 'bold',
          fontStyle: 'italic',
          // color: () => randomColor(),
          // color: "#82CA9D",
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
