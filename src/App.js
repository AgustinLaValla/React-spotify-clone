import React, { useEffect, useState, useContext } from 'react';
import { Login } from './components/Login';
import './App.css';
import { getTokenFromResponse } from './spotify';
import SpotifyWebApi from 'spotify-web-api-js';
import { Dashboard } from './components/Dashboard';
import { useDataLayerValue } from './components/DataLayer';


const spotify = new SpotifyWebApi();

function App() {

  const [{ user, token }, dispatch] = useDataLayerValue();

  useEffect(() => {
    const hash = getTokenFromResponse();
    window.location.hash = '';
    const _token = hash.access_token;
    if (_token) {
      dispatch({ type: 'SET_TOKEN', token: _token });
      spotify.setAccessToken(_token);
      spotify.getMe().then(user => dispatch({ type: 'SET_USER', user: user }));
      dispatch({ type: 'SET_CURRENT_SCREEN', currentScreen: 'Player' })
      spotify.getUserPlaylists().then(playLists => dispatch({ type: 'SET_USER_PLAYLISTS', playLists: playLists }));
      spotify.getPlaylist('37i9dQZEVXcGCEYfa5aelK').then(result => dispatch({ type: 'SET_CURRENT_PLAYLIST', playlist: result }));
    }
  }, []);

  return (
    <div className="App">
      {
        token ? <Dashboard spotify={spotify} /> : <Login />

      }
    </div>
  );
}

export default App;
