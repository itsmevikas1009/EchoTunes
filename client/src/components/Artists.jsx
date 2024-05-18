import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IoMdPlayCircle } from "react-icons/io";
import axios from "axios";
import { server } from "../services/api";

// const artists = [
//   {
//     id: 1,
//     name: "Darshan Raval",
//     image: "/src/assets/darshan.jpeg"
//   },
//   {
//     id: 2,
//     name: "B Praak",
//     image: "/src/assets/bpraak.jpg"
//   },
//   {
//     id: 3,
//     name: "Arijit Singh",
//     image: "/src/assets/arigit.jpg"
//   },
//   {
//     id: 4,
//     name: "Sonu Nigam",
//     image: "/src/assets/sonu.jpg"
//   },
//   {
//     id: 5,
//     name: "Shreya Ghoshal",
//     image: "/src/assets/shreya.jpg"
//   },
// ];

const Artists = () => {
  const [artistData, setArtistData] = useState([]);

  const fetchArtist = async () => {
    try {
      const res = await axios.get(`${server}/artist/get`, {
        withCredentials: true,
      });
      setArtistData(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchArtist();
  }, []);

  return (
    <div className="mb-10">
      <h2 className="text-2xl font-bold mt-4 mb-4">Artists</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 space-x-4 space-y-6">
        {artistData?.map((i) => (
          <Link
            to={`/artists/${i.name}`}
            key={i._id}
            className="rounded-lg p-3 ms-4 mt-4 cursor-pointer hover:bg-[#232323]"
            id="artistLink"
          >
            <div className="relative">
              <img
                src={i.profileImage}
                alt={`Image of ${i.name}`}
                className="rounded-full object-contain"
              />
              <IoMdPlayCircle
                size={45}
                color="#1bd760"
                className="absolute sm:right-0 sm:bottom-0 -right-0.5 -bottom-0.5 bg-[#232323] rounded-full playBtn"
              />
            </div>
            <p className="text-lg font-semibold opacity-90 py-2">{i.name}</p>
            <p className="text-sm italic opacity-90">Artist</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Artists;
