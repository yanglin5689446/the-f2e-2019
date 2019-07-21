/* eslint-disable react-hooks/rules-of-hooks */

import React, { useState, useCallback } from 'react'
import { values, suits } from '../constants'

const CellContext = React.createContext()
const initialState = {
  free: [[], [], [], []],
  final: [[], [], [], []],
  standard: [[], [], [], [], [], [], [], []],
}


// fix logic
const deckDraggable = (deck) => true
const deckDroppable = (deck, toCard) => true
const enoughFreeCells = (deck, cells) => true

export const CellContextWrapper = Component => props => {
  const [cells, updateCells] = useState(initialState)
  const randomize = useCallback(() => {
    const standard = [[], [], [], [], [], [], [], []]

    // create 52 cards
    const cards = Object.keys(suits)
      .flatMap(suit => values
        .map(value => ({ suit, value })
      ))
    
    // random shuffle
    for(let i = 0; i < 40; i ++) {
      let r1 = Math.floor(Math.random() * 52)
      let r2 = Math.floor(Math.random() * 52)
      const t = cards[r1]
      cards[r1] = cards[r2]
      cards[r2] = t
    }
    
    // push into standard cells
    cards.forEach((card, index) => standard[index % 8].push(card))
    
    updateCells({
      ...initialState,
      standard
    })
  }, [])

  const moveCard = useCallback((from, to) => {
    const { free, final, standard } = cells
    const next = { free: free.slice(), final: final.slice(), standard: standard.slice() }
    const fromCell = next[from.type][from.index]
    const toCell = next[to.type][to.index]
    const fromDeck = fromCell.slice(from.offset)
    const toCard = toCell.length ? toCell[toCell.length - 1] : null 

    if (to.type === 'standard') {
      if(deckDraggable(fromDeck) && deckDroppable(fromDeck, toCard) && enoughFreeCells(cells, fromDeck)){
        next[from.type][from.index] = fromCell.slice(0, from.offset)
        next[to.type][to.index] = toCell.concat(fromDeck)
      }
      updateCells(next)
    }
    else if (to.type === 'free' || to.type === 'final') {
      if(fromDeck.length !== 1)return
      if(to.type === 'free' && toCell.length !== 0) return
      if(to.type === 'final' && !(deckDroppable(fromDeck, toCard))) return

      next[from.type][from.index] = fromCell.slice(0, from.offset)
      next[to.type][to.index] = toCell.concat(fromDeck)
      
      updateCells(next)
    }
  }, [cells])
  return  (
    <CellContext.Provider value={{ cells, updateCells, randomize, moveCard }}>
      <Component {...props} />
    </CellContext.Provider>
  )
}

export default CellContext