"use client"

import 'semantic-ui-css/components/input.min.css'
import 'semantic-ui-css/components/feed.min.css'
import 'semantic-ui-css/components/message.min.css'
import 'semantic-ui-css/components/loader.min.css'

import React, { useState, useRef } from "react"
import Layout from "../../components/layout"
import { Seo } from "../../components/Seo"

// export const isProd = process.env.NODE_ENV !== "development"

export function Head() {
  return (
    <Seo title="Chat // jonaso.de">
      <link id="canonical" rel="canonical" href="https://www.jonaso.de/chat/" />
    </Seo>
  )
}


export default function Chat() {
  const [chathistory, setChathistory] = useState([
    { 'type': 'user', 'msg': 'test msg'},
    { 'type': 'oracle', 'msg': 'ok'},
  ])
  const [isLoading, setIsLoading] = useState(false)

  const send_it = (msg) => {
    alert('send')
    setIsLoading(true)

  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      const new_msg = event.target.value.trim()
      if (!new_msg) { return }
      event.target.value = ''
      const new_history = [ ...chathistory, {'type': 'user', 'msg': new_msg} ]
      setChathistory(new_history)
      send_it(new_msg)
    }
  }

  return (
    <Layout style={{marginBottom:0, paddingBottom:0}}>
      <div className="ui container" style={{
        backgroundColor: '#DDDDDD',
        margin: 0,
        position: 'relative',
        borderRadius: '10px',
        padding: '25px',
        overflow: 'scroll',
        height: '75vh',
      }}>
        {chathistory.map(msgObj => (
          <div style={{clear: 'both'}}>
            {
              msgObj['type'] == 'user' ?
                <div className="ui message" style={{float: 'right', maxWidth: '80%'}}>
                  <div className="header" style={{textAlign: 'right'}}>you:</div>
                  <p>{msgObj.msg}</p>
                </div>
              :
                <div className="ui message" style={{float: 'left', maxWidth: '80%'}}>
                  <div className="header" style={{textAlign: 'left'}}>Oracle:</div>
                  <p>{msgObj.msg}</p>
                </div>
            }
          </div>
        ))}

        {
          isLoading &&
            <div style={{position: 'relative', bottom: '0px'}} className="ui active inverted dimmer">
              <div className="ui medium text loader"></div>
            </div>
        }

      </div>
        
      <div className="ui massive icon input" style={{
        width: '100%',
        marginTop: '20px',
      }}>
        <input
          autoFocus
          disabled={isLoading}
          type="text"
          onKeyDown={handleKeyDown}
          placeholder="Enter your question..."
        />
        <i className="search icon"></i>
      </div>

    </Layout>
  )
}
