import React, { useState, useEffect } from 'react';


const Leaderboard = () => {

  const [leaderboard, setleaderboard] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:3001/api/leaderboard', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
    .then(response => response.json())
    .then(data => setleaderboard(data))
    .catch(error => {
      console.error('Error fetching leaderboard', error);
    });
  }, []);

  return (
    <div>
      <table className='table'>
        <thead className='table-header' style={{color:"lightgreen"}}>
          <tr className='table-row'>
            <td>Rank</td>
            <td>Username</td>
            <td>Earn points</td>
          </tr>
        </thead>
        <tbody>
          {leaderboard.map((user, index) => (
            <tr className='table-body' key={index}>
              <td>{index + 1}</td>
              <td>{user._id}</td>
              <td>{user.highestScore}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Leaderboard