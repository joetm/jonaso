"use client"

import 'semantic-ui-css/components/input.min.css'
import 'semantic-ui-css/components/feed.min.css'
import 'semantic-ui-css/components/message.min.css'
import 'semantic-ui-css/components/loader.min.css'
import 'semantic-ui-css/components/list.min.css'
import 'semantic-ui-css/components/checkbox.min.css'


import React, { useState, useEffect, useRef } from "react"
import Layout from "../../components/layout"
import { Seo } from "../../components/Seo"
import { Link } from "gatsby"

import stats from "../../../oracle/stats.json"

export const isProd = process.env.NODE_ENV !== "development"

const HISTORY_LENGTH = 3

if (isProd) {
  // TODO
  const URL = 'http://0.0.0.0:8080/query'
} else {
  const URL = 'http://0.0.0.0:8080/query'
}

const preFabExamples = [
  "What are the difficulties of moderating twitch communities?",
  "What are the challenges of generative deep learning?",
  "List some prompt engineering techniques.",
  "What are systems, libraries, tools for data validation?",
  "What are the issues with mobile phones?",
  "What are topics in Collective Intelligence?",
  "What is Methodolatry?",
  "Who was living in airports?",
]

const styles = {
  exampleContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
    justifyContent: 'center', // Center-align items on the main axis (horizontally)
    alignItems: 'stretch', // Center-align items on the cross axis (vertically, if needed)
    left: '50%', // Move the left edge to the center of the parent
    transform: 'translateX(-50%)', // Shift it back to the left by half its own width
    width: '80%',
    textAlign: 'center',
    padding: 0,
    position: 'absolute',
    bottom: '25px',
    example: {
      flex: '1 1 calc((100% / 3) - 20px)',
      // maxWidth: '32%',
      border: '1px solid gray',
      cursor: 'pointer',
      borderRadius: '10px',
      backgroundColor: '#FFFBF0',
      padding: '5px',
      textAlign: 'center',
      // margin: '0 10px', // Optional: Add some space between subcontainers
    }
  },
  errormsg: {
    position: 'absolute',
    bottom: '25px',
    minWidth: '50%',
  },
}

export function Head() {
  return (
    <Seo title="Chat // jonaso.de">
      <link id="canonical" rel="canonical" href="https://www.jonaso.de/chat/" />
    </Seo>
  )
}



export default function Chat() {
  const [chat, updateChat] = useState([
    // { 'role': 'user', 'msg': 'test msg'},
    // { 'role': 'oracle', 'msg': 'ok'},
  ])
  const [chatHistory, updateChatHistory] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [firstUse, setFirstUse] = useState(true)
  const [useHyperlinks, setUseHyperlinks] = useState(false)
  const [networkError, setNetworkError] = useState(false)
  const chatRef = useRef()
  const inputRef = useRef(null)
  const iconRef = useRef(null)

  useEffect(() => {
    if (chatRef.current) {
      const scroll = () => {
        chatRef.current.scrollTop = chatRef.current.scrollHeight
      }
      // Execute scroll after the next repaint to ensure DOM has updated
      requestAnimationFrame(scroll)
    }
  }, [chat])

  // focus the input when it is no longer deactivated
  useEffect(() => {
    // Only try to focus when isLoading is false and the input is presumably active
    if (!isLoading) {
      inputRef.current.focus()
    }
  }, [isLoading])

  const updateIconClass = () => {
    if (inputRef.current.value) {
      iconRef.current.className = 'arrow alternate circle up icon'
    } else {
      iconRef.current.className = 'arrow alternate circle up outline icon'
    }
  }
  useEffect(() => {
    inputRef.current.addEventListener('input', updateIconClass)
    return () => inputRef.current.removeEventListener('input', updateIconClass)
  }, [])

  // body: JSON.stringify({ query: "What are the difficulties of moderating twitch communities?" }),

  // Use functional update to ensure we're working with the most current state
  const handleServerResponse = (data) => {
    updateChat(chat => [...chat, data])
    if (data.role == "user") {
      updateChatHistory(chatHistory => [...chatHistory, data].slice(-1 * HISTORY_LENGTH))
    }
  }

  const sendIt = (new_msg) => {
    setIsLoading(true)
    setNetworkError(null)
    handleServerResponse({'role': 'user', 'msg': new_msg})
    fetch('http://0.0.0.0:8080/query', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({query: new_msg, history: chatHistory}),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data)
      setIsLoading(false)
      handleServerResponse(data)
    })
    .catch(error => {
      console.error('Error:', error)
      console.log(error)
      setNetworkError(error)
      setIsLoading(false)
    })
  }

  const handleListItemClick = (txt) => {
    txt = "Tell me more about " + txt
    sendIt(txt)
  }

  const TextWithLinks = ({ text }) => {
    // Find the first comma
    const firstCommaIndex = text.indexOf(',')
    if (firstCommaIndex === -1) {
      // If there's no comma, just return the text as is
      return <>{text}</>
    }
    // Extract the text before the first comma (excluding the immediate word that we'll linkify)
    const introText = text.substring(0, text.lastIndexOf(' ', firstCommaIndex))
    // Extract the word immediately before the first comma and the rest of the list items
    const listStartsAt = text.lastIndexOf(' ', firstCommaIndex) + 1
    const listText = text.substring(listStartsAt)
    // Split the remaining text into items based on commas and 'and'
    const items = listText.split(/,| and | include /).filter(Boolean)
    // Function to render a link for each item
    const renderItemAsLink = (item, index) => (
      <React.Fragment key={index}>
        {/* Add a comma before items except the first */}
        {index > 0 && ', '}
        <a href="#" onClick={() => handleListItemClick(item.trim())}>
          {item.trim()}
        </a>
      </React.Fragment>
    )
    return (
      <>
        {introText} {items.map(renderItemAsLink)}
      </>
    )
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      const new_msg = event.target.value.trim()
      if (!new_msg) {return}
      setNetworkError(null)
      event.target.value = '' // clear input
      sendIt(new_msg)
    }
  }

  const handleExampleClick = (msg) => {
    setFirstUse(false)
    setNetworkError(null)
    inputRef.current.value = '' // clear input
    sendIt(msg)
  }

  const handleHyperlinkOption = (e) => setUseHyperlinks(e.target.checked)

  return (
    <Layout style={{marginBottom:0, paddingBottom:0}}>
      <div className="ui message">
        You are chatting with {stats?.total} documents that I have <Link to="/research/reading/">read</Link> and found <Link to="/research/influences/">interesting</Link>.
        <div style={{
          float: 'right',
        }}>
          <div
            className="ui checkbox"
            style={{
              display: 'inline-block',
              borderRight: '2px solid gray',
              paddingRight: '1rem',
              fontSize: 'inherit',
            }}
          >
            <input onChange={handleHyperlinkOption} type="checkbox" name="hyperlinks" /><label>hyperlinks</label>
          </div>
          <a style={{paddingLeft: '1rem'}} href="/oracle">restart</a></div>
      </div>
      <div className="ui container" style={{
          backgroundColor: '#DDDDDD',
          margin: 0,
          position: 'relative',
          borderRadius: '10px',
          padding: '25px',
          overflow: 'scroll',
          height: '60vh',
        }}
        ref={chatRef}
      >

        {chat.map((msgObj, index) => {
          const isUserMsg = msgObj['role'] == 'user'
          return (
            <div key={index} style={{marginBottom: '5px'}}>
              {/*
                <div className="header" style={{textAlign: isUserMsg ? 'right' : 'left'}}>{isUserMsg ? 'you' : 'Oracle'}</div>
              */}
              <div className="ui message" style={{float: isUserMsg ? 'right' : 'left', maxWidth: '80%', backgroundColor: isUserMsg ? '#888888' : 'white', color: isUserMsg ? 'white' : 'black' }}>
                {
                  useHyperlinks ?
                    <TextWithLinks text={msgObj.msg} isUser={isUserMsg} />
                  :
                    msgObj.msg
                }
              </div>
              <div style={{clear: 'both'}}></div>
            </div>
          )}
        )}

        {
          isLoading &&
            <div style={{position: 'relative', bottom: '0px'}} className="ui active inverted dimmer">
              <div className="ui medium text loader"></div>
            </div>
        }

        {
          firstUse &&
            <div className="examplecontainer" style={styles.exampleContainer}>
              {
                preFabExamples.map(ex => (
                  <div key={ex} onClick={() => handleExampleClick(ex)} className="item" style={styles.exampleContainer.example}>
                    <div className="content">
                      {ex}
                    </div>
                  </div>
                ))
              }
            </div>
        }

        {
          networkError &&
            <div className="ui negative message" style={styles.errormsg}>
              <i onClick={() => setNetworkError(null)} className="close icon"></i>
              <div className="header">Sorry, there was an error</div>
              <p>{networkError.message}</p>
            </div>
        }

      </div>
        
      <div className="ui massive icon input" style={{width: '100%', marginTop: '20px'}}>
        <input
          ref={inputRef}
          autoFocus
          disabled={isLoading}
          type="text"
          onKeyDown={handleKeyDown}
          placeholder="Enter your question..."
        />
        <i
          ref={iconRef}
          style={{cursor: 'pointer'}}
          onClick={() => handleKeyDown({key: 'Enter', target: inputRef.current})}
          className="arrow alternate circle up outline icon"
        ></i>
      </div>

    </Layout>
  )
}
