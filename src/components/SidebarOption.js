import React from 'react'
import { useDataLayerValue } from './DataLayer'

export const SidebarOption = ({ title, Icon, playlistId, spotify, pageName }) => {

    const [{ currentScreen }, dispatch] = useDataLayerValue();

    const renderTo = async () => {
        console.log('pasé por Render to')
        if (pageName) {
            dispatch({ type: 'SET_CURRENT_SCREEN', currentScreen: pageName });
        }
        if (pageName === 'Player') {
            const result = await spotify.getPlaylist('37i9dQZEVXcGCEYfa5aelK');
            dispatch({ type: 'SET_CURRENT_PLAYLIST', playlist: result });
        }
        if (pageName === 'Home') {
            try {
                const result = await spotify.getMyRecentlyPlayedTracks();
                dispatch({ type: 'SET_RECENTLY_PLAYED_TRACKS', recentlyPlayerTracks: { items: result.items.map(item => item.track) } });
                const resp = await spotify.getFeaturedPlaylists();
                dispatch({ type: 'SET_FEATURED_PALYLISTS', featuredPlaylists: { items: resp.playlists.items } });
                const newRealises = await spotify.getNewReleases();
                dispatch({ type: 'GET_NEW_REALISES', newRealises: { items: newRealises.albums.items } });

            } catch (error) {
                console.log(error);
            }
        }
    };


    const getPlayList = async () => {
        console.log('pasé por Getplaylist')
        if (currentScreen !== 'Player') {
            dispatch({ type: 'SET_CURRENT_SCREEN', currentScreen: 'Player' });
        }
        const result = await spotify.getPlaylist(playlistId);
        dispatch({ type: 'SET_CURRENT_PLAYLIST', playlist: result });
    }

    return (
        <div className="sidebarOption">
            {Icon && <Icon className="sidebarOption__icon" />}
            {Icon ? <h4 onClick={renderTo}>{title}</h4> : <p onClick={getPlayList}>{title}</p>}
        </div>
    )
}
