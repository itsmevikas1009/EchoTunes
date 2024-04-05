import Logo from "../assets/spotify-logo.png";
import { Link } from "react-router-dom";

const Navbar = ({ bg, text = "black" }) => {
  return (
    <div className={`absolute w-full  py-2 bg-${bg} text-${text}`}>
      <div className="w-11/12 mx-auto flex items-center justify-between">
        <div className="flex gap-2 items-center">
          <img src={Logo} alt="" className="h-[3rem] w-[3rem] bg-white rounded-full " />
          <h1 className="text-2xl font-bold">Spotify</h1>
        </div>

        <div className="flex gap-6 text-lg font-semibold">
          <Link to="/signup">Signup</Link>
          <Link to="/login">Login</Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
