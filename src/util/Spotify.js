const clientId = "60e618f3de7e4a41aaf0ed41dc277335";
const scopes = "playlist-modify-public"; //playlist-modify-private";
const redirect_uri = "https://capo-jammr.surge.sh";
const searchAPI = "https://api.spotify.com/v1/search";
const userAPI = "https://api.spotify.com/v1/me";
const playlistAPI = "https://api.spotify.com/v1/users/USERID/playlists";
const plTracksAPI = "https://api.spotify.com/v1/users/USERID/playlists/PLAYLISTID/tracks";


let accessToken;
let expiresIn;

const Spotify = {
  getAccessToken() {
    if (accessToken) {
      return accessToken;
    }

    let url = window.location.href;
    accessToken = this.findStr(url, "access_token=", "&");
    if (accessToken === undefined) {
      window.location.href = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=${scopes}&redirect_uri=${redirect_uri}`;
      accessToken = this.findStr(url, "access_token=", "&");
    } else {
      expiresIn = this.findStr(url, "expires_in=", "&");
      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
      return accessToken;
    }
  },

  findStr (string, item1, item2) {
    let url = string;
    let index1 = url.indexOf(item1);
    if (index1 === -1) {
      return;
    }
    let index2 = url.indexOf(item2, index1);
    if (index1 !== -1) {
      return string.slice(index1 + item1.length, index2);
    } else {
      return string.slice(index1 + item1.length);
    }
  },

  search(term) {
    return fetch(`${searchAPI}?q=${term}&type=track`, {headers: this.buildHeader()})
        .then(response => response.json())
        .then(jsonResponse => {
            if (jsonResponse.tracks) {
              return jsonResponse.tracks.items.map(function(track) {
                return {
                  id: track.id,
                  name: track.name,
                  artist: track.artists[0].name,
                  album: track.album.name,
                  uri: track.uri
                }}
              )}
            else {
                return [];
            }
        });
    },

    savePlaylist(title, trackURIs) {
      if (!title && !trackURIs) {
        return;
      }
      return fetch(`${userAPI}`, {headers: this.buildHeader()}
    ).then(response => response.json()).then(jsonResponse => {
          let userId = jsonResponse.id;
          return this.createPlaylist(userId, title, trackURIs);
      });
    },

    createPlaylist(userId, title, trackURIs) {
      let jsonBody = JSON.stringify({name: title, public: true});
      let url = playlistAPI.replace("USERID", userId);
      return fetch(url, { headers: this.buildHeader(), method:'POST', body: jsonBody}
      ).then(response => this.handleResponse(response)
      ).then(jsonResponse => {
        let playlistId = jsonResponse.id;
        return this.saveTracks(userId, playlistId, trackURIs);
      });
    },

    saveTracks(userId, playlistId, trackURIs) {
      let body = JSON.stringify(trackURIs);
      let url = plTracksAPI.replace("USERID", userId).replace("PLAYLISTID", playlistId);
      return fetch(url, { headers: this.buildHeader(), method:'POST', body: body}
      ).then(response => this.handleResponse(response)
      ).then(jsonResponse => {
        return jsonResponse.snapshot_id;
      });
    },

    buildHeader() {
      let myToken = this.getAccessToken();
      return {Authorization: `Bearer ${myToken}`};
    },

    handleResponse(response) {
      if (response.ok) {
          return response.json();
      }
      throw new Error('Request failed!');
    }

};

export default Spotify;
