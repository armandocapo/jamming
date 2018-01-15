import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar.js';
import SearchResults from '../SearchResults/SearchResults.js';
import Playlist from '../Playlist/Playlist.js';
import Spotify from '../../util/Spotify.js';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      playlistTracks: [],
      playlistName: 'My Playlist',
      trackURIs: [],
      searchResults: []
    };

    this.searchSpotify = this.searchSpotify.bind(this);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
  }

  searchSpotify(term) {
    Spotify.search(term).then(results => {
      this.setState({searchResults: results});
    });
  }

  addTrack(track) {
    if (this.state.playlistTracks.every(playlistTrack => playlistTrack.id !== track.id)) {
      this.setState(prevState => ({
        playlistTracks: [...prevState.playlistTracks, track]
      }));
    };
  }

  removeTrack(track) {
    let newPlaylistTracks = this.state.playlistTracks.filter(tracks => tracks.id !== track.id);
    this.setState({playlistTracks: newPlaylistTracks});
  }

  updatePlaylistName(name) {
    this.setState({playlistName: name});
  }

  savePlaylist() {
    let trackURIs = this.state.playlistTracks.map(track => track.uri);
    if (trackURIs && this.state.playlistName && trackURIs.length > 0) {
      Spotify.savePlaylist(this.state.playlistName, trackURIs).then(() => {
      this.setState({playlistName: 'New Playlist', playlistTracks: [], searchResults: [], trackURIs: []});
});
}
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.searchSpotify} />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} onRemove={this.removeTrack} />
            <Playlist title={this.state.playlistName} onNameChange={this.updatePlaylistName} onSave={this.savePlaylist} tracks={this.state.playlistTracks} onRemove={this.removeTrack} onAdd={this.addTrack} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
