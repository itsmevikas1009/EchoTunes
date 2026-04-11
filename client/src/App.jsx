import "./App.css";
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
import ArtistPage from "./pages/ArtistPage.jsx";
import Applications from "./pages/admin/Applications.jsx";

function App() {
  const { isPlaying } = useSelector((state) => state.audioPlayer);
  const { user } = useSelector((state) => state.auth);

  const router = createBrowserRouter([
    { path: "/", element: <Dashboard /> },
    { path: "/signup", element: <SignUp /> },
    { path: "/login", element: <Login /> },
    { path: "/search", element: <Search /> },
    { path: "/artists/:name", element: <ArtistPage /> },
    { path: "/allsongs", element: <AllSongs /> },
    { path: "/applications", element: <Applications /> },
    { path: "/create-song", element: <AddSong /> },
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
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "rgba(28, 22, 35, 0.92)",
            color: "#f7f4ef",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "18px",
            backdropFilter: "blur(14px)",
          },
        }}
      />

      {isPlaying && user && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="floating-player fixed inset-x-3 bottom-20 z-50 rounded-[28px] px-4 py-3 md:inset-x-6 md:bottom-4 md:px-6"
        >
          <MusicPlayer />
        </motion.div>
      )}
    </>
  );
}

export default App;
