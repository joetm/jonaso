"use client"

import React, { useEffect, useState } from "react"


export default function Toast({ headline, message, duration, onComplete }) {
  const [progress, setProgress] = useState(100)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        const newProgress = prevProgress - (100 / (duration / 1000))
        if (newProgress <= 0) {
          clearInterval(interval)
          onComplete() // Call onComplete when progress hits 0
          return 0
        }
        return newProgress
      });
    }, 100);
    return () => clearInterval(interval)
  }, [duration, onComplete])

  {/*
        <div
          className="ui icon compact info message"
          style={{ position: 'fixed', top: 20, right: 20, backgroundColor: 'black', color: 'white', padding: '10px', borderRadius: '5px' }}
        >
          <i onClick={() => setShowColdStartMsg(false)} className="close icon"></i>
          <i className="inbox icon"></i>
          <div className="content">
            <div className="header">
              Cold start detected.
            </div>
            <p>Please allow ~2 minutes for the server to boot.</p>
          </div>
          <div style={{ height: '5px', width: '100%', backgroundColor: '#ccc', marginTop: '5px' }}>
            <div style={{ height: '100%', width: `${progress}%`, backgroundColor: 'green' }}></div>
          </div>
        </div>
  */}

  return (
    <div style={{ position: 'fixed', top: 20, right: 20, color: 'black', border: '1px solid gray', padding: '10px', borderRadius: '5px' }}>
      <div><i className="inbox icon"></i> {headline}</div>
      {message}
      <div style={{ height: '5px', width: '100%', backgroundColor: '#ccc', marginTop: '5px' }}>
        <div style={{ height: '100%', width: `${progress}%`, backgroundColor: 'red' }}></div>
      </div>
    </div>
  )
}
