
import './App.css';
import io from 'socket.io-client'
import { useState } from 'react'; 
import Chat from './components/Chat';
const socket = io.connect("http://localhost:3001")

function App() {
  const [ username, setUsername] = useState("")
  const [room, setRoom] = useState("")
  const [showChat, setshowChat] = useState(false)

   const joinRoom = ()=>{
    if(username !== ""&& room !== ""){
      socket.emit("join_room",room)
      setshowChat(true)
    }
   }
  return (
    <div className="App">
      <div className='joinChatContainer'>
      <h1>Join</h1>
      <input type="text" placeholder='name' onChange={(e)=>{setUsername(e.target.value)}}/>
      <br/>
      <input type="text" placeholder='roomId' onChange={(e)=>{setRoom(e.target.value)}}/>
      <br/>
      <button onClick={()=>{joinRoom()}}> submit</button>
      </div>
      {showChat&&
       <Chat socket={socket} username={username} room={room}></Chat>
      }
    </div>
  );
}

export default App;
