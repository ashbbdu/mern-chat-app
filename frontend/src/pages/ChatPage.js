import React, { useEffect, useState } from 'react'
import axios from 'axios'

const ChatPage = () => {
    const [chats , setChats] = useState([]);
    console.log(chats , "chats")
    const fetchChats = async () => {
        const  data = await axios.get("http://localhost:4000/api/chats")
        console.log(data , "data")
        // setChats(data.chats)
    }
useEffect(() => {
    fetchChats()
},[])

let {token} = JSON.parse(localStorage.getItem("userDetails"));
console.log(token , "user")

  return (
    <div>
        {
            chats.map(res => {
                return (
                    <div key={res._id}>{res.chatName}</div>
                )
            })
        }
    </div>
  )
}

export default ChatPage