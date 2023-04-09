import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.scss'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <aside className='side-menu'>
          <div className="side-menu-button">
              {/*<button>New Chat</button>*/}
              <span>+ New Chat</span>

          </div>
      </aside>
        <section className="chat-box">
            <div className="chat-log">
                <div className="chat-message">
                    <div className="chat-message-center">
                        <div className="avatar">
                            <img src="https://avatars.githubusercontent.com/u/79470399?v=4" alt="Avatar"/>
                        </div>
                        <div className="message">
                            hello world
                        </div>
                    </div>
                </div>

            <div className="chat-message gpt">
                <div className="chat-message-center">
                    <div className="avatar">
                        <img src="data:image/png;base64,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" alt="Avatar"/>
                    </div>
                    <div className="message">
                        Hey there this is chat gpt 4
                    </div>
                </div>
            </div>
            </div>
            <div className="chat-input-holder">
                <textarea placeholder='Type your query here' className="chat-input-textarea"></textarea>
            </div>
        </section>
    </div>
  )
}

export default App
