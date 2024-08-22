import React from 'react'

function Dashboard({ handleLogout }) {
  return (
    <div>
      Dashboard
      <button className="btn btn-danger" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default Dashboard