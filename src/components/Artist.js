import React, { useEffect, useState } from 'react'
import { useDataLayerValue } from './DataLayer'
import { Button, makeStyles } from '@material-ui/core';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import { SongRow } from './SongRow';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';

const useStyles = makeStyles(theme => ({
    button: {
        border: '1px solid white',
        color: 'white',
        margin: '0px 20px',
        height: '45px',
        paddingRight: '25px',
        paddingLeft: '25px',
        cursor: 'pointer'
    }
}))

export const Artist = ({ spotify }) => {

    const classes = useStyles();

    const [isFollowingArtist, setIsFollowingArtist] = useState(false);

    const [{ artistDetails, artistTopTracks, artistAlbums, deviceId }, dispatch] = useDataLayerValue();

    const isUserFollowingArtist = () => {
        if (artistDetails) {
            spotify.isFollowingArtists([artistDetails.id]).then(resp => {
                setIsFollowingArtist(...resp);
            })
        }
    }

    const handleFollowButtonClick = async () => {
        if (isFollowingArtist) {
            await spotify.unfollowArtists([artistDetails.id]);
        } else {
            await spotify.followArtists([artistDetails.id]);
        }
        await isUserFollowingArtist();
    }

    const capitalize = (word) => word[0].toUpperCase() + word.slice(1);

    const onMouseOverHandler = (idx) => {
        document.getElementById(`album-playIcon${idx}`).style.opacity = 1;
    }

    const onMouseLeaveHandle = (idx) => {
        document.getElementById(`album-playIcon${idx}`).style.opacity = 0;
    }

    const goToAlbumDetails = async (albumId) => {
        dispatch({ type: 'SET_CURRENT_SCREEN', currentScreen: 'AlbumDetails' });
        const resp = await spotify.getAlbum(albumId);
        dispatch({ type: 'SET_ALBUM_DETAILS', albumDetails: resp });
    }

    const onPlayCircleClick = async () => {
        const uris = artistTopTracks.map(track => track.uri);
        await spotify.play({ uris: uris, device_id: deviceId, offset: { 'uri': uris[0] } })
    }

    useEffect(() => isUserFollowingArtist(), [artistDetails])

    return (
        <div className="artist">
            {artistDetails &&
                <div className="artist__info">
                    <img src={artistDetails.images[0].url} alt={artistDetails.name} />
                    <div className="artist__infoText">
                        <strong>{capitalize(artistDetails.type)}</strong>
                        <h2>{artistDetails.name}</h2>
                        <p>Followers: {artistDetails.followers.total}</p>
                    </div>
                </div>
            }

            <div className="artist__follow">
                <PlayCircleFilledIcon onClick={onPlayCircleClick} className="artist__playIcon" />
                <Button
                    onClick={handleFollowButtonClick}
                    variant="outlined"
                    className="artist__followBtn"
                    className={classes.button}
                >
                    {isFollowingArtist ? 'Following' : 'Follow'}
                </Button>
            </div>

            {artistTopTracks &&
                <div className="artist__songs">
                    <h2>Popular</h2>
                    {artistTopTracks.map(track => (
                        <SongRow key={track.id} track={track} spotify={spotify} />
                    ))}
                </div>
            }

            {artistAlbums &&
                <div className="artist__albumsContainer">
                    <h2>Albums</h2>
                    <div className="artist__albumList">
                        {artistAlbums.map((album, idx) => (
                            <div className="artist__album"
                                onMouseOver={() => onMouseOverHandler(idx)}
                                onMouseLeave={() => onMouseLeaveHandle(idx)}
                                onClick={() => goToAlbumDetails(album.id)}
                            >
                                <PlayCircleOutlineIcon id={`album-playIcon${idx}`} className="artist__albumPlayIcon" />
                                <img src={album?.images[0].url} alt={album.name} className="artist__albumsPicture" />
                            </div>
                        ))}
                    </div>
                </div>
            }

        </div>
    )
}
