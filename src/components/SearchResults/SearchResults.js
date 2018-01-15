import React from 'react';
import './SearchResults.css';
import TrackList from '../TrackList/TrackList.js';

class SearchResults extends React.Component {

  render () {
    let results = this.props.searchResults ? this.props.searchResults: [];
    return (
      <div className="SearchResults">
        <h2>Results</h2>
        <TrackList tracks={results} onAdd={this.props.onAdd} onRemove={this.props.onRemove} isRemoval={false} />
      </div>
    );
  }
}

export default SearchResults;
