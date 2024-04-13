import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import "react-h5-audio-player/lib/styles.css";
// import "./library.scss"

const AppLayout = ({ children }) => {
  return (
    <>
      <Navbar bg={"black"} text={"white"} />
      <div className="flex h-screen pt-14 bg-black text-white">
        <Sidebar />
        <div className="w-full md:w-[75%] overflow-hidden ">{children}</div>
      </div>
    </>
  );
};

export default AppLayout;
