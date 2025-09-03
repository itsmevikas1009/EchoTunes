import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Google from "./Google";
import { useInputValidation, useStrongPassword } from "6pp";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
// Remove this import - we'll create a proper API instance
// import { server } from "../services/api";
import { useDispatch, useSelector } from "react-redux";
import { signUpFailure, signUpSuccess } from "../redux/reducers/auth";
import { IoEye } from "react-icons/io5";
import { IoMdEyeOff } from "react-icons/io";

// Create axios instance for CORS-free requests
const api = axios.create({
  baseURL: '/api', // Uses Vite proxy in development
  withCredentials: true,
  timeout: 10000
});

const Login = () => {
  const { user } = useSelector((state) => state.auth);

  const [loading, setLoading] = useState(false);
  const [seePassword, setSeePassword] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const email = useInputValidation("");
  const password = useStrongPassword();

  const data = {
    email: email.value,
    password: password.value,
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Updated API call - now uses the proxy-friendly base URL
      const res = await api.post('/login', data);
      // console.log(res);

      if (res.status === 200) {
        if (res.data.success === true) {
          toast.success(res.data.message);
          setLoading(false);
          localStorage.setItem("user", JSON.stringify(res.data.rest));
          dispatch(signUpSuccess(res.data.rest));
          navigate("/");
        } else {
          toast.success(res.data.message);
          dispatch(signUpFailure());
          setLoading(false);
        }
      }
    } catch (err) {
      setLoading(false);
      dispatch(signUpFailure());
      toast.error(err?.response?.data?.message || "Failed to login.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="h-screen w-full ">
        <div className=" hidden md:flex md:w-[50%]  flex-col items-center bg-[rgb(213,129,53)] h-full">
          <img
            src="https://staticfe.saavn.com/web6/jioindw/dist/1712206575/_i/artist/Badshah.png"
            className="h-96 mt-[6rem]"
            alt=""
          />
          <div className="text-center  text-white mt-10 ">
            <p className="text-4xl font-semibold mb-2">All Your Music.</p>
            <p className="text-xl font-semibold italic">Anytime, anywhere</p>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center w-full  md:w-[50%] mx-auto absolute right-0 top-[5rem] p-[2.5rem] ">
          <div className="w-11/12 md:max-w-sm">
            <h1 className="text-2xl sm:text-3xl font-bold ">
              Welcome to EchoTunes
            </h1>
            <p className="sm:text-xl text-lg p-1">Login with your email...</p>

            <form
              className="flex flex-col gap-3 mt-4 mb-3"
              onSubmit={handleSubmit}
            >
              <div className="w-full">
                <label htmlFor="" className="block font-medium">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Email"
                  value={email.value}
                  onChange={email.changeHandler}
                  className="w-full p-2 rounded-md outline-none  text-black border border-gray-300 px-4"
                />
              </div>
              <div className="w-full relative">
                <label htmlFor="" className="block font-medium">
                  Password
                </label>
                <input
                  type={seePassword ? "text" : "password"}
                  placeholder="Password"
                  value={password.value}
                  onChange={password.changeHandler}
                  className="w-full p-2 rounded-md outline-none  text-black border border-gray-300 px-4"
                />
                <span
                  className="absolute right-4 my-4 cursor-pointer "
                  onClick={() => setSeePassword(!seePassword)}
                >
                  {seePassword ? <IoMdEyeOff size={20} /> : <IoEye size={20} />}
                </span>
              </div>
              <button className=" w-full mx-auto  bg-green-500 rounded-lg p-2 mt-6 font-semibold text-lg">
                {loading ? "Signing..." : "SignIn"}
              </button>

              <div className="text-center font-bold text-lg">Or</div>
            </form>
            <Google />
            <p className="mt-6 text-lg ">
              New User ?{" "}
              <Link to="/signup" className="text-blue-500">
                SignUp
              </Link>{" "}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
