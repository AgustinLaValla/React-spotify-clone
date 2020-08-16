import React, { useEffect, useState } from 'react';
import { useDataLayerValue } from './DataLayer';


export const SongRow = ({ track, albumImage, albumName, spotify }) => {

    const [{ deviceId, currentScreen, currentPlayList, albumDetails, artistTopTracks, currentTrackId }, dispatch] = useDataLayerValue();

    const [rowClass, setRowClass] = useState('songRowIsNotBeingPlayed');

    const getPlayEndoPoint = (context_uri) => {

        if (currentScreen === 'Player') {
            return spotify.play({
                context_uri,
                device_id: deviceId,
                offset: { 'uri': track.uri }
            });
        }

        if (currentScreen === 'AlbumDetails') {

            return spotify.play({
                context_uri,
                device_id: deviceId,
                offset: { 'position': track.track_number - 1 }
            });
        }

        if (currentScreen === 'ArtistDetails') {
            const tracksArray = artistTopTracks.map(track => track.uri);

            return spotify.play({
                uris: tracksArray,
                device_id: deviceId,
                offset: { "uri": track.uri }
            })
        }

    }

    const playTrack = () => {
        switch (currentScreen) {
            case 'Player':
                getPlayEndoPoint(currentPlayList.uri);
                break;
            case 'AlbumDetails':
                getPlayEndoPoint(albumDetails.uri)
                break;
            case 'ArtistDetails':
                getPlayEndoPoint();
                break;
            default: return;
        }

    }

    useEffect(() => {
        if(currentTrackId === track.id) {
            setRowClass('songRowIsBeingPlayed');
        } else {
            setRowClass('songRowIsNotBeingPlayed');
        }
    },[currentTrackId])

    const getBackgroundStyle = () => currentTrackId === track.id ? {backgroundColor: 'black !important'} : { backgroundColor: 'transparent !important' };

    return (
        <div className={rowClass} onClick={playTrack}>
            <img
                src={albumImage ? albumImage : track?.album.images[0].url}
                alt=""
                className="songRow__album"
            />
            <div className="songRow__info">
                <h1>{track?.name}</h1>
                <p>{track?.artists.map(artist => artist.name).join(', ')} - {albumName ? albumName : track?.album.name}</p>
            </div>
        </div>
    )
}
