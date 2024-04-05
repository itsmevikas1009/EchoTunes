import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const AppLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className="flex h-screen pt-16 bg-black text-white">
        <Sidebar />
        <div className="w-[75%] overflow-hidden ">{children}</div>
      </div>
    </>
  );
};

export default AppLayout;
