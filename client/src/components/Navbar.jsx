import Logo from "../assets/EchoTunes-logo.png";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/reducers/auth";
import { useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { useState } from "react";
import axios from "axios";
import { server } from "../services/api";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { FaCaretDown } from "react-icons/fa";
import { FaCaretUp } from "react-icons/fa";
import { IoLogOutOutline } from "react-icons/io5";
import { FaMusic } from "react-icons/fa";

const Navbar = ({ bg, text = "black" }) => {
  const { user } = useSelector((state) => state.auth);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await axios.get(`${server}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        localStorage.removeItem("user");
        // dispatch(setAllSongs([]));
        // dispatch(setIsPlaying(false));
        dispatch(logout());
        toast.success("Successfully logged out!");
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };

  return (
    <div className={`absolute w-full  py-2 bg-${bg} text-${text}`}>
      <div className="w-11/12 mx-auto flex items-center justify-between">
        <div className="flex gap-2 items-center">
          <Link to="/" className="flex items-center gap-2">
            {/* <img
              src={Logo}
              alt=""
              className="h-[3rem] w-[3rem] bg-white rounded-full "
            /> */}
            <h1 className="text-2xl font-bold">EchoTunes</h1>
          </Link>
        </div>

        <div className="flex  items-center gap-6 text-lg font-semibold">
          {user ? (
            <div className="flex items-center gap-6">
              {user?.isAdmin && (
                <div className="hidden md:block">
                  <Link
                    to="/create-song"
                    className={`flex items-center hover:bg-[#232323] py-1 px-3 gap-4 text-lg font-bold border rounded-3xl hover:scale-105 transition-all duration-200`}
                  >
                    Add Song
                  </Link>
                </div>
              )}
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-2"
              >
                {user?.profilePicture ? (
                  <>
                    <img
                      src={user?.profilePicture}
                      alt={user?.name}
                      className="rounded-full h-10 w-10 object-contain"
                    />
                    {showUserMenu ? (
                      <FaCaretUp size={24} />
                    ) : (
                      <FaCaretDown size={24} />
                    )}
                  </>
                ) : (
                  <CgProfile size={30} />
                )}
              </button>

              {showUserMenu && (
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 50 }}
                  className="absolute z-50 right-0 w-275 p-4"
                >
                  <div className="absolute top-[3rem] bg-black p-6 px-8 right-[1.5rem] rounded-lg  transition-all duration-500 z-50 flex justify-center flex-col ">
                    <Link
                      to={`/profile/${user?._id}`}
                      className="mb-4 hover:opacity-85 flex items-center gap-4"
                    >
                      <CgProfile />
                      Profile
                    </Link>

                    {user?.isAdmin && (
                      <div className="block md:hidden">
                        <Link
                          to="/create-song"
                          className="mb-4 hover:opacity-85 flex items-center gap-4"
                        >
                          <FaMusic />
                          Add_Song
                        </Link>
                      </div>
                    )}

                    <button
                      onClick={handleLogout}
                      className="hover:opacity-85 flex items-center gap-4"
                    >
                      <IoLogOutOutline />
                      Logout
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          ) : (
            <div className="gap-1 md:gap-6 flex items-center">
              <Link
                to="/signup"
                className="border border-white p-1 md:p-2 bg-black text-white px-2  md:px-6 rounded-3xl hover:scale-105 transition-all duration-200"
              >
                SignUp
              </Link>
              <Link
                to="/login"
                className="border border-black p-1 md:p-2 bg-white text-black px-2 md:px-6 rounded-3xl hover:scale-105 transition-all duration-200"
              >
                Login
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
