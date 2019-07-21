/* eslint-disable react-hooks/rules-of-hooks */

import React, { useState, useCallback } from 'react'
import { values, suits } from '../constants'

const CellContext = React.createContext()
const initialState = {
  free: [[], [], [], []],
  final: [[], [], [], []],
  standard: [[], [], [], [], [], [], [], []],
}

const matchedSuit = (card1, card2) => {
  const groups = [['spade', 'clover'], ['heart', 'diamond']]
  return (!card2 
    || (groups[0].includes(card1.suit) && groups[1].includes(card2.suit) )
    || (groups[1].includes(card1.suit) && groups[0].includes(card2.suit)) 
  )
}
const diffValue = (card1, card2) => values.indexOf(card1.value) - values.indexOf(card2.value)

// fix logic
const deckDraggable = (deck) => !deck
  .some((card, index) => {
    if (index === 0) return false 
    return (diffValue(deck[index - 1], card) !== 1 || !matchedSuit(deck[index - 1], card ))
  })
const freeSlots = (cells) => cells.free
  .concat(cells.standard)
  .filter(cell => !cell.length)
  .length + 1

const deckDroppable = (deck, toCard) => matchedSuit(deck[0], toCard) && (!toCard || (diffValue(toCard, deck[0]) === 1))
const canStack = (card1, card2, index) => {
  if (!card2){
    if(Object.keys(suits).indexOf(card1.suit) !== index) return false
    return card1.value === 'A'
  }
  return (card1.suit === card2.suit && diffValue(card1, card2) === 1)
}


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
      console.log(deckDraggable(fromDeck))
      console.log(deckDroppable(fromDeck, toCard))
      console.log(freeSlots(cells))
      if(deckDraggable(fromDeck) && deckDroppable(fromDeck, toCard) && freeSlots(cells) >= fromDeck.length){
        next[from.type][from.index] = fromCell.slice(0, from.offset)
        next[to.type][to.index] = toCell.concat(fromDeck)
      }
      updateCells(next)
    }
    else if (to.type === 'free' || to.type === 'final') {
      if(fromDeck.length !== 1)return
      if(to.type === 'free' && toCell.length !== 0) return
      if(to.type === 'final' && !(canStack(fromDeck[0], toCard, to.index))) return

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