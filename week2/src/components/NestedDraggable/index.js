import React from 'react'
import Card from 'components/Card'
import './style.scss'

const NestedDraggable = ({ type, nested, current }) => {
  return (
    <div 
      className={`nested-draggable ${type}`}
      draggable
      onDragStart={event => {
        event.dataTransfer.setData('data', JSON.stringify(current))
        event.stopPropagation()
      }}
      onDrag={event => {
        event.target.style.display = 'none'
      }}
      onDragEnd={event => {
        event.target.style.display = 'block'
      }}
    >
      <Card {...current} />
      { nested }
    </div>
  )
}

export default NestedDraggable