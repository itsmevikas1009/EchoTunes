import { useSelector, useDispatch } from "react-redux";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { setCurrentSong } from "../redux/reducers/audioPlayer.js";
// import "./library.scss"

const AppLayout = ({ children }) => {


  return (
    <>
      <Navbar bg={"black"} text={"white"} />
      <div className="flex h-screen pt-14 bg-black text-white">
        <Sidebar />
        <div className="w-[75%] overflow-hidden ">{children}</div>



      </div>
    </>
  );
};

export default AppLayout;
