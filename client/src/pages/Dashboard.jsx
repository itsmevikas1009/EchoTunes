import { useEffect, useState } from "react";
import AppLayout from "../components/AppLayout";
import axios from "axios";

const Dashboard = () => {
  const [data, setData] = useState(null);

  const newRelaeses = async () => {
    const options = {
      method: "GET",
      url: "https://spotify-web-api3.p.rapidapi.com/v1/social/spotify/homepage",
      headers: {
        "Content-Type": "application/json",
        "X-RapidAPI-Key": "e1b704054dmsh4f783964b0b5ba8p16250ajsn2d3afc5848e3",
        "X-RapidAPI-Host": "spotify-web-api3.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    newRelaeses();
  }, []);

  return (
    <AppLayout>
      <div className="h-[85%] bg-[#1a1a1a] flex-1 overflow-auto px-8 py-6 text-white rounded-lg mx-1 my-3">
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

        <h2 className="text-2xl font-bold mt-8">Trending now near you</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {data ? (
            data.map((i, index) => (
              <div
                key={index}
                className="bg-[#232323] rounded-lg  p-3 ms-4 mt-4"
              >
                <img
                  src={`${i.images[0].url}`}
                  alt=""
                  className="rounded-lg "
                />
                <p className="text-xl my-2 font-semibold">
                  {i.name.length > 15 ? i.name.slice(0, 15) : i.name}
                </p>
                <p className="text-sm">{i.artists[0].name}</p>
              </div>
            ))
          ) : (
            <h1>No Data</h1>
          )}
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
