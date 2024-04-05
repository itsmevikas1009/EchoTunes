import "./App.css";

// Importing routing utilities from react-router-dom
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignUp from "./components/SignUp.jsx";
import Login from "./components/Login.jsx";
import { Toaster } from "react-hot-toast";
import Dashboard from "./pages/Dashboard.jsx";
import Search from "./pages/Search.jsx";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Dashboard />
      ),
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
  ]);
  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  );
}

export default App;
