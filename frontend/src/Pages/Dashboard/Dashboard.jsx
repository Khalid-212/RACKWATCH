import React from 'react'
import Header from '../../Components/Header/Header'
import Card from '../../Components/Card/Card'
import "./Dashboard.css";
function Dashboard() {
  return (
    <div>
      <Header/>
      <div className="cards">
        <div className="cards">
        <Card value="100" key="Servers" color="gray" />
        <Card value="100" key="Servers" color="red" />
        <Card value="100" key="Servers" color="green" />
        </div>
        </div>
    </div>
  )
}

export default Dashboard
