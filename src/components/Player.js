import React, { useEffect, useState } from 'react';
import { useDataLayerValue } from './DataLayer';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { SongRow } from './SongRow';

export const Player = ({ spotify }) => {

    const [{ currentPlayList, deviceId, user }, dispatch] = useDataLayerValue();
    const [isFollowingPlaylist, setIsFollowingPlaylist] = useState(false);

    const isUserFollowingPlaylist = () => {
        if (currentPlayList) {
            spotify.areFollowingPlaylist(currentPlayList.id, [user.id]).then(resp => {
                console.log(resp);
                setIsFollowingPlaylist(...resp);
            });
        }
    }

    const handleFollowingIconClick = async () => {
        if (isFollowingPlaylist) {
            await spotify.unfollowPlaylist(currentPlayList.id);
        } else {
            await spotify.followPlaylist(currentPlayList.id);
        }
        await isUserFollowingPlaylist();
        const playLists = await spotify.getUserPlaylists();
        dispatch({ type: 'SET_USER_PLAYLISTS', playLists: playLists })
    }

    const onPlayCircleClick = async () => {
        await spotify.play({
            context_uri: currentPlayList.uri,
            device_id: deviceId,
            offset: { 'position': Math.round(Math.random() * currentPlayList.tracks.items.length - 1) }
        })
    }

    useEffect(() => isUserFollowingPlaylist(), [currentPlayList]);

    return (
        <div className="player">
            <div className="player__info">
                <img src={currentPlayList?.images[0].url} alt="" />
                <div className="player__infoText">
                    <strong>PLAYLIST</strong>
                    <h2>{currentPlayList?.name}</h2>
                    <p>{currentPlayList?.description}</p>
                </div>
            </div>

            <div className="player__songs">
                <div className="player__icons">
                    <PlayCircleFilledIcon onClick={onPlayCircleClick} className="player__shuffle" />
                    {isFollowingPlaylist
                        ? <FavoriteIcon
                            onClick={handleFollowingIconClick}
                            fontSize="large"
                            className="player__followingIcon"
                        />
                        : <FavoriteBorderIcon
                            onClick={handleFollowingIconClick}
                            fontSize="large"
                            className="player__noFollowingIcon"
                        />
                    }
                    <MoreHorizIcon />
                </div>
                {currentPlayList?.tracks.items.map(item => (
                    <SongRow key={item.track.id} track={item.track} spotify={spotify} />
                ))}
            </div>

        </div>
    )
}
