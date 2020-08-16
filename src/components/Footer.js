import React, { useState } from 'react';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import ShuffleIcon from '@material-ui/icons/Shuffle';
import RepeatIcon from '@material-ui/icons/Repeat';
import PlaylistPlayIcon from '@material-ui/icons/PlaylistPlay';
import VolumeDownIcon from '@material-ui/icons/VolumeDown';
import { Grid, Slider } from '@material-ui/core';
import { useDataLayerValue } from './DataLayer';
import { useEffect } from 'react';
import PauseIcon from '@material-ui/icons/Pause';


export const Footer = () => {

    const [{ token, player }, dispatch] = useDataLayerValue();
    const [currentTrack, setCurrentTrack] = useState();
    let initPlayerInterval;

    const checKForPlayer = () => {
        if (window.Spotify) {
            setPlayerInterval('stop_interval');
            dispatch({
                type: 'SET_PLAYER_HANDLER', player: new window.Spotify.Player({
                    name: 'Spotify React Clone',
                    getOAuthToken: (cb) => cb(token),
                    volume: 1
                })
            }
            );
        }
    }

    const setPlayerInterval = (action) => {

        if (action === 'init') {
            initPlayerInterval = setInterval(() => checKForPlayer());
        } else {
            clearInterval(initPlayerInterval);
        }
    }

    const transferPlaybackHere = (device_id) => {
        fetch("https://api.spotify.com/v1/me/player", {
            method: "PUT",
            headers: {
                authorization: `Bearer ${token}`,
                "Content-Type": 'application/json'
            },
            body: JSON.stringify({ "device_ids": [device_id], "play": true })
        }).catch(console.log);
    }

    const togglePlay = async () => await player.togglePlay();

    const nextTrack = async () => await player.nextTrack();

    const previousTrack = async () => await player.previousTrack();

    const setImage = currentTrack &&
        currentTrack.track_window &&
        currentTrack.track_window.current_track &&
        currentTrack.track_window.current_track.album.images
        ? currentTrack.track_window.current_track.album.images[0].url
        : null;

    const setTrackName = () => {
        if (currentTrack) {
            const { track_window: { current_track: { name } } } = currentTrack;
            return name && name.length > 15 ? name.slice(0, 15) + '...' : name;
        }
    }

    useEffect(() => {
        if (token) {
            setPlayerInterval('init');
        }
    }, [token])

    useEffect(() => {
        if (player) {
            player.addListener('ready', ({ device_id }) => {
                transferPlaybackHere(device_id);
                dispatch({ type: 'SET_DEVICE_ID', deviceId: device_id })
            })
            player.connect().then();
            setInterval(async () => {
                const state = await player.getCurrentState();
                setCurrentTrack(state);
                if (state && state.track_window && state.track_window.current_track) {
                    const { track_window: { current_track: { id } } } = state;
                    dispatch({ type: 'SET_CURRENT_TRACK_ID', currentTrackId: id });
                }
            }, 1000)
        }
    }, [player])

    return (
        <div className="footer">
            <div className="footer__left">
                <img src={setImage} className="footer__albumLogo" alt="" />
                <div className="footer__songInfo">
                    <h4>{currentTrack?.track_window?.current_track?.artists.map(artist => artist.name).join(' ')}</h4>
                    <p>{setTrackName()}</p>
                </div>
            </div>
            <div className="footer__center">
                <ShuffleIcon className="footer__green" />
                <SkipPreviousIcon onClick={previousTrack} className="footer__icon" />
                {currentTrack?.paused
                    ? <PlayCircleOutlineIcon onClick={togglePlay} className="footer__icon" fontSize="large" />
                    : <PauseIcon onClick={togglePlay} className="footer__icon" fontSize="large" />
                }
                <SkipNextIcon onClick={nextTrack} className="footer__icon" />
                <RepeatIcon className="footer__green" />
            </div>
            <div className="footer__right">
                <Grid container spacing={2}>
                    <Grid item>
                        <PlaylistPlayIcon />
                    </Grid>
                    <Grid item>
                        <VolumeDownIcon />
                    </Grid>
                    <Grid item>
                        <Slider aria-labelledby="continuous-slider" />
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}
