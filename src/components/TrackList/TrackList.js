import React from 'react';
import Track from '../Track/Track.js';
import './TrackList.css';

class TrackList extends React.Component {

  render () {
    let tracks = this.props.tracks ? this.props.tracks: [];
    return (
    <div className="TrackList">
      {tracks.map(track => {return(<Track key={track.id} track={track} onAdd={this.props.onAdd} isRemoval={this.props.isRemoval} onRemove={this.props.onRemove} />)})}
    </div>
    );
  }
}

export default TrackList;
