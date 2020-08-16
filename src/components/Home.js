import React from 'react'
import { Header } from './Header'
import { useDataLayerValue } from './DataLayer'
import { ItemsList } from './ItemsList';

export const Home = ({ spotify }) => {
    const [{ recentlyPlayerTracks, featuredPlaylists, newRealises, recommendations }, dispatch] = useDataLayerValue();
    return (
        <div className="home">
            <div className="home__itemsContainer">
                {recentlyPlayerTracks &&
                    <ItemsList
                        itemsList={recentlyPlayerTracks}
                        title="Recently played"
                        spotify={spotify}
                        itemType="RecentlyPlayed"
                    />}
                {featuredPlaylists &&
                    <ItemsList itemsList={featuredPlaylists} title="Featured Playlists" spotify={spotify} itemType="Playlist" />
                }
                {newRealises &&
                    <ItemsList itemsList={newRealises} title="Nuevos lanzamientos" spotify={spotify} itemType="Album" />
                }
            
            </div>
        </div>
    )
}
