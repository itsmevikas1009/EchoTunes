import Logo from "../assets/EchoTunes-logo-premium.png";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/reducers/auth";
import { useState } from "react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { CgProfile } from "react-icons/cg";
import { IoLogOutOutline } from "react-icons/io5";
import { FaMusic } from "react-icons/fa";
import { HiOutlineSparkles } from "react-icons/hi2";
import api from "../services/api";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await api.get("/logout");

      if (res.success) {
        localStorage.removeItem("user");
        dispatch(logout());
        toast.success("Successfully logged out!");
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Failed to logout.");
    }
  };

  return (
    <header className="relative z-[200] mx-auto w-full max-w-[1500px]">
      <div className="glass-panel spotlight-ring relative flex items-center justify-between rounded-[28px] px-4 py-3 md:px-6 md:py-4">
        <Link to="/" className="flex min-w-0 items-center gap-3">
          <div className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl bg-[#120e17] ring-1 ring-white/10 shadow-2xl shadow-orange-500/10 transition-all md:h-14 md:w-14 md:rounded-2xl">
            <img src={Logo} alt="EchoTunes" className="h-full w-full object-cover scale-110" />
          </div>
          <div className="min-w-0">
            <p className="eyebrow hidden md:inline-flex">Sound Reimagined</p>
            <h1 className="hero-title truncate text-xl font-bold md:text-2xl">
              EchoTunes
            </h1>
          </div>
        </Link>

        <div className="flex items-center gap-2 md:gap-3">
          {user ? (
            <>
              {user?.isAdmin && (
                <Link
                  to="/create-song"
                  className="muted-button hidden rounded-full px-4 py-2 text-sm font-semibold text-white/90 transition duration-200 hover:bg-white/10 md:inline-flex"
                >
                  Add Song
                </Link>
              )}

              <button
                onClick={() => setShowUserMenu((prev) => !prev)}
                className="glass-card flex items-center gap-3 rounded-full px-2 py-2 pr-4 transition duration-200 hover:bg-white/10"
              >
                <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-full bg-white/10">
                  {user?.profilePicture ? (
                    <img
                      src={user.profilePicture}
                      alt={user?.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <CgProfile size={24} />
                  )}
                </div>
                <div className="hidden text-left md:block">
                  <p className="max-w-[10rem] truncate text-sm font-semibold text-white">
                    {user?.name}
                  </p>
                  <p className="text-xs uppercase tracking-[0.24em] text-white/50">
                    {user?.isAdmin ? "Admin" : user?.isArtist ? "Artist" : "Listener"}
                  </p>
                </div>
              </button>

              {showUserMenu && (
                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="glass-panel absolute right-4 top-[calc(100%+0.8rem)] z-50 w-[17rem] rounded-[24px] p-3"
                >
                  <Link
                    to={`/profile/${user?._id}`}
                    onClick={() => setShowUserMenu(false)}
                    className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm text-white/80 transition hover:bg-white/8 hover:text-white"
                  >
                    <CgProfile size={18} />
                    Profile
                  </Link>

                  {user?.isAdmin && (
                    <Link
                      to="/create-song"
                      onClick={() => setShowUserMenu(false)}
                      className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm text-white/80 transition hover:bg-white/8 hover:text-white md:hidden"
                    >
                      <FaMusic size={16} />
                      Add Song
                    </Link>
                  )}

                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm text-white/80 transition hover:bg-white/8 hover:text-white"
                  >
                    <IoLogOutOutline size={18} />
                    Logout
                  </button>
                </motion.div>
              )}
            </>
          ) : (
            <>
              <div className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs uppercase tracking-[0.2em] text-white/60 md:flex">
                <HiOutlineSparkles size={16} className="text-[#ffd166]" />
                Fresh Sessions
              </div>
              <Link
                to="/login"
                className="muted-button rounded-full px-4 py-2 text-sm font-semibold text-white transition duration-200 hover:bg-white/10"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="accent-button rounded-full px-4 py-2 text-sm font-extrabold transition duration-200"
              >
                Join Now
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
