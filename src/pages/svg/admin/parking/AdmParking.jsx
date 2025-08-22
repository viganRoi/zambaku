import React, { useContext, useEffect, useState } from 'react'
import { Box } from '@mui/material'
import { AuthContext } from '../../../components/authContext/AuthProvider'
import SockJS from 'sockjs-client'
import { Client } from '@stomp/stompjs'
import { BASE_URL } from '../../../utils/consts'
import { ToastContainer } from 'react-toastify'
import AdmParkingHeader from '../../../components/admin/parking/AdmParkingHeader'
import AdmParkingTable from '../../../components/admin/parking/AdmParkingTable'
import AdmParkingIdModal from '../../../components/admin/parking/AdmParkingIdModal'
import AdmParkingModal from '../../../components/admin/parking/AdmParkingModal'



const AdmParking = () => {
  // const { session } = useContext(AuthContext);
  // if(session.role?.toLowerCase() !== 'admin') return null;
  let recipient = 'admin';  // Replace 'admin' with the actual admin identifier
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [stompClient, setStompClient] = useState(null);

  useEffect(() => {
    const socket = new SockJS(`${BASE_URL}/ws`);
    const client = new Client({
      webSocketFactory: () => socket,
      onConnect: () => {
        console.log('WebSocket Client Connected');
        client.subscribe('/queue/admin/private', (message) => {
          console.log('Received message:', message);
          try {
            const parsedMessage = message.body;  // Parse the message body here
            console.log('Parsed message:', parsedMessage);
            setMessages((prevMessages) => [...prevMessages, parsedMessage]);
          } catch (error) {
            console.error('Error parsing message:', error);
          }
        });
      },
      onStompError: (frame) => {
        console.error('Broker reported error: ' + frame.headers['message']);
        console.error('Additional details: ' + frame.body);
      },
    });
  
    client.activate();
    setStompClient(client);
  
    return () => {
      if (client) {
        client.deactivate();
      }
    };
  }, []);

  const sendMessage = () => {
    if (stompClient && stompClient.connected && input && recipient) {
      const message = {
        sender: 'admin',  // Replace 'currentUser' with the actual current user identifier
        recipient,
        content: input,
      };
      stompClient.publish({ destination: '/app/sendMessage', body: JSON.stringify(message) });
      setInput('');
    }
  };
  
  return (
    <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        maxHeight: 'calc(100% - 90px)',
    }}>
      <div>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
      <div>
        <h2>Garage</h2>
        <ul>
          {messages.map((msg, index) => (
            <li key={index}>{msg}</li>
          ))}
        </ul>
      </div>
        <AdmParkingHeader />
        <AdmParkingTable />
        <AdmParkingModal />
        <AdmParkingIdModal />
    </Box>
  )
}

export default AdmParking