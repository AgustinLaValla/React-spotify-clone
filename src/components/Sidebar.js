import React from 'react'
import { SidebarOption } from './SidebarOption'
import HomeSharpIcon from '@material-ui/icons/HomeSharp';
import SearchSharpIcon from '@material-ui/icons/SearchSharp';
import LibraryMusicSharpIcon from '@material-ui/icons/LibraryMusicSharp';
import { useDataLayerValue } from './DataLayer';

export const Sidebar = ({ spotify }) => {

    const [{ playLists }, dispatch] = useDataLayerValue();


    return (
        <div className="sidebar">
            <img className="sidebar__logo" src="https://getheavy.com/wp-content/uploads/2019/12/spotify2019-830x350.jpg" alt="spotify" />
            <SidebarOption title="Home" Icon={HomeSharpIcon} pageName={'Home'} spotify={spotify} />
            <SidebarOption title="Search" Icon={SearchSharpIcon} pageName={'Search'} spotify={spotify} />
            <SidebarOption title="Your library" Icon={LibraryMusicSharpIcon} pageName={'Player'} spotify={spotify} />
            <br />
            <strong className="sidebar__title">PLAYLIST</strong>
            <hr />
            <SidebarOption
                title="Descubrimiento semanal"
                playlistId="37i9dQZEVXcGCEYfa5aelK"
                spotify={spotify}
            />
            {playLists?.items?.map(playlist =>
                <SidebarOption
                    title={playlist.name}
                    playlistId={playlist.id}
                    spotify={spotify}
                />
            )}

        </div>
    )
}
