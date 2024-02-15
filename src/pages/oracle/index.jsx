"use client"

import 'semantic-ui-css/components/input.min.css'
import 'semantic-ui-css/components/feed.min.css'
import 'semantic-ui-css/components/message.min.css'
import 'semantic-ui-css/components/loader.min.css'

import React, { useState, useEffect, useRef } from "react"
import Layout from "../../components/layout"
import { Seo } from "../../components/Seo"

export const isProd = process.env.NODE_ENV !== "development"

if (isProd) {
  // TODO
  const URL = 'http://0.0.0.0:8080/query'
} else {
  const URL = 'http://0.0.0.0:8080/query'
}


export function Head() {
  return (
    <Seo title="Chat // jonaso.de">
      <link id="canonical" rel="canonical" href="https://www.jonaso.de/chat/" />
    </Seo>
  )
}


export default function Chat() {
  const [chathistory, setChathistory] = useState([
    { 'role': 'user', 'msg': 'test msg'},
    { 'role': 'oracle', 'msg': 'ok'},
  ])
  const [isLoading, setIsLoading] = useState(false)
  const chatRef = useRef()

  useEffect(() => {
    if (chatRef.current) {
      const scroll = () => {
        chatRef.current.scrollTop = chatRef.current.scrollHeight
      }
      // Execute scroll after the next repaint to ensure DOM has updated
      requestAnimationFrame(scroll)
    }
  }, [chathistory])

  // body: JSON.stringify({ query: "What are the difficulties of moderating twitch communities?" }),

  // Use functional update to ensure we're working with the most current state
  const handleServerResponse = (data) => {
    setChathistory(chathistory => [...chathistory, data])
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      const new_msg = event.target.value.trim()
      if (!new_msg) {return}

      event.target.value = '' // clear input
      setIsLoading(true)

      handleServerResponse({'role': 'user', 'msg': new_msg})

      // alert('send')
      // setIsLoading(true)
      fetch(URL, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({query: new_msg}),
      })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data)
        setIsLoading(false)
        handleServerResponse(data)
      })
      .catch((error) => {
        console.error('Error:', error)
        setIsLoading(false)
      })

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
        }}
        ref={chatRef}
      >
        {chathistory.map((msgObj, index) => (
          <div style={{clear: 'both'}}>
            {
              msgObj['role'] == 'user' ?
                <div key={`user${index}`} className="ui message" style={{float: 'right', maxWidth: '80%'}}>
                  <div className="header" style={{textAlign: 'right'}}>you:</div>
                  <p>{msgObj.msg}</p>
                </div>
              :
                <div key={`oracle${index}`} className="ui message" style={{float: 'left', maxWidth: '80%'}}>
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
