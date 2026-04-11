import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import toast from "react-hot-toast";
import { app } from "../firebase";
import { useNavigate } from "react-router-dom";
import { signUpFailure, signUpSuccess } from "../redux/reducers/auth";
import { useDispatch } from "react-redux";
import { FcGoogle } from "react-icons/fc";
import api from "../services/api";

const Google = () => {
  const auth = getAuth(app);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleGoogleClick = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    try {
      const resultsFromGoogle = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(resultsFromGoogle);
      const idToken = credential?.idToken;

      if (!idToken) {
        throw new Error("Unable to verify Google sign-in.");
      }

      const res = await api.post("/google", { idToken });

      if (res.success === true) {
        localStorage.setItem("user", JSON.stringify(res.rest));
        dispatch(signUpSuccess(res.rest));
        toast.success(res.message);
        navigate("/");
      }
    } catch (error) {
      dispatch(signUpFailure());
      toast.error(error?.response?.data?.message || error.message || "Something Went Wrong !");
    }
  };

  return (
    <button
      className="w-full bg-green-500 rounded-lg p-2  flex items-center justify-center gap-6 font-semibold text-lg"
      onClick={handleGoogleClick}
    >
      <FcGoogle size={28} />
      Continue With Google
    </button>
  );
};

export default Google;
