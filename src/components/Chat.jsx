import React from 'react'
import { useState, useEffect } from 'react'; 
import ScrollToBottom from 'react-scroll-to-bottom'
const Chat = ({socket,room ,username}) => {
    const [currentMessage, setcurrentMessage] = useState("")
    const [messageList, setMessageList] = useState([])
    useEffect(() => {
        socket.on("receive_message",(data)=>{
         setMessageList((list)=>[...list,data])
        })
        }, [socket])
    const sendMessage= async ()=>{
        if(currentMessage){
            const messageData ={
                room: room,
                username:username,
                message:currentMessage,
                time: new Date(Date.now()).getHours()+":"+new Date(Date.now()).getMinutes()
            }
             await socket.emit("send_message",messageData)
             setMessageList((list)=>[...list,messageData])
             setcurrentMessage("")
        }
    }

  
    
  return (
    <div className='chat-window'>
        <div className='chat-header'>
            Live chat
        </div>
        <div className='chat-body'>
            <ScrollToBottom className='message-container'>
            {
                messageList.map((e,i)=>{ 
                  return  <div key={i} className='message' id={username===e.username?"you":"other"}>
                     <div className='message-content'>
                        {e.message}
                     </div>
                     <div className='message-meta'>
                        <p id='time'>{e.time}</p>
                        <p id='author'>{e.username}</p>
                     </div>

                  </div>
                })
            }
            </ScrollToBottom>
        </div>
        <div className='chat-footer'>
            <input type="text" placeholder='hey' onKeyUp={(e)=>{e.key==="Enter"&&sendMessage()}} value={currentMessage} onChange={(e)=>{setcurrentMessage(e.target.value)}}  />
            <button onClick={()=>{sendMessage()}}>send</button>
        </div>

    </div>
  )
}

export default Chat