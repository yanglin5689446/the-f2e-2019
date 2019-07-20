

import React from 'react'
import Card from 'components/Card'
import './style.scss'

const Cell = ({ type, cards }) => (
  <div className={`cell m-3 ${type}`}>
    {
      type === 'standard' && cards.map((card, index) => <Card key={index} offset={index} {...card}  />)
    }
  </div>
)

export default Cell