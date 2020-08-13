import React from 'react';


export const SongRow = ({ track, albumImage, albumName }) => {
    return (
        <div className="songRow">
            <img src={albumImage ? albumImage : track?.album.images[0].url} alt="" className="songRow__album"/>
            <div className="songRow__info">
                <h1>{track?.name}</h1>
                <p>{track?.artists.map(artist => artist.name).join(', ')} - {albumName ? albumName : track?.album.name}</p>
            </div>
        </div>
    )
}
