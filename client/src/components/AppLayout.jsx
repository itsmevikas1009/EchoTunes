import Navbar from "./Navbar";
import Player from "./Player.jsx";
import Sidebar from "./Sidebar";

const AppLayout = ({ children }) => {
  return (
    <>
      <Navbar bg={"black"} text={"white"} />
      <div className="flex h-screen pt-14 bg-black text-white">
        <Sidebar />
        <div className="w-[75%] overflow-hidden ">{children}</div>
        <Player />
      </div>
    </>
  );
};

export default AppLayout;
