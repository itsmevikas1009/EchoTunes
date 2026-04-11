import { Link, useNavigate } from "react-router-dom";
import { useInputValidation, useStrongPassword } from "6pp";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { IoEye } from "react-icons/io5";
import { IoMdEyeOff } from "react-icons/io";
import { HiMiniSparkles } from "react-icons/hi2";
import Navbar from "./Navbar";
import Google from "./Google";
import api from "../services/api";

const SignUp = () => {
  const [loading, setLoading] = useState(false);
  const [seePassword, setSeePassword] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const name = useInputValidation("");
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
      const res = await api.post("/signup", {
        name: name.value,
        email: email.value,
        password: password.value,
      });

      if (res.success === true) {
        toast.success(res.message);
        navigate("/login");
      } else {
        toast.error(res.message);
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to sign up.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-shell min-h-screen px-3 pb-8 pt-4 md:px-5">
      <Navbar />
      <div className="page-enter mx-auto mt-4 grid max-w-[1500px] gap-4 lg:grid-cols-[0.92fr_1.08fr]">
        <section className="glass-panel mx-auto w-full max-w-xl rounded-[36px] p-6 md:p-8">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs uppercase tracking-[0.22em] text-white/60">
              <HiMiniSparkles className="text-[#ffd166]" />
              Sign up
            </div>
            <h2 className="hero-title mt-5 text-3xl font-bold text-white md:text-4xl">
              Create your session
            </h2>
            <p className="mt-3 text-sm leading-7 text-white/60 md:text-base">
              Start with an account and step into the new EchoTunes experience.
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="mb-2 block text-sm font-semibold text-white/80">Name</label>
              <input
                type="text"
                placeholder="Your display name"
                value={name.value}
                onChange={name.changeHandler}
                className="glass-card w-full rounded-2xl px-4 py-3 text-white outline-none placeholder:text-white/35"
              />
            </div>

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
                placeholder="Choose a secure password"
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
              {password.error && (
                <p className="mt-2 text-sm text-[#ffd166]">{password.error}</p>
              )}
            </div>

            <button
              className="accent-button w-full rounded-2xl px-4 py-3 text-base font-extrabold transition duration-200 disabled:cursor-not-allowed disabled:opacity-50"
              disabled={Boolean(password.error)}
              type="submit"
            >
              {loading ? "Creating account..." : "Create account"}
            </button>
          </form>

          <div className="my-5 flex items-center gap-3 text-xs uppercase tracking-[0.24em] text-white/35">
            <div className="h-px flex-1 bg-white/10" />
            Or continue with
            <div className="h-px flex-1 bg-white/10" />
          </div>

          <Google />

          <p className="mt-6 text-sm text-white/60">
            Already have an account?{" "}
            <Link to="/login" className="font-semibold text-[#ffd166]">
              Log in
            </Link>
          </p>
        </section>

        <section className="mesh-card hidden rounded-[36px] p-8 lg:block xl:p-10">
          <p className="eyebrow">New Era</p>
          <h1 className="hero-title mt-4 max-w-xl text-5xl font-bold leading-tight text-white">
            Build your soundtrack inside a UI with actual personality.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-8 text-white/65">
            This redesign leans warm, editorial, and immersive so the app feels
            crafted instead of copied. Your account is the front door into that.
          </p>

          <div className="mt-10 space-y-4">
            <div className="glass-card rounded-[28px] p-5">
              <p className="text-xs uppercase tracking-[0.26em] text-[#ffd166]">
                Cleaner entry
              </p>
              <p className="mt-3 text-xl font-bold text-white">Less clutter, more focus</p>
              <p className="mt-2 text-sm leading-7 text-white/55">
                Stronger spacing and calmer forms make the auth flow feel quicker.
              </p>
            </div>
            <div className="glass-card rounded-[28px] p-5">
              <p className="text-xs uppercase tracking-[0.26em] text-[#ffd166]">
                Consistent system
              </p>
              <p className="mt-3 text-xl font-bold text-white">One visual language</p>
              <p className="mt-2 text-sm leading-7 text-white/55">
                The same materials and motion now carry across home, search, and auth.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default SignUp;
