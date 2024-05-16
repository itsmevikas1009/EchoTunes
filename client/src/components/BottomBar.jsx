import React from "react";
import { MdHomeFilled } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { useSelector } from "react-redux";
import { FaSpotify } from "react-icons/fa";
import { FaMusic } from "react-icons/fa";

const BottomBar = () => {
  const path = useLocation().pathname;
  const { user } = useSelector((state) => state.auth);

<<<<<<< HEAD
  return (
    <div className=" block md:hidden bg-black h-16 fixed bottom-0 w-full py-2">
      <div className="flex justify-between px-4 items-center">
        <div>
          <Link
            to="/"
            className={`flex flex-col items-center py-1 px-3 text-xs ${
              path === "/" ? "opacity-100 font-semibold " : "opacity-80"
            }`}
          >
            <MdHomeFilled size={25} />
            Home
          </Link>
=======
    return (
        <div className=' block md:hidden bg-black h-16 fixed bottom-0 w-full py-2'>
            <div className='flex justify-between px-4 items-center'>
                <div>
                    <Link
                        to="/"
                        className={`flex flex-col items-center py-1 px-3 text-xs ${path === "/" ? "opacity-100 font-semibold " : "opacity-80"
                            }`}
                    >
                        <MdHomeFilled size={25} />
                        Home
                    </Link>
                </div>
                <div>
                    <Link
                        to="/search"
                        className={`flex flex-col items-center py-1 px-3 text-xs ${path === "/" ? "opacity-100 font-semibold " : "opacity-80"
                            }`}
                    >
                        <IoSearch size={25} />
                        Search
                    </Link>
                </div>
                <div>
                    <Link
                        to={`/profile/${user?._id}`}
                        className={`flex flex-col items-center py-1 px-3 text-xs ${path === "/" ? "opacity-100 font-semibold " : "opacity-80"
                            }`}
                    >
                        <CgProfile size={25} />
                        Profile
                    </Link>
                </div>
                {user?.isAdmin === false && <div>
                    <Link
                        to="/"
                        className={`flex flex-col items-center py-1 px-3 text-xs ${path === "/" ? "opacity-100 font-semibold " : "opacity-80"
                            }`}
                    >
                        <FaSpotify size={24} />
                        Get App
                    </Link>
                </div>}
                {user?.isAdmin === true && <div>
                    <Link
                        to="/"
                        className={`flex flex-col items-center py-1 px-3 text-xs ${path === "/" ? "opacity-100 font-semibold " : "opacity-80"
                            }`}
                    >
                        <FaMusic size={24} />
                        All Songs
                    </Link>
                </div>}

            </div>
>>>>>>> 2e5066935745b96f8b4298a25e7840562c009fd1
        </div>
        <div>
          <Link
            to="/search"
            className={`flex flex-col items-center py-1 px-3 text-xs ${
              path === "/" ? "opacity-100 font-semibold " : "opacity-80"
            }`}
          >
            <IoSearch size={25} />
            Search
          </Link>
        </div>
        <div>
          <Link
            to={`/profile/${user?._id}`}
            className={`flex flex-col items-center py-1 px-3 text-xs ${
              path === "/" ? "opacity-100 font-semibold " : "opacity-80"
            }`}
          >
            <CgProfile size={25} />
            Profile
          </Link>
        </div>
        {user?.isAdmin === false && (
          <div>
            <Link
              to="/"
              className={`flex flex-col items-center py-1 px-3 text-xs ${
                path === "/" ? "opacity-100 font-semibold " : "opacity-80"
              }`}
            >
              <FaSpotify size={24} />
              Get App
            </Link>
          </div>
        )}
        {user?.isAdmin === true && (
          <div>
            <Link
              to="/"
              className={`flex flex-col items-center py-1 px-3 text-xs ${
                path === "/" ? "opacity-100 font-semibold " : "opacity-80"
              }`}
            >
              <FaMusic size={24} />
              All Songs
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default BottomBar;
