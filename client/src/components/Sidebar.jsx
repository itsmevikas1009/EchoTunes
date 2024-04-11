import { MdHomeFilled } from "react-icons/md";
import { IoSearch } from "react-icons/io5";
import { VscLibrary } from "react-icons/vsc";
import { FaPlus } from "react-icons/fa6";
import { Link, useLocation } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { useSelector } from "react-redux";
import { FaMusic } from "react-icons/fa";

const Sidebar = () => {
  const { user } = useSelector((state) => state.auth);
  const { isPlaying } = useSelector((state) => state.audioPlayer);

  const path = useLocation().pathname;

  return (
    <div className="w-[25%]">
      <div className="bg-[#1a1a1a] rounded-lg flex flex-col justify-center gap-4 px-3 py-4 mx-2 my-3">
        <div>
          <Link
            to="/"
            className={`flex items-center opacity-70  hover:opacity-100 py-1 px-3 gap-4 text-xl ${
              path === "/" && "opacity-100 font-bold"
            }`}
          >
            <MdHomeFilled size={30} />
            Home
          </Link>
        </div>
        <div>
          <Link
            to="/search"
            className={`flex items-center opacity-70  hover:opacity-100 py-1 px-3 gap-4 text-xl ${
              path === "/search" && "opacity-100 font-bold"
            }`}
          >
            <IoSearch size={30} />
            Search
          </Link>
        </div>
        {user && (
          <div>
            <Link
              to={`/profile/${user?._id}`}
              className={`flex items-center opacity-70  hover:opacity-100 py-1 px-3 gap-4 text-xl ${
                path === `/profile/${user?._id}` && "opacity-100 font-bold"
              }`}
            >
              <CgProfile size={30} />
              Profile
            </Link>
          </div>
        )}

        {user?.isAdmin && (
          <div>
            <Link
              to={`/allsongs`}
              className={`flex items-center opacity-70  hover:opacity-100 py-1 px-3 gap-4 text-xl ${
                path === `/allsongs/${user?._id}` && "opacity-100 font-bold"
              }`}
            >
              <FaMusic size={24} />
              All Songs
            </Link>
          </div>
        )}
      </div>
      <div
        className={`bg-[#1a1a1a] rounded-lg px-4 py-3 mx-2 my-3  ${
          isPlaying
            ? user?.isAdmin
              ? "h-[49%] overflow-auto"
              : "h-[57%] overflow-auto"
            : !user && "h-[75%]"
        }`}
      >
        <div className="flex justify-between items-center ">
          <div className=" flex items-center opacity-70 py-1 px-3 text-3xl gap-4">
            <VscLibrary />
            <a className="text-xl" href="#">
              Your Library
            </a>
          </div>
          <div className="text-2xl opacity-70 hover:opacity-100">
            <FaPlus />
          </div>
        </div>
        <div className="overflow-auto">
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
