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
              <span>+</span>
              New Chat
          </div>
      </aside>
        <section className="chat-box">
            <div className="chat-input-holder">
                <textarea placeholder='Type your query here' className="chat-input-textarea"></textarea>
            </div>
        </section>
    </div>
  )
}

export default App
