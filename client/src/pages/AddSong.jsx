import { useState } from "react";
import AppLayout from "../components/AppLayout";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";
import FileInput from "../components/FileInput";
import { FaMusic } from "react-icons/fa";
import axios from "axios";
import { server } from "../services/api";
import { toast } from "react-hot-toast";
const AddSong = () => {
  const [progress, setProgress] = useState(0);
  const [progressShow, setProgressShow] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const handleUpload = () => {
    setProgressShow(true);
    const fileName = new Date().getTime() + value.name;
    const storageRef = ref(
      storage,
      type === "audio" ? `/audio/${fileName}` : `/images/${fileName}`
    );
    const uploadTask = uploadBytesResumable(storageRef, value);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const uploaded = Math.floor(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(uploaded);
      },
      (error) => {
        console.log(error);
        toast.error("An error occured while uploading!");
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          handleInputState(name, url);
          if (type === "audio") {
            const audio = new Audio(url);
            audio.addEventListener(
              "loadedmetadata",
              () => {
                const duration = Math.floor(audio.duration);
                handleInputState("duration", duration);
              },
              false
            );
          }
        });
      }
    );
  };

  const [data, setData] = useState({
    name: "",
    artist: "",
    img: null,
    song: null,
    duration: 0,
  });

  // console.log(data);

  const handleInputState = (name, value) => {
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${server}/song/create`, data, {
        withCredentials: true,
      });
      console.log(res);
      toast.error(res.response.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AppLayout>
      <div className="h-full pb-20 bg-[#1a1a1a] flex-1 overflow-auto px-8 text-white rounded-lg mx-1 my-3">
        <div className="pt-6 pb-2">
          <Link to="/">
            {" "}
            <FaArrowLeft size={24} color="white" />
          </Link>
        </div>

        <div className="flex flex-col  gap-6 justify-center items-center">
          <h1 className="text-3xl font-bold mb-6">Add Song</h1>
          <div className="w-[60%] mx-auto flex flex-col justify-center">
            <form
              className="w-full my-6 flex flex-col gap-6 justify-center mb-12"
              onSubmit={handleSave}
            >
              <div>
                <label htmlFor="" className="block font-medium text-lg">
                  Song Name
                </label>
                <input
                  type="text"
                  placeholder="Song Name"
                  name="name"
                  onChange={(e) => handleInputState("name", e.target.value)}
                  value={data.name}
                  className="w-full p-3 rounded-lg outline-none  text-black border border-gray-300 px-4"
                />
              </div>

              <div>
                <label htmlFor="" className="block font-medium text-lg">
                  Artist
                </label>
                <input
                  type="text"
                  name="artist"
                  placeholder="Artist"
                  onChange={(e) => handleInputState("artist", e.target.value)}
                  value={data.artist}
                  className="w-full p-3 rounded-lg outline-none  text-black border border-gray-300 px-4"
                />
              </div>

              <div>
                <FileInput
                  label="Choose song"
                  icon={<FaMusic />}
                  type="audio"
                  name="song"
                  handleInputState={handleInputState}
                  value={data.song}
                />
              </div>

              <div>
                <FileInput
                  label="Choose image"
                  // icon={<ImageIcon />}
                  type="image"
                  name="img"
                  value={data.img}
                  handleInputState={handleInputState}
                />
              </div>

              <button className="w-full bg-green-500 rounded-lg p-3 mt-3 font-semibold text-lg text-black cursor-pointer">
                {false ? "Adding..." : "Add Song"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default AddSong;
