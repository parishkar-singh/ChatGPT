import {useState} from 'react'
import {useEffect} from 'react'
import {useRef} from 'react'
import images from './images.json'
import './App.scss'

function App() {

    const [models, setModels] = useState([])
    const [input, setInput] = useState("")
    const [currentModel, setCurrentModel] = useState("ada");
    const [chatLog, setChatLog] = useState([])
    // clear chats
    const clearChats = () => {
        setChatLog([])
    }
    const getEngines = async () => {
       fetch('http://localhost:6969/models')
            .then(response => response.json())
            .then(data => {
                // console.log(data.models)
                setModels(data.models)
            })
        console.log(models)
    };
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
                message: messages,
                currentModel: currentModel
            })
        });
        const data = await response.json()
        await setChatLog([...chatLogCopy, {user: "gpt", message: `${data.message}`}])
    }
    useEffect(() => {
        getEngines()
    }, [])
    return (
        <div className="App">
            <aside className='side-menu'>
                {/*<span>Tailored  For  Parishkar</span>*/}
                <img style={{width: "80px", height: "80px"}}
                     src={"https://avatars.githubusercontent.com/u/79470399?v=4"} alt="react logo"/>
                <div className="side-menu-button" onClick={clearChats}>
                    <span>+ New Chat</span>
                </div>
                <div className="side-menu-logout">
                    <span>Logout</span>
                </div>
                <div className="side-menu-models">
                    <select onChange={(event) =>setCurrentModel(event.target.value)}>
                        {models?.map((model, index) => (
                            <option key={model.id} value={model.id}>{model.id}</option>
                        ))}
                    </select>
                </div>
            </aside>
            <section className="chat-box">
                <div className="chat-log">
                    {chatLog?.map((message, index) => (
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
    const messageRef = useRef(null);

    useEffect(() => {
        if (messageRef.current) {
            messageRef.current.scrollIntoView({
                behavior: "smooth",
                block: "end",
                inline: "nearest"
            });
        }
    }, [message]);

    return (
        <div ref={messageRef} className={`chat-message ${message.user === "gpt" && "chatgpt"} `}>
            <div className="chat-message-center">
                <div className={`avatar ${message.user === "gpt" && "chatgpt"}`}>
                    <img
                        src={message.user === 'gpt' ? images.gpt : "https://avatars.githubusercontent.com/u/79470399?v=4"}
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
