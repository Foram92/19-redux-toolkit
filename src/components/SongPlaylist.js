import { createRandomSong } from "../data";
import { useDispatch, useSelector } from 'react-redux';
import { addSong, removeSong } from '../store'

function SongPlaylist () {
    //get dispatch function from redux store by using useDispatch
    const dispatch = useDispatch();

    // Get list of songs
//useSelector will help you to go to redux store and bring state from slice
    const songPlaylist = useSelector((state) => {
        //console.log(state);
        //we only need songs from state object, here state is whole state object 
        return state.songs;
    });

    // Add song to list of songs
    const handleSongAdd = (song) => {
        //const action = addSong(song);
        //console.log(action);
//this is dispatch the action, addSong will give type and action  
        dispatch(addSong(song));
    };
    // Remove song from list of songs
    const handleSongRemove = (song) => {
        //call removeSong fun and send the song which we want to remove
        dispatch(removeSong(song));
    };

    const renderedSongs = songPlaylist.map((song) => {
        return (
            <li key={song}>
                {song}
                <button
                onClick={() => handleSongRemove(song)}
                className="button is-danger"
                >
                    X
                </button>
            </li>
        );
    });

    return (
        <div className="content">
            <div className="table-header">
                <h3 className="subtitle is-3">Song Playlist</h3>
                <div className="buttons">
                    <button
                    onClick={() => handleSongAdd(createRandomSong())}
                    className="button is-link"
                    >
                        + Add Song to Playlist
                    </button>
                </div>
            </div>
            <ul>{renderedSongs}</ul>
        </div>
    );
}

export default SongPlaylist;