/* eslint-disable react-hooks/rules-of-hooks */

import React, { useState, useCallback } from 'react'
import { values, suits } from '../constants'

const CellContext = React.createContext()
const initialState = {
  free: Array(4).fill(null),
  final: Array(4).fill(null),
  standard: [[], [], [], [], [], [], [], []],
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
  })
  return  (
    <CellContext.Provider value={{ cells, updateCells, randomize }}>
      <Component {...props} />
    </CellContext.Provider>
  )
}

export default CellContext