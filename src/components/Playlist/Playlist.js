import React from 'react';
import './Playlist.css';
import TrackList from '../TrackList/TrackList.js';

class Playlist extends React.Component {
  constructor(props) {
    super(props);

    this.handleNameChange = this.handleNameChange.bind(this);
    //this.props.onNameChange = this.props.onNameChange.bind(this);
  }

  handleNameChange(event) {
    this.props.onNameChange(event.target.value);
  }

  render () {
    let tracks = this.props.tracks ? this.props.tracks: [];
    return (
      <div className="Playlist">
        <input onChange={this.handleNameChange} defaultValue={this.props.title} />
        <TrackList tracks={tracks} isRemoval={true} onRemove={this.props.onRemove} onAdd={this.props.onAdd} />
        <a className="Playlist-save" onClick={this.props.onSave} >SAVE TO SPOTIFY</a>
      </div>
    );
  }
}

export default Playlist;
