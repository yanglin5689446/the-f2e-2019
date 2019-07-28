
import React from 'react'
import './App.scss'

const Recommendation = () => (
  <div className="recommendation row pr-0 col">
    <div className="col-2 p-4 h4 word-color">
      <i className="fa fa-angle-left" />
    </div>
    <div className="align-self-center pb-4 cover position-relative">
      <img src="https://img.mymusic.net.tw/mms/album/L/007/668007.jpg" alt=""/>
    </div>
    <div className="col p-5 align-self-center text-left">
      <div>
        <h5 className="word-color">
          每日推薦
        </h5>
        <h5 className="word-color">
          根據您的喜好，推薦您可能喜歡的歌曲
        </h5>
      </div>
      
      <div className='py-3 d-flex align-items-center'>
        <h2 className='word-color'>
          披星戴月的想你
        </h2>
        <div>
          <i className="far fa-play-circle px-2" />
          <i className="far fa-heart px-2" />
        </div>
      </div>
      <h4 className='word-color'>告五人</h4>
      <div className='pt-5'>
        <button className="button mr-4">全部播放</button>
        <button className="button mr-3">加入音樂庫</button>
      </div>
    </div>
  </div>
)

const PlaylistItem = ({ song, artist, album }) => (
  <tr>
    <td className='text-right'> <i className="far fa-play-circle"></i> </td>
    <td>{song}</td>
    <td>{artist}</td>
    <td>{album}</td>
    <td>
      <i className="far fa-heart px-2" />
      <i className="fas fa-plus px-2" />
    </td>
  </tr>
)

const Playlist = () => (
  <div className="play-list pt-4 px-0 col">
    <table className="table table-borderless table-striped">
      <thead>
        <tr>
          <th></th>
          <th>歌曲</th>
          <th>歌手</th>
          <th>專輯</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <PlaylistItem song='年少有為' artist='李榮浩' album='年少有為' />
        <PlaylistItem song='魚' artist='怕胖團' album='青春只差兩撇' />
        <PlaylistItem song='現在你好嗎' artist='原子邦尼' album='現在你好嗎' />
        <PlaylistItem song='失蹤人口' artist='甜約翰' album='Dear' />
        <PlaylistItem song='年少有為' artist='李榮浩' album='年少有為' />
        <PlaylistItem song='年少有為' artist='李榮浩' album='年少有為' />
      </tbody>
      
    </table>
  </div>
)

const Navigation = () => (
  <div className="navigation theme pb-4">
    <div className="row">
      <div className="col-8">
        <div className="search pl-3 pt-4 position-relative word-color">
          <i className="fas fa-search position-absolute word-color" />
          <input type="text" className="input pr-2 position-absolute" placeholder="輸入歌手、歌名或專輯" />
        </div>
      </div>
      <div className="col pl-5 pt-4 h4 word-color">
        <i className="fas fa-user" />
      </div>
    </div>
    <div className="pl-5 pr-4 pt-3">
      <div className="d-flex justify-content-between align-items-center">
        <div>音樂庫</div>
        <div>
          <button type='button' className='button'>新增</button>
        </div>
      </div>
      <div className='pl-3 py-2'>
        <i className="fas fa-music" /> 全部歌曲
      </div>
      <div className='pl-3 py-2'>
        <i className="fas fa-heart" /> 收藏歌曲
      </div>
      <div className='pl-3 py-2'>
        <i className="fas fa-plus" /> 睡前要聽
      </div>
      <div className='pl-3 py-2'>
        <i className="fas fa-plus" /> 都是如萱
      </div>
    </div>
  </div>
)

const NowPlaying = () => (
  <div className="now-playing secondary">
    <div className="cover">
      <div className='word-color my-1'>
        <strong>我的歌單</strong>
      </div>
      <div className="p-3">
        <img className='img-fluid' src="https://i.kfs.io/album/global/44323445,1v1/fit/500x500.jpg" alt=""/>
      </div>
      <div className="text-center">
        <div className='word-color text-underline h5'>蔡依林</div>
        <div className='word-color text-underline font-weight-bold'>怪美的</div>
      </div>
     
    </div>
    <div className="player">
      <div className="px-5 pb-3 d-flex justify-content-center">
        <i className="fas fa-plus px-3" />
        <i className="fas fa-heart px-3" />
        <i className="fas fa-ellipsis-h px-3" />
      </div>
      <div className="playing-progress">
        <div className="progress-bar">
          <div style={{ width: '25%' }} className='progress-bar-now'></div>
        </div>
        <div className="d-flex justify-content-between">
          <div>1:03</div>
          <div>3:02</div>
        </div>
      </div>
      <div className="actions px-4 py-3 d-flex justify-content-between align-items-center word-color">
        <i className="fas fa-volume-down" />
        <i className="fas fa-step-backward" />
        <i className="far fa-2x fa-pause-circle" />
        <i className="fas fa-step-forward" />
        <i className="fas fa-redo" />
      </div>
    </div>
  </div>
)

const App = () => (
  <div className="container-fluid p-0 full-height d-flex">
    <div className="main p-0 col d-flex flex-column">
      <Recommendation />
      <div className="separation"></div>
      <Playlist />
    </div>
    <div className="sidebar p-0 col-2">
      <Navigation />
      <NowPlaying />
    </div>
  </div>
)

export default App;
