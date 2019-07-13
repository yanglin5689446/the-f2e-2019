import React from 'react'
import './App.css'

const Sidebar = () => (
  <div className='sidebar'>
    <div className="sidebar-icons-container d-flex flex-column">
      <button type='button' className='sidebar-button'>
        <i className='material-icons'>format_list_bulleted</i>
      </button>
      <button type='button' className='sidebar-button'>
        <i className='material-icons'>insert_chart</i>
      </button>
      <button type='button' className='sidebar-button'>
        <i className='material-icons'>library_music</i>
      </button>
    </div>
    <span className='decoration-text'>
      pomodoro
    </span>
  </div>
)

const BigPlayButton = () => (
  <div className='play-button-circle d-flex'>
    <button type='button' className='play-button'>
      <i className="material-icons">play_arrow</i>
    </button>
  </div>
)

const TodoItem = ({ title }) => (
  <div className='todo-item py-2 d-flex'>
    <div className='decoration-circle' />
    <div className='ml-2 d-flex justify-content-between flex-grow-1'>
      <div className='title '>{ title }</div>
      <div className='play text-right'>
        <i className="material-icons">play_circle_outline</i>
      </div>
    </div>
  </div>
)

const App = () => (
  <div className='d-flex'>
    <div className='input-container'>
      <input
        className='input new-mission'
        type="text"
        placeholder='add a new mission…'
      />
      <button type='button' className='add-button'>
        <i className='material-icons'>add</i>
      </button>
    </div>
    <div className='current-mission d-flex'>
      <div className='decoration-circle' />
      <div className='ml-3'>
        <div className='title'>the First thing to do today</div>
        <div className='mt-2'>
          <div className='small-circle'></div>
        </div>
      </div>
    </div>
    <div className='timer'>
      25:00
    </div>
    <div className='todo-list'>
      <TodoItem title='the second thing to do today' />
      <TodoItem title='the second thing to do today' />
      <TodoItem title='the second thing to do today' />
      <div className='more float-right mt-2'>MORE</div>
    </div>

    <Sidebar />
    <BigPlayButton />
  </div>
)

export default App
