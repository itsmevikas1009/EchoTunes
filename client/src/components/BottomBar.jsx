import { MdHomeFilled } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { useSelector } from "react-redux";
import { FaMusic } from "react-icons/fa";

const BottomBar = () => {
  const path = useLocation().pathname;
  const { user } = useSelector((state) => state.auth);

  const links = [
    { to: "/", label: "Home", icon: MdHomeFilled },
    { to: "/search", label: "Search", icon: IoSearch },
  ];

  if (user) {
    links.push({ to: `/profile/${user?._id}`, label: "Profile", icon: CgProfile });
  }

  if (user?.isAdmin) {
    links.push({ to: "/allsongs", label: "Songs", icon: FaMusic });
  }

  return (
    <div className="fixed bottom-3 left-3 right-3 z-40 md:hidden">
      <div className="glass-panel spotlight-ring mx-auto flex max-w-lg items-center justify-around rounded-[28px] px-2 py-2">
        {links.map(({ to, label, icon: Icon }) => {
          const isActive = path === to;

          return (
            <Link
              key={to}
              to={to}
              className={`flex min-w-[64px] flex-col items-center rounded-2xl px-3 py-2 text-[11px] font-semibold transition ${
                isActive ? "bg-white/10 text-white" : "text-white/55"
              }`}
            >
              <Icon size={22} className={isActive ? "text-[#ffd166]" : "text-white/55"} />
              <span className="mt-1">{label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default BottomBar;
