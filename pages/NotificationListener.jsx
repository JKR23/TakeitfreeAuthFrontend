'use client';

// obligatoire car ça utilise useEffect et WebSocket côté client
import { useEffect } from 'react';

import NotificationListener from "@/pages/NotificationListener";

export default function NotificationListener() {
    useEffect(() => {
        const socket = new WebSocket('wss://takeitfreeauthbackend-83rr.onrender.com/ws');

        socket.onopen = () => {
            console.log('✅ Connected to WebSocket');
        };

        socket.onmessage = (event) => {
            console.log('📩 New notification:', event.data);
            alert(event.data); // Tu pourras plus tard remplacer par une UI type toast
        };

        socket.onclose = () => {
            console.log('❌ Disconnected from WebSocket');
        };

        return () => socket.close();
    }, []);

    return <div>🔔 Listening for notifications...</div>;
}
