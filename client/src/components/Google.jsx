import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import toast from "react-hot-toast";
import { app } from "../firebase";
import { server } from "../services/api";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { signUpFailure, signUpSuccess } from "../redux/reducers/auth";
import { useDispatch } from "react-redux";
import { FcGoogle } from "react-icons/fc";

const Google = () => {
  const auth = getAuth(app);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleGoogleClick = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    try {
      const resultsFromGoogle = await signInWithPopup(auth, provider);

      const data = {
        name: resultsFromGoogle.user.displayName,
        email: resultsFromGoogle.user.email,
        googlePhotoUrl: resultsFromGoogle.user.photoURL,
      };

      const res = await axios.post(`${server}/google`, data, {
        withCredentials: true,
      });
      // console.log(res);

      if (res.data.success === true) {
        localStorage.setItem("user", JSON.stringify(res.data.rest));
        dispatch(signUpSuccess(res.data.rest));
        toast.success(res.data.message);
        navigate("/");
      }
    } catch (error) {
      dispatch(signUpFailure());
      toast.error(error.response.data.message || "Something Went Wrong !");
    }
  };

  return (
    <button
      className="w-full bg-green-500 rounded-lg p-3  flex items-center justify-center gap-6 font-semibold text-lg"
      onClick={handleGoogleClick}
    >
      <FcGoogle size={28} />
      Continue With Google
    </button>
  );
};

export default Google;
