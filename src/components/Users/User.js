import React from 'react';

const User = (props) => {
  const { info: { name, age, email} } = props;
  
  return(
  <div>
    <h1>User information</h1>
    <br />
    <ul>
      <li><strong>Name:</strong> {name}</li>
      <li><strong>Age:</strong> {age}</li>
      <li><strong>Email:</strong> {email}</li>
    </ul>
  </div>
)};

export default User;