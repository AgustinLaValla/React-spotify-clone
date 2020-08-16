import React from 'react'
import { useDataLayerValue } from './DataLayer';
import * as moment from 'moment/moment';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import FavoriteIcon from '@material-ui/icons/Favorite';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { SongRow } from './SongRow';

export const Album = ({ spotify }) => {

    const [{ albumDetails, deviceId }, dispatch] = useDataLayerValue();

    const capitalize = (word) => word[0].toUpperCase() + word.slice(1);

    const getAlbumDuration = () => {
        const durationInMiliseconds = albumDetails.tracks.items.reduce((acumulator, track) => acumulator + track.duration_ms, 0);
        const durationFomatted = moment.utc(moment.duration(durationInMiliseconds / 1000, 'seconds').asMilliseconds()).format("HH:mm:ss");
        return durationFomatted.split(':').map((unit, index) => {
            if (index === 0) {
                return unit > 0 ? `${unit} h` : null;
            } else if (index === 1) {
                return `${unit} min`;
            } else {
                return `${unit} s`;
            }
        }).join(' ');
    }

    const onPlayCircleClick = async () => {
        await spotify.play({
            context_uri: albumDetails.uri,
            device_id: deviceId,
            offset: { 'position': Math.round(Math.random() * albumDetails.tracks.items.length - 1) }
        })
    }

    return (
        <div className="album">
            {albumDetails &&
                <div className="album__info">
                    <img src={albumDetails.images[0].url} alt={albumDetails.name} />
                    <div className="album__infoText">
                        <strong>{capitalize(albumDetails.type)}</strong>
                        <h2>{albumDetails.name}</h2>

                        <strong>{albumDetails.artists.map(artist => artist.name).join(' ')} </strong>
                        <span>{albumDetails.release_date.slice(0, 4)} </span>
                        <span>{getAlbumDuration()}</span>

                    </div>
                </div>
            }
            {albumDetails &&
                <div className="player__songs">
                    <div className="player__icons">
                        <PlayCircleFilledIcon onClick={onPlayCircleClick} className="player__shuffle" />
                        <FavoriteIcon fontSize="large" />
                        <MoreHorizIcon />
                    </div>
                    {albumDetails?.tracks.items.map(item => (
                        <SongRow
                            key={item.id}
                            track={item}
                            albumImage={albumDetails.images[0].url}
                            albumName={albumDetails.name}
                            spotify={spotify}
                        />
                    ))}
                </div>

            }
        </div>
    )
}
