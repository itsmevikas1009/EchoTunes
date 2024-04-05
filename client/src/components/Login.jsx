import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Google from "./Google";
import { useInputValidation, useStrongPassword } from "6pp";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { server } from "../services/api";
import { useDispatch, useSelector } from "react-redux";
import { signUpFailure, signUpSuccess } from "../redux/reducers/auth";


const Login = () => {
  const { user } = useSelector(state => state.auth);

  const [loading, setLoading] = useState(false);
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
      const res = await axios.post(`${server}/login`, data, {
        withCredentials: true,
      });
      console.log(res);

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
          <div className="w-11/12 md:w-6/12">
            <h1 className="text-4xl font-bold ">Welcome to Spotify</h1>
            <p className="text-xl p-1">Login with your email...</p>

            <form
              className="flex flex-col gap-4 mt-10 mb-3"
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
                  className="w-full p-3 rounded-md outline-none  text-black border border-gray-300 px-4"
                />
              </div>

              <div className="w-full">
                <label htmlFor="" className="block font-medium">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Password"
                  value={password.value}
                  onChange={password.changeHandler}
                  className="w-full p-3 rounded-md outline-none  text-black border border-gray-300 px-4"
                />
              </div>

              <button className=" w-full mx-auto  bg-green-500 rounded-lg p-3 mt-6 font-semibold text-lg">
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
