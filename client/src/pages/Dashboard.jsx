import AppLayout from "../components/AppLayout";

const Dashboard = () => {
  return (
    <AppLayout>
      <div className="bg-[#1a1a1a] flex-1 overflow-auto px-8 py-6 h-full text-white rounded-lg mx-1 my-3">
        <h2 className="text-2xl font-bold">Recently Played</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          <div className="bg-[#232323] rounded-lg  p-3 ms-4 mt-4">
            <img
              src="https://charts-images.scdn.co/assets/locale_en/regional/daily/region_global_default.jpg"
              alt=""
              className="rounded-lg "
            />
            <p className="text-xl my-2 font-semibold">Top 50 - Global</p>
            <p className="text-sm">Your daily update of the most played...</p>
          </div>
        </div>
        <h2 className="text-2xl font-bold mt-6">Trending now near you</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          <div className="bg-[#232323] rounded-lg p-3 ms-4 mt-4">
            <img
              src="https://charts-images.scdn.co/assets/locale_en/regional/daily/region_global_default.jpg"
              alt=""
              className="rounded-lg "
            />
            <p className="text-xl my-2 font-semibold">Top 50 - Global</p>
            <p className="text-sm">Your daily update of the most played...</p>
          </div>
          <div className="bg-[#232323] rounded-lg p-3 ms-4 mt-4">
            <img
              src="https://charts-images.scdn.co/assets/locale_en/regional/daily/region_global_default.jpg"
              alt=""
              className="rounded-lg "
            />
            <p className="text-xl my-2 font-semibold">Top 50 - Global</p>
            <p className="text-sm">Your daily update of the most played...</p>
          </div>
          <div className="bg-[#232323] rounded-lg  p-3 ms-4 mt-4">
            <img
              src="https://charts-images.scdn.co/assets/locale_en/regional/daily/region_global_default.jpg"
              alt=""
              className="rounded-lg "
            />
            <p className="text-xl my-2 font-semibold">Top 50 - Global</p>
            <p className="text-sm">Your daily update of the most played...</p>
          </div>
          <div className="bg-[#232323] rounded-lg  p-3 ms-4 mt-4">
            <img
              src="https://charts-images.scdn.co/assets/locale_en/regional/daily/region_global_default.jpg"
              alt=""
              className="rounded-lg "
            />
            <p className="text-xl my-2 font-semibold">Top 50 - Global</p>
            <p className="text-sm">Your daily update of the most played...</p>
          </div>
          <div className="bg-[#232323] rounded-lg  p-3 ms-4 mt-4">
            <img
              src="https://charts-images.scdn.co/assets/locale_en/regional/daily/region_global_default.jpg"
              alt=""
              className="rounded-lg "
            />
            <p className="text-xl my-2 font-semibold">Top 50 - Global</p>
            <p className="text-sm">Your daily update of the most played...</p>
          </div>
          <div className="bg-[#232323] rounded-lg p-3 ms-4 mt-4">
            <img
              src="https://charts-images.scdn.co/assets/locale_en/regional/daily/region_global_default.jpg"
              alt=""
              className="rounded-lg "
            />
            <p className="text-xl my-2 font-semibold">Top 50 - Global</p>
            <p className="text-sm">Your daily update of the most played...</p>
          </div>
          <div className="bg-[#232323] rounded-lg p-3 ms-4 mt-4">
            <img
              src="https://charts-images.scdn.co/assets/locale_en/regional/daily/region_global_default.jpg"
              alt=""
              className="rounded-lg "
            />
            <p className="text-xl my-2 font-semibold">Top 50 - Global</p>
            <p className="text-sm">Your daily update of the most played...</p>
          </div>
        </div>
        <h2 className="text-2xl font-bold  mt-6">Featured Charts</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
          <div className="bg-[#232323] rounded-lg  p-3 ms-4 mt-4">
            <img
              src="https://charts-images.scdn.co/assets/locale_en/regional/daily/region_global_default.jpg"
              alt=""
              className="rounded-lg "
            />
            <p className="text-xl my-2 font-semibold">Top 50 - Global</p>
            <p className="text-sm">Your daily update of the most played...</p>
          </div>
          <div className="bg-[#232323] rounded-lg  p-3 ms-4 mt-4">
            <img
              src="https://charts-images.scdn.co/assets/locale_en/regional/daily/region_global_default.jpg"
              alt=""
              className="rounded-lg "
            />
            <p className="text-xl my-2 font-semibold">Top 50 - Global</p>
            <p className="text-sm">Your daily update of the most played...</p>
          </div>
          <div className="bg-[#232323] rounded-lg  p-3 ms-4 mt-4">
            <img
              src="https://charts-images.scdn.co/assets/locale_en/regional/daily/region_global_default.jpg"
              alt=""
              className="rounded-lg "
            />
            <p className="text-xl my-2 font-semibold">Top 50 - Global</p>
            <p className="text-sm">Your daily update of the most played...</p>
          </div>
        </div>
        <div className="footer">
          <div className="line"></div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Dashboard;
