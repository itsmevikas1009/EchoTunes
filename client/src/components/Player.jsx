import { FaRegHeart } from "react-icons/fa";
import {
  FaLaptop,
  FaRepeat,
  FaBackwardStep,
  FaCirclePlay,
  FaForwardStep,
  FaShuffle,
} from "react-icons/fa6";
import { BsFilePlay } from "react-icons/bs";
import { GiMicrophone } from "react-icons/gi";
import { HiOutlineQueueList } from "react-icons/hi2";
import { LuVolume2 } from "react-icons/lu";
import { RiPictureInPictureFill } from "react-icons/ri";
const Player = () => {
  return (
    <div className="flex justify-between items-center bg-black fixed bottom-0 w-full h-20">
      <div className="flex justify-start items-center w-[25%] ps-4">
        <img
          className="w-14 h-14 rounded-md"
          src="https://i.scdn.co/image/ab67616d00001e021aa5adad8593923dcdf1a7d0"
          alt=""
        />
        <div className="mx-4">
          <div className="text-sm my-1">Daylight</div>
          <div className="text-xs my-1">David Kumar</div>
        </div>
        <FaRegHeart size={20} className="ms-3" />
        <FaLaptop size={20} className="ms-3" />
      </div>
      <div className="w-[50%]">
        <div className="flex justify-center items-center">
          <FaShuffle size={20} className=" mx-3 opacity-70" />
          <FaBackwardStep size={20} className=" mx-3 opacity-70" />
          <FaCirclePlay size={36} className=" mx-3" />
          <FaForwardStep size={20} className=" mx-3 opacity-70" />
          <FaRepeat size={20} className="mx-3 opacity-70" />
        </div>
        <div className="flex justify-center items-center my-1">
          <span className="curr-timer text-sm opacity-60">00:00</span>
          <input type="range" min="0" max="100" className="progress-bar" />
          <span className="tot-time text-sm opacity-60">03:45</span>
        </div>
      </div>
      <div className="controls flex justify-center items-center w-[25%]">
        <BsFilePlay size={20} className="mx-2 opacity-70" />
        <GiMicrophone size={20} className="mx-2 opacity-70" />
        <HiOutlineQueueList size={20} className="mx-2 opacity-70" />
        <LuVolume2 size={20} className="mx-2 opacity-70" />
        <input type="range" min="0" max="100" className="volume-bar" />
        <RiPictureInPictureFill size={20} className="mx-2 opacity-70" />
      </div>
    </div>
  );
};

export default Player;
