import Logo from "../assets/spotify-logo.png";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { logout } from "../redux/reducers/auth";
import { useNavigate } from "react-router-dom";


const Navbar = ({ bg, text = "black" }) => {
  const { user } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    localStorage.removeItem("user");
    dispatch(logout());
    navigate("/login");
  }

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
          {
            user ? (
              <button onClick={handleLogout}>Logout</button>
            ) : (
              <>
                <Link to="/signup" className="border p-2 bg-black text-white  px-6 rounded-3xl hover:scale-105 transition-all duration-200">Signup</Link>
                <Link to="/login" className="border p-2 bg-white text-black  px-6 rounded-3xl hover:scale-105 transition-all duration-200">Login</Link>
              </>
            )
          }
        </div>
      </div >
    </div >
  );
};

export default Navbar;
