import React from 'react';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import { useDataLayerValue } from './DataLayer';

export const ItemsList = ({ title, itemsList, spotify, itemType }) => {

    const [{ deviceId }, dispatch] = useDataLayerValue();

    const toLowerCase = (text) => text[0].toUpperCase() + text.slice(1);

    const cardMouseOverHandler = (idx) =>
        document.getElementById(`${title}-icon${idx}`).classList.add('icon-display-inline');

    const cardMouseLeaverHandler = (idx) => document.getElementById(`${title}-icon${idx}`).classList.remove('icon-display-inline');

    const getItemId = (item) => itemType !== 'RecentlyPlayed' ? item.id : item.album.id;
    const getImageUrl = item => itemType !== 'RecentlyPlayed' ? item?.images[0]?.url : item.album.images[0]?.url;

    const renderToItemDetails = async (itemId) => {
        if (itemType && itemType === 'Artist') {
            dispatch({ type: 'SET_CURRENT_SCREEN', currentScreen: 'ArtistDetails' });
            const resp = await spotify.getArtist(itemId);
            dispatch({ type: 'SET_ARTIST_DETAILS', artistDetails: resp });
            const topTracks = await spotify.getArtistTopTracks(itemId, 'US');
            dispatch({ type: 'SET_ARTIST_TOP_TRACKS', topTracks: topTracks.tracks.slice(0, 5) });
            const albums = await spotify.getArtistAlbums(itemId);
            dispatch({ type: 'SET_ARTIST_ALBUMS', artistAlbums: albums.items.length > 6 ? albums.items.slice(0, 6) : albums.items });
        } else if (itemType && (itemType === 'Album' || itemType === 'RecentlyPlayed')) {
            dispatch({ type: 'SET_CURRENT_SCREEN', currentScreen: 'AlbumDetails' });
            const resp = await spotify.getAlbum(itemId);
            dispatch({ type: 'SET_ALBUM_DETAILS', albumDetails: resp });
        } else if (itemType && itemType === 'Playlist') {
            dispatch({ type: 'SET_CURRENT_SCREEN', currentScreen: 'Player' });
            const result = await spotify.getPlaylist(itemId);
            dispatch({ type: 'SET_CURRENT_PLAYLIST', playlist: result });
        }
    }

    const handleOnPlayCircleClick = async (item) => {
        dispatch({ type: 'SET_CURRENT_SCREEN', currentScreen: 'Search' });
        if (item.type === 'artist') {
            const topTracks = await spotify.getArtistTopTracks(item.id, 'US');
            const uris = topTracks.tracks.slice(0, 5).map(track => track.uri);
            return spotify.play({ 'uris': uris, device_id: deviceId, offset: { "uri": uris[0] } });
        }

        if(item.type === 'album' || item.type === 'playlist') {
            return await spotify.play({device_id: deviceId, context_uri: item.uri, offset: {position:0}});
        }
    }

    return (
        <div className="search__results">
            <h4>{title}</h4>
            <div className="search__resultsLists">
                {itemsList.items.slice(0, 6).map((item, idx) => (
                    <div className="search__resultCard"
                        onClick={() => renderToItemDetails(getItemId(item))}
                        onMouseOver={() => cardMouseOverHandler(idx)}
                        onMouseLeave={() => cardMouseLeaverHandler(idx)}
                    >

                        <img src={getImageUrl(item)} alt={item && item.name ? item.name : ''} />
                        <h1>{item?.name?.length >= 20 ? item.name.slice(0, 20) + '...' : item.name}</h1>
                        <p>{toLowerCase(item?.type)}</p>
                        <PlayCircleFilledIcon
                            onClick={() => handleOnPlayCircleClick(item)}
                            id={`${title}-icon${idx}`}
                            className="search__cardPlayIcon"
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}
