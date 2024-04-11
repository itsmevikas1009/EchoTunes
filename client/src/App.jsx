import "./App.css";

// Importing routing utilities from react-router-dom
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignUp from "./components/SignUp.jsx";
import Login from "./components/Login.jsx";
import { Toaster } from "react-hot-toast";
import Dashboard from "./pages/Dashboard.jsx";
import Search from "./pages/Search.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import Profile from "./pages/Profile.jsx";
import AddSong from "./pages/AddSong.jsx";
import MusicPlayer from "./components/MusicPlayer.jsx";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import AllSongs from "./pages/admin/AllSongs.jsx";

function App() {
  const { isPlaying } = useSelector((state) => state.audioPlayer);
  const { user } = useSelector((state) => state.auth);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Dashboard />,
    },
    {
      path: "/signup",
      element: <SignUp />,
    },

    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/search",
      element: <Search />,
    },
    {
      path: "/allsongs",
      element: <AllSongs />,
    },
    {
      path: "/create-song",
      element: <AddSong />,
    },
    {
      path: "/profile/:id",
      element: (
        <PrivateRoute>
          <Profile />
        </PrivateRoute>
      ),
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
      {/* <Player /> */}

      {isPlaying && user && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className={`fixed min-w-[700px] h-26  inset-x-0 bottom-0  bg-cardOverlay drop-shadow-2xl backdrop-blur-md flex items-center justify-center`}
        >
          <MusicPlayer />
        </motion.div>
      )}
    </>
  );
}

export default App;
