import { Link, useNavigate } from "react-router-dom";
import { useInputValidation, useStrongPassword } from "6pp";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { IoEye } from "react-icons/io5";
import { IoMdEyeOff } from "react-icons/io";
import { HiMiniSparkles } from "react-icons/hi2";
import { signUpFailure, signUpSuccess } from "../redux/reducers/auth";
import Navbar from "./Navbar";
import Google from "./Google";
import api from "../services/api";

const Login = () => {
  const { user } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [seePassword, setSeePassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const email = useInputValidation("");
  const password = useStrongPassword();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [navigate, user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.post("/login", {
        email: email.value,
        password: password.value,
      });

      if (res.success === true) {
        toast.success(res.message);
        localStorage.setItem("user", JSON.stringify(res.rest));
        dispatch(signUpSuccess(res.rest));
        navigate("/");
      } else {
        toast.error(res.message);
        dispatch(signUpFailure());
      }
    } catch (err) {
      dispatch(signUpFailure());
      toast.error(err?.response?.data?.message || "Failed to login.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-shell min-h-screen px-3 pb-8 pt-4 md:px-5">
      <Navbar />
      <div className="page-enter mx-auto mt-4 grid max-w-[1500px] gap-4 lg:grid-cols-[1.08fr_0.92fr]">
        <section className="mesh-card hidden rounded-[36px] p-8 lg:block xl:p-10">
          <p className="eyebrow">Welcome Back</p>
          <h1 className="hero-title mt-4 max-w-xl text-5xl font-bold leading-tight text-white">
            Step back into your listening room.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-8 text-white/65">
            We rebuilt the experience to feel warmer, sharper, and more cinematic.
            Sign in to pick up where your last session left off.
          </p>

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            <div className="glass-card rounded-[28px] p-5">
              <p className="text-xs uppercase tracking-[0.26em] text-[#ffd166]">
                Faster flow
              </p>
              <p className="mt-3 text-xl font-bold text-white">Clearer browsing</p>
              <p className="mt-2 text-sm leading-7 text-white/55">
                Larger cards, stronger hierarchy, and fewer dead ends.
              </p>
            </div>
            <div className="glass-card rounded-[28px] p-5">
              <p className="text-xs uppercase tracking-[0.26em] text-[#ffd166]">
                Better mood
              </p>
              <p className="mt-3 text-xl font-bold text-white">A more alive UI</p>
              <p className="mt-2 text-sm leading-7 text-white/55">
                Gradient depth, ambient panels, and a less generic music-app shell.
              </p>
            </div>
          </div>
        </section>

        <section className="glass-panel mx-auto w-full max-w-xl rounded-[36px] p-6 md:p-8">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs uppercase tracking-[0.22em] text-white/60">
              <HiMiniSparkles className="text-[#ffd166]" />
              Login
            </div>
            <h2 className="hero-title mt-5 text-3xl font-bold text-white md:text-4xl">
              Enter EchoTunes
            </h2>
            <p className="mt-3 text-sm leading-7 text-white/60 md:text-base">
              Sign in with your email, or jump in instantly with Google.
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="mb-2 block text-sm font-semibold text-white/80">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email.value}
                onChange={email.changeHandler}
                className="glass-card w-full rounded-2xl px-4 py-3 text-white outline-none placeholder:text-white/35"
              />
            </div>

            <div className="relative">
              <label className="mb-2 block text-sm font-semibold text-white/80">
                Password
              </label>
              <input
                type={seePassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password.value}
                onChange={password.changeHandler}
                className="glass-card w-full rounded-2xl px-4 py-3 pr-12 text-white outline-none placeholder:text-white/35"
              />
              <button
                type="button"
                className="absolute right-4 top-[46px] text-white/55"
                onClick={() => setSeePassword((prev) => !prev)}
              >
                {seePassword ? <IoMdEyeOff size={20} /> : <IoEye size={20} />}
              </button>
            </div>

            <button
              className="accent-button w-full rounded-2xl px-4 py-3 text-base font-extrabold transition duration-200"
              type="submit"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>

          <div className="my-5 flex items-center gap-3 text-xs uppercase tracking-[0.24em] text-white/35">
            <div className="h-px flex-1 bg-white/10" />
            Or continue with
            <div className="h-px flex-1 bg-white/10" />
          </div>

          <Google />

          <p className="mt-6 text-sm text-white/60">
            New here?{" "}
            <Link to="/signup" className="font-semibold text-[#ffd166]">
              Create an account
            </Link>
          </p>
        </section>
      </div>
    </div>
  );
};

export default Login;
