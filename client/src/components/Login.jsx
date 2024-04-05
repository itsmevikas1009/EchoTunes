import { Link } from "react-router-dom";
import { useInputValidation, useStrongPassword } from "6pp";
import Navbar from "./Navbar";
import Google from "./Google";

const Login = () => {
  const email = useInputValidation("");
  const password = useStrongPassword();

  const data = {
    email: email.value,
    password: password.value,
  };

  const handleSubmit = (e) => {
    e.preventDefault();
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
              className="flex flex-col gap-4 mt-10 "
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
                Login
              </button>

              <div className="text-center font-bold text-lg">Or</div>
              <Google />
            </form>

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
