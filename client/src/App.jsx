import "./App.css";

// Importing routing utilities from react-router-dom
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignUp from "./components/SignUp.jsx";
import Login from "./components/Login.jsx";
import { Toaster } from "react-hot-toast";
import Dashboard from "./pages/Dashboard.jsx";
import Search from "./pages/Search.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx"
import Profile from "./pages/Profile.jsx";
import AddSong from "./pages/AddSong.jsx";
import MusicPlayer from "./components/MusicPlayer.jsx";
import { useSelector } from "react-redux";


function App() {
  const { songIndex, allSongs, autoPlay, isPlaying } = useSelector((state) => state.audioPlayer);
  const { user } = useSelector((state) => state.auth);

  const router = createBrowserRouter([
    {
      path: "/",
      element:
        <Dashboard />
      ,
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
      path: "/create-song",
      element: <AddSong />,
    },
    {
      path: "/profile/:id",
      element: <PrivateRoute>
        <Profile />
      </PrivateRoute>,
    },
  ]);
  return (

    <>
      <RouterProvider router={router} />
      <Toaster />
      {/* <Player /> */}
      {isPlaying && user && <MusicPlayer />}
    </>
  );
}

export default App;
