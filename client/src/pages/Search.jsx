import AppLayout from "../components/AppLayout";
import { FaSearch } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa6";
import { Link } from "react-router-dom";

const browse = [
  {
    title: "Blinding ",
    image_url: "https://t.scdn.co/images/ea364e99656e46a096ea1df50f581efe",
  },

  {
    title: "Blinding ",
    image_url: "https://t.scdn.co/images/ea364e99656e46a096ea1df50f581efe",
  },

  {
    title: "Blinding Lights",
    image_url: "https://t.scdn.co/images/ea364e99656e46a096ea1df50f581efe",
  },
  {
    title: "Blinding Lights",
    image_url: "https://t.scdn.co/images/ea364e99656e46a096ea1df50f581efe",
  },
  {
    title: "Blinding Lights",
    image_url: "https://t.scdn.co/images/ea364e99656e46a096ea1df50f581efe",
  },
  {
    title: "Blinding Lights",
    image_url: "https://t.scdn.co/images/ea364e99656e46a096ea1df50f581efe",
  },
  {
    title: "Blinding Lights",
    image_url: "https://t.scdn.co/images/ea364e99656e46a096ea1df50f581efe",
  },
  {
    title: "Blinding Lights",
    image_url: "https://t.scdn.co/images/ea364e99656e46a096ea1df50f581efe",
  },
  {
    title: "Blinding Lights",
    image_url: "https://t.scdn.co/images/ea364e99656e46a096ea1df50f581efe",
  },
  {
    title: "Blinding Lights",
    image_url: "https://t.scdn.co/images/ea364e99656e46a096ea1df50f581efe",
  },
  {
    title: "Blinding Lights",
    image_url: "https://t.scdn.co/images/ea364e99656e46a096ea1df50f581efe",
  },
  {
    title: "Blinding Lights",
    image_url: "https://t.scdn.co/images/ea364e99656e46a096ea1df50f581efe",
  },

];

const Search = () => {
  return (
    <AppLayout>
      <div className="bg-[#1a1a1a] flex-1 overflow-auto px-6 h-full text-white rounded-lg mx-1 my-3">
        <div className="bg-opacity-95 z-40 hidden md:block my-2 sticky top-0 bg-[#1a1a1a]">
          <div className="flex items-center gap-4 z-10">
            <Link to="/">
              {" "}
              <FaArrowLeft size={24} color="white" className="m-4" />
            </Link>

            <form className="w-full py-4">
              <div className="relative">
                <input
                  type="text"
                  className="w-[35%] p-4 px-12 rounded-full bg-[#232323]  shadow-slate-50 shadow-sm outline-none text-white "
                  placeholder="What do you want to play ?"
                />

                <span className="absolute left-5 top-5 mx-auto opacity-80">
                  <FaSearch color="white" />
                </span>
              </div>
            </form>
          </div>
        </div>

        <h1 className="text-2xl font-bold">Browse all </h1>
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 z-10 ">
          {browse.map((i, index) => {
            const { title, image_url } = i;

            return (
              <div key={index} className="relative">
                <img
                  src={image_url}
                  alt=""
                  height={200}
                  width={200}
                  className="rounded-lg "
                />
                <h1 className="absolute top-2 left-2 font-bold text-lg md:text-2xl">
                  {title}
                </h1>
              </div>
            );
          })}
        </div>
      </div>
    </AppLayout>
  );
};

export default Search;
