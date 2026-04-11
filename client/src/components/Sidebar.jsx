import { MdHomeFilled } from "react-icons/md";
import { IoSearch } from "react-icons/io5";
import { VscLibrary } from "react-icons/vsc";
import { Link, useLocation } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { useSelector } from "react-redux";
import { FaMusic, FaUserCheck } from "react-icons/fa";
import { HiMiniFire, HiOutlineQueueList } from "react-icons/hi2";

const navLinkBase =
  "group relative flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition duration-200";

const Sidebar = () => {
  const { user } = useSelector((state) => state.auth);
  const { recentlyPlayed, allSongs } = useSelector((state) => state.audioPlayer);
  const path = useLocation().pathname;

  const links = [
    { to: "/", label: "Home", icon: MdHomeFilled },
    { to: "/search", label: "Search", icon: IoSearch },
  ];

  if (user) {
    links.push({ to: `/profile/${user?._id}`, label: "Profile", icon: CgProfile });
  }

  if (user?.isAdmin) {
    links.push({ to: "/allsongs", label: "All Songs", icon: FaMusic });
    links.push({ to: "/applications", label: "Applications", icon: FaUserCheck });
  } else if (user?.isArtist) {
    links.push({ to: "/allsongs", label: "Artist Studio", icon: FaMusic });
  }

  return (
    <aside className="hidden w-[320px] shrink-0 xl:block">
      <div className="glass-panel sticky top-5 rounded-[32px] p-4">
        <div className="mb-5">
          <p className="eyebrow">Navigate</p>
          <h2 className="hero-title mt-3 text-2xl font-bold">Your stage</h2>
          <p className="mt-2 text-sm leading-6 text-white/60">
            Move through your music like a curated set instead of a file list.
          </p>
        </div>

        <nav className="space-y-2">
          {links.map(({ to, label, icon: Icon }) => {
            const isActive = path === to;

            return (
              <Link
                key={to}
                to={to}
                className={`${navLinkBase} ${
                  isActive
                    ? "bg-white/12 text-white shadow-lg shadow-black/15"
                    : "text-white/65 hover:bg-white/8 hover:text-white"
                }`}
              >
                <Icon size={20} className={isActive ? "text-[#ffd166]" : "text-white/55"} />
                <span>{label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="mesh-card mt-6 rounded-[26px] p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#ff8552]/20 text-[#ffd166]">
              <HiMiniFire size={22} />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Daily pulse</p>
              <p className="text-xs uppercase tracking-[0.22em] text-white/40">
                Listening snapshot
              </p>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-3">
            <div className="rounded-2xl bg-black/20 p-3">
              <p className="text-xs uppercase tracking-[0.2em] text-white/45">
                Tracks
              </p>
              <p className="mt-2 text-2xl font-bold text-white">{allSongs?.length || 0}</p>
            </div>
            <div className="rounded-2xl bg-black/20 p-3">
              <p className="text-xs uppercase tracking-[0.2em] text-white/45">
                Recents
              </p>
              <p className="mt-2 text-2xl font-bold text-white">
                {recentlyPlayed?.length || 0}
              </p>
            </div>
          </div>
        </div>

        <div className="glass-card mt-6 rounded-[26px] p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/8">
              <VscLibrary size={20} />
            </div>
            <div>
              <p className="text-sm font-semibold">Curated flow</p>
              <p className="text-xs text-white/45">Build momentum with quick jumps</p>
            </div>
          </div>

          <div className="mt-4 space-y-2">
            <div className="rounded-2xl border border-white/8 bg-white/4 px-3 py-3 text-sm text-white/75">
              <div className="mb-1 flex items-center gap-2 text-[#ffd166]">
                <HiOutlineQueueList size={16} />
                Queue starter
              </div>
              Explore new artists or replay your recent favorites.
            </div>
            <Link
              to="/search"
              className="accent-button inline-flex rounded-full px-4 py-2 text-sm font-bold transition duration-200"
            >
              Discover something
            </Link>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
