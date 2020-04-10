/* eslint-disable class-methods-use-this */
/* eslint-disable import/extensions */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import $ from 'jquery';

import PlayButton from './PlayButton.jsx';
import AlbumCover from './AlbumCover.jsx';
import SongInfo from './SongInfo.jsx';

import CSSModules from 'react-css-modules';
import styles from './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      song: undefined,
      waveformData: undefined,
    };
    this.getSongData = this.getSongData.bind(this);
  }

  componentDidMount() {
    this.getSongData();
  }

  getSongData() {
    $.ajax({
      type: 'get',
      url: '/getDataForOneSong',
      data: { songId: Math.ceil(Math.random() * 10000000) + 1 },
      success: (data) => {
        this.setState({ song: data });
      },
      error: () => {
        console.log('error with get request');
      }
    });
  }

  render() {
    const songData = this.state.song;

    if (songData) {
      return (
        <div>
          <h1>audib.ly</h1>
          <div className="TP-topPlayer">
            <PlayButton
              className="TP-playComponent"
              songTitle={songData.songTitle}
              artistName={songData.artistName}
              mediaFile={songData.mediaFile}
              comments={songData.comments}
            />
            <AlbumCover
              albumArt={songData.albumCover}
              songTitle={songData.songTitle}
            />
            <SongInfo
              date={songData.postDate}
              tag={songData.tag}
            />

          </div>
        </div>
      );
    }
    return (null);
  }
}

export default App;
