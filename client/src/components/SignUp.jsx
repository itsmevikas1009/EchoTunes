import { Link } from "react-router-dom";
import { useInputValidation, useStrongPassword } from "6pp";
import Navbar from "./Navbar";
import { server } from "../services/api";
import { useNavigate } from "react-router-dom";
<<<<<<< HEAD
=======
import axios from "axios";
>>>>>>> e2dc643aeefbf00d8be394652e3f1b2e1bd7bdc0
import toast from "react-hot-toast";
import { useState } from "react";

const SignUp = () => {
<<<<<<< HEAD
=======
  const [loading, setLoading] = useState(false);

>>>>>>> e2dc643aeefbf00d8be394652e3f1b2e1bd7bdc0
  const navigate = useNavigate();

  const name = useInputValidation("");
  const email = useInputValidation("");
  const password = useStrongPassword();

  const data = {
    name: name.value,
    email: email.value,
    password: password.value,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(`${server}/signup`, data, {
        withCredentials: true,
      });
<<<<<<< HEAD
      console.log(res);
=======
>>>>>>> e2dc643aeefbf00d8be394652e3f1b2e1bd7bdc0
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
      <div className="h-screen w-full ">
        <div className=" hidden md:flex md:w-[50%]  flex-col items-center bg-[rgb(213,129,53)] h-full ">
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

        <div className="flex flex-col items-center justify-center w-full  md:w-[50%] mx-auto absolute right-0 top-[3rem] p-[2.5rem] ">
          <div className="w-11/12 md:w-6/12">
            <h1 className="text-4xl font-bold ">Welcome to Spotify</h1>
            <p className="text-xl p-1">Sign up with your details...</p>

            <form className="flex flex-col gap-3 mt-6 " onSubmit={handleSubmit}>
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
                {password.error && (
                  <p className="text-sm p-1 text-red-500">{password.error}</p>
                )}
              </div>

              <button className="w-full bg-green-500 rounded-lg p-3 mt-3 font-semibold text-lg">
                {loading ? "Registering..." : "Register"}
              </button>
              <div className="text-center font-bold text-lg">Or</div>
              <button className="w-full bg-green-500 rounded-lg p-3  font-semibold text-lg">
                Sign Up With Google
              </button>
            </form>

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
