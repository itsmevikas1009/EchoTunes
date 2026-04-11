import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useInputValidation, useStrongPassword } from "6pp";
import { FaArrowLeft } from "react-icons/fa6";
import { IoEye } from "react-icons/io5";
import { IoMdEyeOff } from "react-icons/io";
import { FaCheckCircle, FaMusic } from "react-icons/fa";
import toast from "react-hot-toast";
import AppLayout from "../components/AppLayout";
import api from "../services/api";
import { updateFailure, updateSuccess } from "../redux/reducers/auth";
import FileInput from "../components/FileInput";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const { id } = useParams();
  const dispatch = useDispatch();
  const [seePassword, setSeePassword] = useState(false);

  // Profile Form
  const name = useInputValidation(user && user.name);
  const password = useStrongPassword();

  // Application Form
  const [application, setApplication] = useState(null);
  const [appLoading, setAppLoading] = useState(true);
  const [artistName, setArtistName] = useState("");
  const [artistBio, setArtistBio] = useState("");
  const [artistImage, setArtistImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isArtistMode, setIsArtistMode] = useState(false);
  const [artistProfileLoading, setArtistProfileLoading] = useState(false);

  useEffect(() => {
    const fetchApplication = async () => {
      try {
        const res = await api.get("/artist/my-application");
        setApplication(res?.data || null);
      } catch (error) {
        console.log("Error fetching application status:", error);
      } finally {
        setAppLoading(false);
      }
    };
    fetchApplication();

    if (user?.isArtist) {
      fetchArtistProfile();
    }
  }, [user?.isArtist]);

  const fetchArtistProfile = async () => {
    setArtistProfileLoading(true);
    try {
      const res = await api.get("/artist/profile");
      if (res.success) {
        setArtistName(res.data.name);
        setArtistBio(res.data.bio);
        setArtistImage(res.data.profileImage);
      }
    } catch (error) {
      console.log("Error fetching artist profile:", error);
    } finally {
      setArtistProfileLoading(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const payload = { name: name.value };
      if (password.value) {
        payload.password = password.value;
      }

      const res = await api.put(`/updateProfile/${id}`, payload);

      if (res.success === true) {
        toast.success(res.message);
        localStorage.setItem("user", JSON.stringify(res.rest));
        dispatch(updateSuccess(res.rest));
      } else {
        toast.error(res.message);
        dispatch(updateFailure(res.message));
      }
    } catch (err) {
      const message = err?.response?.data?.message || "Error on updating profile.";
      toast.error(message);
      dispatch(updateFailure(message));
    }
  };

  const handleUpdateArtistProfile = async (e) => {
    e.preventDefault();
    if (!artistName.trim()) {
      return toast.error("Stage Name is required.");
    }

    setIsSubmitting(true);
    try {
      const payload = {
        name: artistName,
        bio: artistBio,
        profileImage: typeof artistImage === "string" ? artistImage : ""
      };

      const res = await api.patch("/artist/profile", payload);
      if (res.success) {
        toast.success("Artist profile updated successfully.");
        setIsArtistMode(false);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to update artist profile");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AppLayout>
      <div className="page-enter space-y-6">
        <section className="glass-panel rounded-[34px] p-5 md:p-8">
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="eyebrow">Personal Space</p>
              <h1 className="hero-title mt-3 text-3xl font-bold text-white md:text-4xl">
                Profile settings
              </h1>
            </div>
            <Link
              to="/"
              className="muted-button inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-white"
            >
              <FaArrowLeft size={12} />
              Back home
            </Link>
          </div>

          <div className="mx-auto grid max-w-4xl gap-6 lg:grid-cols-[0.7fr_1.3fr]">
            <div className="space-y-6">
              <div className="mesh-card rounded-[30px] p-6 text-center">
                <img
                  src={user.profilePicture}
                  height={160}
                  width={160}
                  alt={`${user.name}'s profile`}
                  className="mx-auto h-40 w-40 rounded-full object-cover"
                />
                <h2 className="mt-5 text-2xl font-bold text-white">{user.name}</h2>
                <p className="mt-2 break-all text-sm text-white/55">{user.email}</p>
              </div>

              {/* Artist Status Card (Hidden for Admins) */}
              {!appLoading && !user?.isAdmin && (
                <div className="glass-card rounded-[30px] p-6 text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white/5 text-[#ffd166]">
                    <FaMusic size={24} />
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-white">Artist Status</h3>
                  {application ? (
                    <div className="mt-3">
                      <p className={`inline-flex rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider
                        ${application.status === 'pending' ? 'bg-amber-500/20 text-amber-400' : 
                          application.status === 'approved' ? 'bg-emerald-500/20 text-emerald-400' : 
                          'bg-red-500/20 text-red-400'}`}>
                        {application.status}
                      </p>
                      <p className="mt-3 text-sm leading-relaxed text-white/60">
                        {application.reviewNote || (application.status === 'pending' 
                          ? "Your application is under review by the EchoTunes team." 
                          : "Thank you for applying.")}
                      </p>
                      {application.status === 'approved' && !isArtistMode && (
                        <button 
                          onClick={() => setIsArtistMode(true)}
                          className="mt-4 muted-button w-full rounded-xl py-2 text-xs font-bold"
                        >
                          Manage Artist Profile
                        </button>
                      )}
                    </div>
                  ) : (
                    <p className="mt-3 text-sm leading-relaxed text-white/55">
                      You haven't applied to be an artist yet. Fill out the form to get your music heard.
                    </p>
                  )}
                </div>
              )}
            </div>

            <div className="space-y-8">
              {/* Basic Details Form */}
              <form className="glass-card space-y-5 rounded-[30px] p-6" onSubmit={handleSave}>
                <h3 className="text-xl font-bold text-white mb-2">Account Details</h3>
                <div>
                  <label htmlFor="name" className="mb-2 block text-sm font-semibold text-white/80">
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    placeholder="Name"
                    value={name.value}
                    onChange={name.changeHandler}
                    className="glass-card w-full rounded-2xl px-4 py-3 text-white outline-none placeholder:text-white/35"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="mb-2 block text-sm font-semibold text-white/80">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="Email"
                    value={user.email}
                    readOnly
                    className="glass-card w-full rounded-2xl px-4 py-3 text-white/65 outline-none"
                  />
                </div>

                <div className="relative">
                  <label
                    htmlFor="password"
                    className="mb-2 block text-sm font-semibold text-white/80"
                  >
                    Password
                  </label>
                  <input
                    id="password"
                    type={seePassword ? "text" : "password"}
                    placeholder="Enter old password or choose a new one"
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

                  {password.error && <p className="mt-2 text-sm text-[#ffd166]">{password.error}</p>}
                </div>

                <button
                  type="submit"
                  className="accent-button w-full rounded-2xl px-4 py-3 text-base font-extrabold transition duration-200 disabled:cursor-not-allowed disabled:opacity-50"
                  disabled={password.value ? Boolean(password.error) : false}
                >
                  Save changes
                </button>
              </form>

              {/* Artist Profile Update Form (for Approved Artists) */}
              {user?.isArtist && isArtistMode && (
                <form className="glass-card space-y-6 rounded-[30px] p-6 shadow-xl ring-1 ring-[#ffd166]/20" onSubmit={handleUpdateArtistProfile}>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-white">Artist Profile</h3>
                      <p className="mt-2 text-sm text-white/60">Update your public persona and bio.</p>
                    </div>
                    <button 
                      type="button"
                      onClick={() => setIsArtistMode(false)}
                      className="text-xs text-white/40 hover:text-white"
                    >
                      Cancel
                    </button>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-white/80">
                      Stage Name
                    </label>
                    <input
                      type="text"
                      className="glass-card w-full rounded-2xl px-4 py-3 text-white outline-none placeholder:text-white/35"
                      placeholder="e.g. DJ Shadow, The Beatles"
                      value={artistName}
                      onChange={(e) => setArtistName(e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-white/80">
                      Bio
                    </label>
                    <textarea
                      rows={4}
                      className="glass-card w-full resize-none rounded-2xl px-4 py-3 text-white outline-none placeholder:text-white/35"
                      placeholder="Tell your fans about yourself..."
                      value={artistBio}
                      onChange={(e) => setArtistBio(e.target.value)}
                    />
                  </div>

                  <div>
                    <FileInput
                      name="artistImage"
                      label="Artist Banner"
                      type="image"
                      value={artistImage}
                      handleInputState={(name, val) => setArtistImage(val)}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting || !artistName}
                    className="accent-button w-full rounded-2xl px-4 py-3 text-base font-extrabold transition duration-200 shadow-lg shadow-orange-500/20"
                  >
                    {isSubmitting ? "Saving..." : "Update Artist Profile"}
                  </button>
                </form>
              )}

              {/* Artist Application Form (Hidden for Admins/Artists) */}
              {!appLoading && !application && !user?.isAdmin && (
                <form className="glass-card space-y-6 rounded-[30px] p-6" onSubmit={(e) => {
                  e.preventDefault();
                  // Re-implementing handleApply locally since I replaced the global function
                  const callApply = async () => {
                    if (!artistName.trim()) return toast.error("Artist Name is required.");
                    setIsSubmitting(true);
                    try {
                      const res = await api.post("/artist/apply", {
                        name: artistName,
                        bio: artistBio,
                        profileImage: typeof artistImage === "string" ? artistImage : "" 
                      });
                      if (res.success) {
                        toast.success("Application submitted successfully.");
                        setApplication(res.data);
                      }
                    } catch (err) {
                      toast.error(err?.response?.data?.message || "Failed to submit");
                    } finally {
                      setIsSubmitting(false);
                    }
                  }
                  callApply();
                }}>
                  <div>
                    <h3 className="text-xl font-bold text-white">Apply as Artist</h3>
                    <p className="mt-2 text-sm text-white/60">Share your creative identity and start publishing tracks on EchoTunes.</p>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-white/80">
                      Stage Name
                    </label>
                    <input
                      type="text"
                      className="glass-card w-full rounded-2xl px-4 py-3 text-white outline-none placeholder:text-white/35"
                      placeholder="Your artist or band name"
                      value={artistName}
                      onChange={(e) => setArtistName(e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-white/80">
                      Short Bio
                    </label>
                    <textarea
                      rows={3}
                      className="glass-card w-full resize-none rounded-2xl px-4 py-3 text-white outline-none placeholder:text-white/35"
                      placeholder="Tell us a little bit about your music style..."
                      value={artistBio}
                      onChange={(e) => setArtistBio(e.target.value)}
                    />
                  </div>

                  <div>
                    <FileInput
                      name="artistImage"
                      label="Artist Picture"
                      type="image"
                      value={artistImage}
                      handleInputState={(name, val) => setArtistImage(val)}
                      helperText="Provide a public URL. Uploading from file applies to Cloudinary."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting || !artistName}
                    className="accent-button w-full rounded-2xl px-4 py-3 text-base font-extrabold transition duration-200 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {isSubmitting ? "Submitting..." : "Submit Application"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>
      </div>
    </AppLayout>
  );
};

export default Profile;
