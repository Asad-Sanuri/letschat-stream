import React, { useState } from "react";

import { Chat } from 'stream-chat-react';
import { StreamChat } from "stream-chat";
import Cookies from "universal-cookie";

import { ChannelListContainer, ChannelContainer, Auth } from "./components";
/* import 'stream-chat-react/dist/css/index.css';  */

import 'stream-chat-react/dist/css/index.css';
import './App.css';

const cookies = new Cookies();

const apiKey = process.env.REACT_APP_STREAM_API_KEY;
const authToken = cookies.get('token');

const client = StreamChat.getInstance(apiKey);

if(authToken){

  client.connectUser({
    id: cookies.get('userId', {secure: true, sameSite: 'none'}),
    name: cookies.get('username', {secure: true, sameSite: 'none'}),
    fullName: cookies.get('fullName', {secure: true, sameSite: 'none'}),
    image: cookies.get('avatarURL', {secure: true, sameSite: 'none'}),
    hashedPassword: cookies.get('hashedPassword', {secure: true, sameSite: 'none'}),     
  }, authToken)
}

const App = () => {
  const [createType, setCreateType] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);


  if(!authToken) return <Auth /> 

  return (
    <div className="app__wrapper">
      <Chat client={client} theme='team light'>
        <ChannelListContainer 
          isCreating={isCreating}
          setIsCreating={setIsCreating}
          setCreateType={setCreateType} 
          setIsEditing={setIsEditing}        
        />

        <ChannelContainer
          isCreating={isCreating}
          setIsCreating={setIsCreating}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          createType={createType}          
        />
      </Chat>
    </div>
    );
}

export default App