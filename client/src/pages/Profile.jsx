import { useState } from "react";
import AppLayout from "../components/AppLayout";
import { Link, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";
import { useSelector, useDispatch } from "react-redux";
import api from "../services/api";
import { useInputValidation, useStrongPassword } from "6pp";
import toast from "react-hot-toast";
import { updateFailure, updateSuccess } from "../redux/reducers/auth";
import { IoEye } from "react-icons/io5";
import { IoMdEyeOff } from "react-icons/io";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const { isPlaying } = useSelector((state) => state.audioPlayer);
  const { id } = useParams();
  const dispatch = useDispatch();

  const [seePassword, setSeePassword] = useState(false);

  const name = useInputValidation(user && user.name);
  const password = useStrongPassword();

  const data = {
    name: name.value,
    password: password.value,
  };

  const handleSave = async (e) => {
    e.preventDefault();

    try {
      const res = await api.put(`/updateProfile/${id}`, data);
      console.log(res);

      if (res.success === true) {
        toast.success(res.message);
        localStorage.setItem("user", JSON.stringify(res.rest));
        dispatch(updateSuccess(res.rest));
      } else {
        toast.error(res.message);
        dispatch(updateFailure(res.message));
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Error on updating profile.");
      dispatch(updateFailure(err?.response?.data?.message || "Error on updating profile."));
    }
  };

  return (
    <AppLayout>
      <div
        className={`bg-[#1a1a1a] w-full flex-1 overflow-auto px-8 text-white rounded-lg mx-1 my-3 ${isPlaying ? "h-[85%]" : "h-[97%]"
          }`}
      >
        <div className="pt-6 pb-2">
          <Link to="/">
            <FaArrowLeft size={24} color="white" />
          </Link>
        </div>

        <div className="flex flex-col gap-6 justify-center items-center">
          <h1 className="text-3xl font-bold mb-2">Profile</h1>

          <div className="w-full md:w-[50%] mx-auto flex flex-col justify-center">
            <img
              src={user.profilePicture}
              height={150}
              width={150}
              alt={`${user.name}'s profile`}
              className="mx-auto rounded-full object-contain"
            />

            <form
              className="w-full my-6 flex flex-col gap-6 justify-center"
              onSubmit={handleSave}
            >
              <div>
                <label htmlFor="name" className="block font-medium text-lg">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Name"
                  value={name.value}
                  onChange={name.changeHandler}
                  className="w-full p-3 rounded-lg outline-none text-black border border-gray-300 px-4"
                />
              </div>

              <div>
                <label htmlFor="email" className="block font-medium text-lg">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="Email"
                  value={user.email}
                  readOnly
                  className="w-full p-3 rounded-lg outline-none text-black border border-gray-300 px-4"
                />
              </div>

              <div className="w-full relative">
                <label htmlFor="password" className="block font-medium">
                  Password
                </label>
                <input
                  id="password"
                  type={seePassword ? "text" : "password"}
                  placeholder="Enter Old Password Or Create New One"
                  value={password.value}
                  onChange={password.changeHandler}
                  className="w-full p-3 rounded-lg outline-none text-black border border-gray-300 px-4"
                />
                <span
                  className="absolute right-4 my-4 cursor-pointer"
                  onClick={() => setSeePassword(!seePassword)}
                >
                  {seePassword ? (
                    <IoMdEyeOff color="black" size={20} />
                  ) : (
                    <IoEye color="black" size={20} />
                  )}
                </span>

                {password.error && (
                  <p className="text-sm p-1 text-red-500">{password.error}</p>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-green-500 rounded-lg p-3 mt-3 font-semibold text-lg text-black cursor-pointer"
                disabled={Boolean(password.error)}
              >
                Save Changes
              </button>
            </form>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Profile;
