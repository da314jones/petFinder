import React, { useState, useEffect } from 'react';
import "./Notifications.css"

export default function Notification({ message, onClose }) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
      onClose();
    }, 3000); 

    return () => clearTimeout(timer);
  }, [onClose]);

  return show ? (
    <div className="notification">
      <p>{message}</p>
      <button onClick={() => setShow(false)}>Close</button>
    </div>
  ) : null;
}
