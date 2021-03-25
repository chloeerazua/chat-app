import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import io from "socket.io-client";

let socket;

const Chat = ({ location }) => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const endpoint = 'localhost:5000';

    useEffect(() => {
        const data = queryString.parse(location.search);

        socket = io(endpoint);

        setName(name);
        setRoom(room);

        socket.emit('join', {name: name, room: room}, () => {

        } );

        return () => {
            socket.emit('User has disconnected');

            socket.off();
        }
    }, [endpoint, location.search]);

    return (
        <h1>Chat</h1>
    )
}

export default Chat;