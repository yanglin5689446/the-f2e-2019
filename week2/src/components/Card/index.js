
import React from 'react'

import { suits } from 'constants.js'
import './style.scss'

const Card = ({ suit, value, offset }) => (
  <div className='card' style={{ '--offset': offset }}>
    <div className="suit top">
      <div>{ value }</div>
      <img src={suits[suit]} alt=""/>
    </div>
    <div className="suit bottom">
      <div>{ value }</div>
      <img src={suits[suit]} alt=""/>
    </div>
  </div>
) 

export default Card