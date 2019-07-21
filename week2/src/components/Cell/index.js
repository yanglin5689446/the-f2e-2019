

import React, { useCallback, useContext } from 'react'
import NestedDraggable from 'components/NestedDraggable'
import CellContext from 'context/cell'
import './style.scss'

const Cell = React.memo(({ type, index, cards }) => {
  const { moveCard } = useContext(CellContext)
  const renderCards = useCallback(() => { 
    const position = { type, index }
    if(type === 'standard'){
      return cards
        .map((card, offset) => ({ ...card, offset, position }))
        .reverse()
        .reduce((nested, card) => (<NestedDraggable current={card} nested={nested} />), null)
    }
    else if(type === 'free' || type === 'final'){
      return cards[0] && (<NestedDraggable current={{ ...cards[0], offset: 0, position }} nested={null} />)
    }
    return null
  }, [type, index, cards])

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
      { renderCards() }
    </div>
  )
})

export default Cell