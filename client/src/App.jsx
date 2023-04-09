import {useState} from 'react'
import {useEffect} from 'react'
import './App.scss'

function App() {
    useEffect(() => {
        getEngines()
    }, [])
    const [models, setModals] = useState([])
    const [input, setInput] = useState("")
    const [chatLog, setChatLog] = useState([{
        user: "gpt",
        message: "hey how can i help you today?"
    },
        {
            user: "parishkar",
            message: "i want help with my project"
        }
    ])
    // clear chats
    const clearChats = () => {
        setChatLog([])
    }
    const getEngines = async () => {
        fetch('http://localhost:6969/models')
            .then(response => response.json())
            .then(data => setModals(data))
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        let chatLogCopy = [...chatLog, {user: "parishkar", message: `${input}`}]
        await setInput("")
        setChatLog(chatLogCopy)
        const messages = chatLogCopy.map((message) => message.message).join("\n")
        const response = await fetch('http://localhost:6969/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message: messages
            })
        });
        const data = await response.json()
        await setChatLog([...chatLogCopy, {user: "gpt", message: `${data.message}`}])
    }
    return (
        <div className="App">
            <aside className='side-menu'>
                {/*<span>Tailored  For  Parishkar</span>*/}
                <img style={{width: "80px", height: "80px"}}
                     src={"https://avatars.githubusercontent.com/u/79470399?v=4"} alt="react logo"/>
                <div className="side-menu-button" onClick={clearChats}>
                    <span>+ New Chat</span>
                </div>
            </aside>
            <section className="chat-box">
                <div className="chat-log">
                    {chatLog.map((message, index) => (
                        <ChatMessage key={index} message={message}/>
                    ))}
                    <div className="chat-input-holder">
                        <form onSubmit={handleSubmit}>
                            <input value={input}
                                   onChange={(e) => setInput(e.target.value)}
                                   placeholder='Type your query here' className="chat-input-textarea"></input>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    )
}

const ChatMessage = ({message}) => {
    return (
        <div className={`chat-message ${message.user === "gpt" && "chatgpt"} `}>
            <div className="chat-message-center">
                <div className={`avatar ${message.user === "gpt" && "chatgpt"}`}>
                    <img
                        src={message.user === 'gpt' ? "data:image/png;base64,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" : "https://avatars.githubusercontent.com/u/79470399?v=4"}
                        alt="Avatar"/>
                </div>
                <div className="message">
                    {message.message}
                </div>
            </div>
        </div>
    )
}
export default App
