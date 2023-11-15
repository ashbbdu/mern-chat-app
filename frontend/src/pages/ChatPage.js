import React, { useEffect, useState } from 'react'
import axios from 'axios'

const ChatPage = () => {
    const [chats , setChats] = useState([]);
    console.log(chats , "chats")
    const fetchChats = async () => {
        const { data} = await axios.get("http://localhost:4000/api/chats")
        setChats(data.chats)
    }
useEffect(() => {
    fetchChats()
},[])
  return (
    <>
        {
            chats.map(res => {
                return (
                    <div key={res._id}>{res.chatName}</div>
                )
            })
        }
    </>
  )
}

export default ChatPage