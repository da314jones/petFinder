import React from 'react';
import { useState } from 'react';

function UserForm({ isEmailValid, handleEmailValidation }) {
  const [user, setUser] = useState({
    name: '',
    email: '',})

  return (
    <div>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={user.name}
        onChange={(e) => setUser({ ...user, name: e.target.value })}
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
      />
      {!isEmailValid && <p>Email is not valid</p>}
    </div>
  );
}

export default UserForm;
