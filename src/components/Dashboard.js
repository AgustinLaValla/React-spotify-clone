import React from 'react'
import { Sidebar } from './Sidebar'
import { Player } from './Player';
import { Footer } from './Footer';
import { useDataLayerValue } from './DataLayer';
import { Search } from './Search';
import { Home } from './Home';
import { Artist }  from './Artist';
import { Album } from './Album';

export const Dashboard = ({ spotify }) => {
    const [{currentScreen}, dispatch] = useDataLayerValue();
    return (
        <div className="dashboard">
            <div className="dashboard__body">
                <Sidebar spotify={spotify}/>
                {currentScreen && currentScreen === 'Player' && <Player spotify={spotify} />}
                {currentScreen && currentScreen === 'Search' && <Search spotify={spotify} />}
                {currentScreen && currentScreen === 'Home' && <Home spotify={spotify} />}
                {currentScreen && currentScreen === 'ArtistDetails' && <Artist spotify={spotify} />}
                {currentScreen && currentScreen === 'AlbumDetails' && <Album spotify={spotify} />}
            </div>
            <Footer/>
        </div>
    )
}
