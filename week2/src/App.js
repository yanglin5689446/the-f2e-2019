import React, { useContext, useEffect } from 'react'
import Cell from './components/Cell'
import context from 'context'
import CellContext from 'context/cell'

import './App.scss'

const App = () => {
  const { cells, randomize } = useContext(CellContext)
  useEffect(() => {
    randomize()
  }, [])
  return (
    <div className='container field'>
      <div className="status-bar py-3">
        <button className='btn btn-primary' type='button' onClick={randomize}>
          New Game
        </button>
      </div>
      <div className='d-flex justify-content-between'>
        <div className='cell-container'>
          { cells.free.map((card, index) => <Cell key={index} type='free' cards={[card]} />) }
        </div>
        <div className='cell-container'>
          { cells.free.map((card, index) => <Cell key={index} type='final' cards={[card]} />) }
        </div>
      </div>
      
      <div className='cell-container'>
        { cells.standard.map((cards, index) => <Cell key={index} type='standard' cards={cards} />) }
      </div>
    </div>
  )
}

export default context(App)
