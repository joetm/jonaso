import React from "react"
import CHATGPT from "../img/chatgpt.gif"


const styles = {
    chatgptQuote: {
      paddingTop: '1.5rem',
      paddingBottom: '1rem',
    },
}


export default function Quote() {
  return (
    <div style={styles.chatgptQuote} className="ui comments">
      <div className="comment">
        <i className="avatar" style={{width: '35px', backgroundColor: "rgb(16, 163, 127)"}}>
          <img src={CHATGPT} alt="" />
        </i>
        <div className="content">
          <span className="author">ChatGPT</span>
          <div className="metadata">
            <span className="date">Jan 12, 2023</span>
          </div>
          <div className="text">
              <em>
              &ldquo;A researcher true,<br />
              With diverse background and flair,<br />
              Jonas Oppenlaender&rdquo;
              </em>
          </div>
        </div>
      </div>
    </div>
  )
}
