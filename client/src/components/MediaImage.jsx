import React from 'react';
import WaveformData from 'waveform-data';
import CSSModules from 'react-css-modules';
import styles from './MediaImage.css';


class MediaImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
    };
  }

  render() {
    const comments = this.props.comments.map((comment, i) => {
      return (
        <div className="TP-comment" style={{left: comment.timeonsong * 560 / 300}} key={i}>
          <div></div>
          <img className="TP-avatar" src={comment.avatar} alt="" ></img>
          <div className="TP-commentText" >
            <div><span className="TP-userName">{comment.username}: </span><span className="TP-commentLine">{comment.comment}</span></div>
          </div>
        </div>
      );
    });

    return (
      <div className="TP-mediaImage">
        <div className="TP-currentTime">{`${this.props.currentTime}`}</div>
        <div className="TP-duration">{`${this.props.duration}`}</div>
        <div className="timeLine">
        <canvas id="canvas" className="TP-canvas" width="1000" height="200"></canvas>
        <div className="TP-commentBlock">
          {comments}
        </div>
        </div>
        
        {/* <input
          id="TP-timeline"
          className="canvas"
          type="range"
          min="0"
          max={this.props.durationSecs}
          value={this.props.seconds}
          // onClick={this.props.changeTime("TP-timeline")}
        /> */}
      </div>
    );
  }
};

export default MediaImage;
