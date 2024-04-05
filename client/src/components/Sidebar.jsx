import { MdHomeFilled } from "react-icons/md";
import { IoSearch } from "react-icons/io5";
import { VscLibrary } from "react-icons/vsc";
import { FaPlus } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Sidebar = () => {

  return (
    <div className="w-[25%]">
      <div className="bg-[#1a1a1a] rounded-md flex flex-col justify-center gap-3 px-3 py-6 mx-2 my-3">
        <div className="flex items-center opacity-70  hover:opacity-100 py-1 px-3 text-3xl gap-4">
          {/* <i className="fa-solid fa-house"></i> */}
          <MdHomeFilled />
          <Link to="/" className="text-xl">Home</Link>

        </div>
        <div className="flex items-center opacity-70 hover:opacity-100 py-1 px-3 text-3xl gap-4">
          {/* <i className="fa-solid fa-magnifying-glass"></i> */}
          <IoSearch />
          <Link to="/search" className="text-xl">Search</Link>
        </div>
      </div>
      <div className="bg-[#1a1a1a] rounded-lg px-4 py-3 mx-2 my-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center opacity-70 py-1 px-3 text-3xl gap-4">
            {/* <img src="./assets/library_icon.png" alt="lib" /> */}
            <VscLibrary />
            <a className="text-xl" href="#">
              Your Library
            </a>
          </div>
          <div className="text-2xl opacity-70 hover:opacity-100">
            <FaPlus />
          </div>
        </div>
        <div className="">
          <div className="bg-[#232323] rounded-lg h-auto mt-2 mb-4 px-5 py-5">
            <div className="text-lg font-bold mb-3">
              Create your frist playlist
            </div>
            <div className="text-base font-semibold mb-5">
              It&apos;s easy, we&apos;ll help you
            </div>
            <Link className="bg-white rounded-3xl px-4 py-2 font-semibold text-black text-md">
              Create playlist
            </Link>
          </div>
          <div className="box2 bg-[#232323] rounded-lg h-auto mt-2 mb-4 px-5 py-5">
            <div className="text-lg font-bold mb-3">
              Let&apos;s find some podcast to follow
            </div>
            <div className="text-base font-semibold mb-5">
              We&apos;ll keep you updated on new episodes
            </div>
            <Link className="bg-white rounded-3xl px-4 py-2 font-semibold text-black text-md">
              Browse podcasts
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
