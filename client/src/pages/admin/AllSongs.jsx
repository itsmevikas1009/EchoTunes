import React, { useEffect, useState } from "react";
import AppLayout from "../../components/AppLayout";
import { Avatar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Table from "../../components/Table";
import { AiTwotoneDelete } from "react-icons/ai";
import { server } from "../../services/api";
import axios from "axios";
import { setAddAllSongs } from "../../redux/reducers/audioPlayer";

const columns = [
  {
    field: "id",
    headerName: "ID",
    headerClassName: "table-header",
    width: 250,
  },
  {
    field: "name",
    headerName: "Song Name",
    headerClassName: "table-header",
    width: 220,
  },
  {
    field: "avatar",
    headerName: "Image",
    headerClassName: "table-header",
    width: 150,
    renderCell: (params) => (
      <Avatar alt={params.row.name} src={params.row.img} />
    ),
  },
  {
    field: "artist",
    headerName: "Artist",
    headerClassName: "table-header",
    width: 250,
  },
  {
    field: "delete",
    headerName: "Delete",
    headerClassName: "table-header",
    width: 112,
    renderCell: (params) => (
      <AiTwotoneDelete
        size={24}
        className="hover:text-red-500 mt-4"
        alt={params.row.name}
      />
    ),
  },
];

const AllSongs = () => {
  const dispatch = useDispatch();

  const { isPlaying, addAllSongs } = useSelector((state) => state.audioPlayer);

  const [rows, setRows] = useState([]);

  const allSongsFetch = async () => {
    try {
      const response = await axios.get(`${server}/song/get`, {
        withCredentials: true,
      });

      if (response.status === 200) {
        dispatch(setAddAllSongs(response.data.data));
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    allSongsFetch();
  }, []);

  useEffect(() => {
    setRows(
      addAllSongs?.map((i) => ({
        ...i,
        id: i._id,
      }))
    );
  }, []);

  return (
    <AppLayout>
      <div
        className={`bg-[#1a1a1a] flex-1 overflow-auto text-white rounded-lg mx-1 my-3 ${
          isPlaying ? "h-[85%]" : "h-[95%]"
        }`}
      >
        <Table heading={"All Songs"} columns={columns} rows={rows} />
      </div>
    </AppLayout>
  );
};

export default AllSongs;
