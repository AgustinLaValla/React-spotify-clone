import React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import { Avatar } from '@material-ui/core';
import { useDataLayerValue } from './DataLayer';
import { useState } from 'react';

export const Header = ({ spotify }) => {

    const [{ user, currentScreen }, dispatch] = useDataLayerValue();
    const [inputValue, setInputValue] = useState('');

    const handleChange = async ({target:{value}}) => {

        setInputValue(value);
        const query = value;
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
                <input
                    type="text"
                    placeholder="Search for Artists, Songs, or Albums"
                    onChange={handleChange}
                    value={inputValue}
                    onKeyPress={({key}) =>  key ==='Enter' ? setInputValue('') : null}
                />
            </div>
            <div className="header__right">
                <Avatar src={user?.images[0]?.url} alt={user?.display_name} />
                <h4>{user?.display_name}</h4>
            </div>
        </div>
    )
}
