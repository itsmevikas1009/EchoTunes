import BottomBar from "./BottomBar";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import "react-h5-audio-player/lib/styles.css";

const AppLayout = ({ children }) => {
  return (
    <div className="app-shell px-3 pb-24 pt-4 md:px-5 md:pb-8 md:pt-5">
      <Navbar />
      <div className="mx-auto mt-4 flex w-full max-w-[1500px] gap-4 lg:gap-5">
        <Sidebar />
        <main className="min-w-0 flex-1">{children}</main>
      </div>
      <BottomBar />
    </div>
  );
};

export default AppLayout;
