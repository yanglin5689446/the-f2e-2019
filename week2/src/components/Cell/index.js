

import React, { useCallback, useContext } from 'react'
import NestedDraggable from 'components/NestedDraggable'
import CellContext from 'context/cell'
import './style.scss'

const Cell = React.memo(({ type, index, cards }) => {
  const { moveCard } = useContext(CellContext)

  const onDrop = useCallback(event => {
    const data = JSON.parse(event.dataTransfer.getData('data'))
    const from = { ...data.position, offset: data.offset}
    const to = { type, index }
    moveCard(from, to)
    event.preventDefault()
  })

  return (
    <div
      className={`cell m-3 ${type}`}
      onDragOver={e => e.preventDefault()}
      onDrop={onDrop}
    >
      { 
        cards
          .map((card, offset) => ({ ...card, offset, position: { type, index } }))
          .reverse()
          .reduce((nested, card) => (<NestedDraggable type={type} current={card} nested={nested} />), null)
      }
    </div>
  )
})

export default Cell