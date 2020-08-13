import React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import { Avatar } from '@material-ui/core';
import { useDataLayerValue } from './DataLayer';

export const Header = ({ spotify }) => {

    const [{ user, currentScreen }, dispatch] = useDataLayerValue();

    const handleKeyDown = async (ev) => {
        const query = ev.target.value;
        const result = await spotify.search(`${query}`, ['artist', 'album', 'playlist']);
        dispatch({ type: 'SET_ARTISTS_LIST', artistsList: result.artists });
        dispatch({ type: 'SET_ALBUMS_LIST', albumsList: result.albums });
        dispatch({ type: 'SET_PLAYLISTS_LIST', playlistsList: result.playlists });
        if (currentScreen !== 'Search') {
            dispatch({ type: 'SET_CURRENT_SCREEN', currentScreen: 'Search' });
        }
    }

    return (
        <div className="header">
            <div className="header__left">
                <SearchIcon />
                <input type="text" placeholder="Search for Artists, Songs, or Albums" onKeyDown={handleKeyDown} />
            </div>
            <div className="header__right">
                <Avatar src={user?.images[0]?.url} alt={user?.display_name} />
                <h4>{user?.display_name}</h4>
            </div>
        </div>
    )
}
