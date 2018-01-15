import React from 'react';
import './Track.css';

class Track extends React.Component {
  constructor (props) {
    super(props);
    this.renderAction = this.renderAction.bind(this);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
  }

  renderAction () {
    return (this.props.isRemoval ? '-' : '+');
  }

  addTrack () {
    this.props.onAdd(this.props.track);
  }

  removeTrack () {
    this.props.onRemove(this.props.track);
  }

  render () {
    let track = this.props.track ? this.props.track: [];
    let action = this.renderAction();
    return (
      <div className="Track">
        <div className="Track-information">
          <h3>{track.name}</h3>
          <p>{track.artist} | {track.album}</p>
        </div>
        <div>
          <a className="Track-action" onClick={action === '+' ? this.addTrack : this.removeTrack}>{action}</a>
        </div>
      </div>
    );
  }
}

export default Track;
