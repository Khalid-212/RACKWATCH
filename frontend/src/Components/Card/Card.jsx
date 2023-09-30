
import React from 'react'
import "./Card.css";

function Card({value, key,color}) {
  return (
    <div className='card' style={{
      border: `5px solid ${color}`,
      color: `${color}`
    }}>
      <div className="value">{value}</div>
      <div className="key">{"key"}</div>
    </div>
  )
}

export default Card
