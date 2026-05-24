import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FcGoogle } from "react-icons/fc";
import { app } from "../firebase";
import { signUpFailure, signUpSuccess } from "../redux/reducers/auth";
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
      className="glass-panel flex w-full items-center justify-center gap-4 rounded-2xl px-4 py-3 font-semibold text-white transition duration-200 hover:bg-white/10"
      onClick={handleGoogleClick}
      type="button"
    >
      <FcGoogle size={24} />
      Continue with Google
    </button>
  );
};

export default Google;
