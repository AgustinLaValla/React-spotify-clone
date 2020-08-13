export const initialState = {
    user: null,
    playLists: [],
    playing: false,
    item: null,
    token: null,
    currentPlayList: null,
    currentScreen: 'Player',
    artistsList: null,
    albumLists: null,
    playlistsList: null,
    artistDetails: null,
    artistTopTracks: null,
    artistAlbums: [],
    albumDetails: null,
    recentlyPlayerTracks: null,
    featuredPlayLists: null,
}

export const reducer = (state, action) => {
    console.log(action);
    switch (action.type) {
        case 'SET_USER':
            return {
                ...state,
                user: { ...action.user }
            };
        case 'SET_TOKEN':
            return {
                ...state,
                token: action.token
            }

        case 'SET_USER_PLAYLISTS':
            return {
                ...state,
                playLists: { ...action.playLists }
            }

        case 'SET_CURRENT_PLAYLIST':
            return {
                ...state,
                currentPlayList: { ...action.playlist }
            }

        case 'SET_CURRENT_SCREEN':
            return {
                ...state,
                currentScreen: action.currentScreen
            }

        case 'SET_ARTISTS_LIST':
            return {
                ...state,
                artistsList: { ...action.artistsList }
            }

        case 'SET_ALBUMS_LIST':
            return {
                ...state,
                albumsList: { ...action.albumsList }
            }

        case 'SET_PLAYLISTS_LIST':
            return {
                ...state,
                playlistsList: { ...action.playlistsList }
            }

        case 'SET_ARTIST_DETAILS':
            return {
                ...state,
                artistDetails: { ...action.artistDetails }
            }

        case 'SET_ARTIST_TOP_TRACKS':
            return {
                ...state,
                artistTopTracks: [...action.topTracks]
            }

        case 'RESET_ARTIST_TOP_TRACKS':
            return {
                ...state,
                artistTopTracks: null
            }

        case 'SET_ARTIST_ALBUMS':
            return {
                ...state,
                artistAlbums: [...action.artistAlbums]
            }

        case 'SET_ALBUM_DETAILS':
            return {
                ...state,
                albumDetails: { ...action.albumDetails }
            }

        case 'SET_RECENTLY_PLAYED_TRACKS':
            return {
                ...state,
                recentlyPlayerTracks: {...action.recentlyPlayerTracks}
            }

        case 'SET_FEATURED_PALYLISTS':
            return {
                ...state,
                featuredPlaylists: { ...action.featuredPlaylists }
            }

        case 'GET_NEW_REALISES':
            return {
                ...state,
                newRealises: { ...action.newRealises }
            }

        default:
            return state;
    }
}