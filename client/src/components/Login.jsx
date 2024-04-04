import { Link } from "react-router-dom";

const Login = () => {

  const handleSubmit = (e) => {
    e.preventDefault();
  }


  return (
    <div className="h-screen w-full ">
      <div className=" hidden md:flex md:w-[50%]  flex-col items-center bg-[rgb(213,129,53)] h-full">
        <img src="https://staticfe.saavn.com/web6/jioindw/dist/1712206575/_i/artist/Badshah.png" className="h-96 mt-[6rem]" alt="" />
        <div className="text-center  text-white mt-10 ">
          <p className="text-4xl font-semibold mb-2">All Your Music.</p>
          <p className="text-xl font-semibold italic">Anytime, anywhere</p>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center w-full  md:w-[50%] mx-auto absolute right-0 top-[7rem] p-[2.5rem] ">
        <div className="w-11/12 md:w-9/12">
          <h1 className="text-4xl font-bold ">Welcome to Spotify</h1>
          <p className="text-xl p-1">Login with your email...</p>

          <form className="flex flex-col gap-4 mt-12 " onSubmit={handleSubmit}>
            <div className="w-full">
              <label htmlFor="" className="block font-medium">Email</label>
              <input type="email" placeholder="Email" className="w-full p-2 rounded-md outline-none  text-black border border-gray-200 px-4" />
            </div>

            <div className="w-full">
              <label htmlFor="" className="block font-medium">Password</label>
              <input type="password" placeholder="Password" className="w-full p-2 rounded-md outline-none  text-black border border-gray-200 px-4" />
            </div>


            <button className="w-full bg-green-500 rounded-md p-2 mt-6 font-semibold text-lg">Login</button>
          </form>

          <p className="mt-6 text-lg ">New User ? <Link to="/signup" className="text-blue-500">SignUp</Link> </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
