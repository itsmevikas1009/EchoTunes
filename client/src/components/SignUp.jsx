import { Link } from "react-router-dom";
import { useInputValidation, useStrongPassword } from "6pp";
import Navbar from "./Navbar";
import { server } from "../services/api";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import Google from "./Google";
import { useSelector } from "react-redux";
import { IoEye } from "react-icons/io5";
import { IoMdEyeOff } from "react-icons/io";

const SignUp = () => {
  const [loading, setLoading] = useState(false);
  const [seePassword, setSeePassword] = useState(false);

  const { user } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  const name = useInputValidation("");
  const email = useInputValidation("");
  const password = useStrongPassword();

  const data = {
    name: name.value,
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
      const res = await axios.post(`${server}/signup`, data, {
        withCredentials: true,
      });

      if (res.status === 200) {
        if (res.data.success === true) {
          toast.success(res.data.message);
          setLoading(false);
          navigate("/login");
        } else {
          toast.success(res.data.message);
          setLoading(false);
        }
      }
    } catch (err) {
      setLoading(false);
      console.log(err);
      toast.error(err?.response?.data?.message || "Failed to sign up.");
    }
  };

  return (
    <>
      <Navbar />
      <div className=" w-full h-screen ">
        <div className=" hidden md:flex md:w-[50%]  flex-col items-center bg-[rgb(213,129,53)]  h-screen">
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
        <div className="flex flex-col items-center justify-center w-full   md:w-[50%] mx-auto absolute right-0 top-[3rem] p-[2.5rem] ">
          <div className="w-11/12 md:max-w-sm">
            <h1 className="text-4xl font-bold ">Welcome to Spotify</h1>
            <p className="text-xl p-1">Sign up with your details...</p>

            <form
              className="flex flex-col gap-3 mt-4 mb-3"
              onSubmit={handleSubmit}
            >
              <div className="">
                <label htmlFor="" className="block font-medium">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Name"
                  value={name.value}
                  onChange={name.changeHandler}
                  className="w-full p-3 rounded-md outline-none  text-black border border-gray-300 px-4"
                />
              </div>
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
              <div className="w-full relative">
                <label htmlFor="" className="block font-medium">
                  Password
                </label>
                <input
                  type={seePassword ? "text" : "password"}
                  placeholder="Password"
                  value={password.value}
                  onChange={password.changeHandler}
                  className="w-full p-3 rounded-md outline-none  text-black border border-gray-300 px-4"
                />
                <span
                  className="absolute right-4 my-4 cursor-pointer "
                  onClick={() => setSeePassword(!seePassword)}
                >
                  {seePassword ? <IoMdEyeOff size={20} /> : <IoEye size={20} />}
                </span>
                {password.error && (
                  <p className="text-sm p-1 text-red-500">{password.error}</p>
                )}
              </div>
              <button
                className="w-full bg-green-500 rounded-lg p-3 mt-3 font-semibold text-lg"
                disabled={password.error}
              >
                {loading ? "Registering..." : "Register"}
              </button>
              <div className="text-center font-bold text-lg">Or</div>
            </form>
            <Google />
            <p className="mt-4 text-lg">
              Already Have a Account ?{" "}
              <Link to="/login" className="text-blue-500">
                Login
              </Link>{" "}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
