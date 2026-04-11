import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaCheck, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import AppLayout from "../../components/AppLayout";
import api from "../../services/api";

const Applications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const res = await api.get("/artist/applications?status=pending");
      setApplications(res?.data || []);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to load applications");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const handleAction = async (id, action) => {
    try {
      const res = await api.patch(`/artist/applications/${id}/${action}`, {
        reviewNote: action === "approve" ? "Welcome to EchoTunes!" : "Requirements not met.",
      });
      if (res.success) {
        toast.success(res.message);
        setApplications((prev) => prev.filter((app) => app._id !== id));
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || `Failed to ${action}`);
    }
  };

  return (
    <AppLayout>
      <div className="page-enter space-y-6">
        <section className="glass-panel rounded-[34px] p-5 md:p-8">
          <div className="mb-6">
            <p className="eyebrow">Admin Console</p>
            <h2 className="hero-title mt-3 text-3xl font-bold text-white md:text-4xl">
              Artist Applications
            </h2>
            <p className="mt-3 text-sm text-white/55">
              Review and manage pending requests to join as an artist.
            </p>
          </div>

          <div className="overflow-x-auto">
            {loading ? (
              <div className="flex animate-pulse flex-col space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-24 w-full rounded-2xl bg-white/5" />
                ))}
              </div>
            ) : applications.length === 0 ? (
              <div className="rounded-[28px] border border-dashed border-white/10 bg-white/[0.03] px-6 py-14 text-center text-white/55">
                No pending applications. You're all caught up!
              </div>
            ) : (
              <table className="w-full min-w-[800px] text-left text-sm text-white/75">
                <thead className="bg-[#120e17] text-xs uppercase tracking-wider text-white/45">
                  <tr>
                    <th className="px-6 py-4 font-medium">User</th>
                    <th className="px-6 py-4 font-medium">Requested Stage Name</th>
                    <th className="px-6 py-4 font-medium">Bio</th>
                    <th className="px-6 py-4 text-center font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {applications.map((app) => (
                    <tr key={app._id} className="transition hover:bg-white/[0.02]">
                      <td className="px-6 py-4">
                        <p className="font-semibold text-white">{app.userName || "Unknown"}</p>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={app.profileImage}
                            alt="avatar"
                            className="h-10 w-10 rounded-full object-cover"
                            onError={(e) => {
                              e.target.src = "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=150&q=80";
                            }}
                          />
                          <p className="font-bold text-[#ffd166]">{app.name}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="line-clamp-2 max-w-[300px]">{app.bio || "No bio provided"}</p>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => handleAction(app._id, "approve")}
                            className="flex items-center gap-2 rounded-full bg-emerald-500/20 px-3 py-1.5 text-xs font-semibold text-emerald-400 transition hover:bg-emerald-500/30"
                          >
                            <FaCheck /> Approve
                          </button>
                          <button
                            onClick={() => handleAction(app._id, "reject")}
                            className="flex items-center gap-2 rounded-full bg-red-500/20 px-3 py-1.5 text-xs font-semibold text-red-400 transition hover:bg-red-500/30"
                          >
                            <FaTimes /> Reject
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </section>
      </div>
    </AppLayout>
  );
};

export default Applications;
