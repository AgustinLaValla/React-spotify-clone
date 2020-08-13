import React, { useEffect } from 'react'
import { Header } from './Header';
import { useDataLayerValue } from './DataLayer';
import { ItemsList } from './ItemsList';

export const Search = ({ spotify }) => {

    const [{ artistsList, albumsList, playlistsList }, dispatch] = useDataLayerValue();

    return (
        <div className="search">
            <Header spotify={spotify} />
            <div className="search__resultsContainer">
                {artistsList && <ItemsList itemsList={artistsList} title="Artists" spotify={spotify}  itemType="Artist"/>}
                {albumsList && <ItemsList itemsList={albumsList} title="Albums" spotify={spotify}  itemType="Album"/>}
                {playlistsList && <ItemsList itemsList={playlistsList} title="Playlists" spotify={spotify}  itemType="Playlist"/>}
            </div>
        </div>
    )
}
