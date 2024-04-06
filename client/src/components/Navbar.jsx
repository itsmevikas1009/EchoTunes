import Logo from "../assets/spotify-logo.png";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/reducers/auth";
import { useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { useState } from "react";
import axios from "axios";
import { server } from "../services/api"
import toast from "react-hot-toast";

const Navbar = ({ bg, text = "black" }) => {
  const { user } = useSelector((state) => state.auth);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await axios.get(`${server}/logout`, { withCredentials: true });
      if (res.data.success) {
        localStorage.removeItem("user");
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
          <img
            src={Logo}
            alt=""
            className="h-[3rem] w-[3rem] bg-white rounded-full "
          />
          <h1 className="text-2xl font-bold">Spotify</h1>
        </div>

        <div className="flex  items-center gap-6 text-lg font-semibold">
          {user ? (
            <div className="flex items-center">
              <button onClick={() => setShowUserMenu(!showUserMenu)}>
                {user?.profilePicture ? (
                  <img
                    src={user?.profilePicture}
                    alt={user?.name}
                    className="rounded-full h-10 w-10 object-contain"
                  />
                ) : (
                  <CgProfile size={30} />
                )}
              </button>

              {showUserMenu && (
                <div className="absolute top-[4rem] bg-black p-6 px-8 right-[1.5rem] rounded-lg  transition-all duration-500 z-50">
                  <p className="mb-4 hover:opacity-85">Profile</p>
                  <button onClick={handleLogout} className="hover:opacity-85">
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link
                to="/signup"
                className="border border-white p-2 bg-black text-white  px-6 rounded-3xl hover:scale-105 transition-all duration-200"
              >
                SignUp
              </Link>
              <Link
                to="/login"
                className="border border-black p-2 bg-white text-black  px-6 rounded-3xl hover:scale-105 transition-all duration-200"
              >
                Login
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
