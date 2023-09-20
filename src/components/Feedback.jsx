import React, { useState } from 'react';

export default function Feedback() {
  const [feedback, setFeedback] = useState(null);

  const handleFeedback = (isPositive) => {
    setFeedback(isPositive ? 'Like' : 'Dislike');
  };

  return (
    <div className="feedback">
      <h2>App Feedback</h2>
      <p>Did you find the app helpful?</p>
      <button onClick={() => handleFeedback(true)}>Like</button>
      <button onClick={() => handleFeedback(false)}>Dislike</button>
      {feedback && <p>Thank you for your {feedback} feedback!</p>}
    </div>
  );
};

