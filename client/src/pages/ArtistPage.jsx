import React, { useEffect } from 'react'
import AppLayout from '../components/AppLayout'
import { useSelector } from 'react-redux';
import { useLocation, useParams, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { server } from '../services/api';

const ArtistPage = () => {

    const { isPlaying } = useSelector(
        (state) => state.audioPlayer
    );

    let { name } = useParams();


    const fetchSongs = async () => {

        try {
            const res = await axios.get(`${server}/song/artists/${name}`, { withCredentials: true });
            console.log(res);
        }
        catch (err) {
            console.log(err || "Error in Fetching Data");
        }
    };


    useEffect(() => {
        fetchSongs();
    }, []);

    return (
        <AppLayout>

            <div
                className={`bg-[#1a1a1a] flex-1 overflow-auto px-8 py-6 text-white rounded-lg mx-1 my-3 ${isPlaying ? "h-[85%]" : "h-[97%]"
                    }`}
            >
                <h2 className="text-2xl font-bold ">{name}</h2>

                <div>

                </div>

            </div>

        </AppLayout>
    )
}

export default ArtistPage
