import React, { useEffect } from 'react';
import { Header } from './Header';
import { useDataLayerValue } from './DataLayer';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import FavoriteIcon from '@material-ui/icons/Favorite';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { SongRow } from './SongRow';

export const Player = ({ spotify }) => {

    const [{ currentPlayList }, dispatch] = useDataLayerValue();

    // useEffect(() => {
    //     if (currentPlayList && currentPlayList.id) {
    //         console.log(currentPlayList.id);
    //         spotify.areFollowingPlaylist(currentPlayList.id).then(console.log).catch(console.log)
    //     }
    // }, [currentPlayList]);

    return (
        <div className="player">
            <Header spotify={spotify} />
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
                    <PlayCircleFilledIcon className="player__shuffle" />
                    <FavoriteIcon fontSize="large" />
                    <MoreHorizIcon />
                </div>
                {currentPlayList?.tracks.items.map(item => (
                    <SongRow track={item.track} />
                ))}
            </div>

        </div>
    )
}
