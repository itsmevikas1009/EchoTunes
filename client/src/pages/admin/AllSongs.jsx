import { useEffect, useMemo, useState } from "react";
import { Avatar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AiTwotoneDelete, AiTwotoneEdit } from "react-icons/ai";
import { IoClose } from "react-icons/io5";
import { FaPlus, FaMusic } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi2";
import toast from "react-hot-toast";
import AppLayout from "../../components/AppLayout";
import Table from "../../components/Table";
import FileInput from "../../components/FileInput";
import api from "../../services/api";
import { setAddAllSongs } from "../../redux/reducers/audioPlayer";
import { DEFAULT_SONG_COVER, fallbackImage } from "../../utils/media";

/* ─────────────────────── Edit Song Modal ─────────────────────── */
const EditSongModal = ({ song, onClose, onSave, saving }) => {
  const { user } = useSelector((state) => state.auth);
  const [form, setForm] = useState({
    name: "",
    artist: "",
    songUrl: "",
    imageUrl: "",
  });

  const isUserArtist = user?.isArtist && !user?.isAdmin;

  useEffect(() => {
    if (song) {
      setForm({
        name: song.name || "",
        artist: isUserArtist ? user.artistName : (song.artist || ""),
        songUrl: song.song || "",
        imageUrl: song.img || "",
      });
    }
  }, [song, user, isUserArtist]);

  if (!song) return null;

  return (
    <div className="fixed inset-0 z-[250] flex items-center justify-center bg-black/60 px-4 py-6 backdrop-blur-md">
      <div
        className="w-full max-w-2xl overflow-y-auto rounded-[32px] p-6 md:p-8"
        style={{
          background: "rgba(18, 13, 24, 0.98)",
          border: "1px solid rgba(255,255,255,0.1)",
          boxShadow: "0 40px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,133,82,0.08)",
          backdropFilter: "blur(30px)",
          maxHeight: "90vh",
        }}
      >
        {/* Header */}
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <span
              className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-widest"
              style={{ background: "rgba(255,133,82,0.15)", color: "#ff8552" }}
            >
              <AiTwotoneEdit size={12} /> Edit Song
            </span>
            <h3 className="hero-title mt-2 text-2xl font-bold text-white md:text-3xl">
              Update track details
            </h3>
            <p className="mt-1 text-xs text-white/50 md:text-sm">
              Upload a new file or paste a URL to replace existing media.
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-2 text-white/60 transition hover:bg-white/10 hover:text-white"
            type="button"
          >
            <IoClose size={22} />
          </button>
        </div>

        <div className="space-y-4">
          {/* Name + Artist */}
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-semibold text-white/70">Song name</label>
              <input
                value={form.name}
                onChange={(e) => setForm((c) => ({ ...c, name: e.target.value }))}
                placeholder="Song title"
                className="w-full rounded-2xl px-4 py-3 text-white outline-none placeholder:text-white/30 transition"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-white/70">Artist</label>
              <input
                value={form.artist}
                onChange={(e) => setForm((c) => ({ ...c, artist: e.target.value }))}
                placeholder="Artist name"
                disabled={isUserArtist}
                className={`w-full rounded-2xl px-4 py-3 text-white outline-none placeholder:text-white/30 transition ${isUserArtist ? 'opacity-50 cursor-not-allowed' : ''}`}
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              />
            </div>
          </div>

          {/* Song file / URL */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-white/70">
              Song file
            </label>
            <FileInput
              label="Replace song"
              icon={<FaMusic />}
              type="audio"
              name="songUrl"
              handleInputState={(_, val) => setForm((c) => ({ ...c, songUrl: val }))}
              value={form.songUrl}
              helperText="Upload a new audio file or paste a direct MP3/stream URL."
            />
          </div>

          {/* Cover image / URL */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-white/70">
              Cover image
            </label>
            <FileInput
              label="Replace image"
              type="image"
              name="imageUrl"
              handleInputState={(_, val) => setForm((c) => ({ ...c, imageUrl: val }))}
              value={form.imageUrl}
              helperText="Upload new cover art or paste a public image URL."
            />
          </div>

          {/* Live preview */}
          <div
            className="flex items-center gap-4 rounded-[20px] p-4"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            <img
              src={form.imageUrl || DEFAULT_SONG_COVER}
              alt={form.name || "Song preview"}
              className="h-16 w-16 rounded-xl object-cover"
              onError={(e) => fallbackImage(e, DEFAULT_SONG_COVER)}
            />
            <div className="min-w-0">
              <p className="truncate font-bold text-white">{form.name || "Untitled song"}</p>
              <p className="truncate text-sm text-white/50">{form.artist || "Unknown artist"}</p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 flex flex-wrap justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded-full px-5 py-2.5 text-sm font-semibold text-white/70 transition hover:bg-white/8 hover:text-white"
            style={{ border: "1px solid rgba(255,255,255,0.1)" }}
            type="button"
          >
            Cancel
          </button>
          <button
            onClick={() =>
              onSave(song._id, {
                name: form.name,
                artist: form.artist,
                song: form.songUrl,
                img: form.imageUrl,
                duration: song.duration || 0,
              })
            }
            className="accent-button rounded-full px-6 py-2.5 text-sm font-bold transition"
            disabled={saving}
            type="button"
          >
            {saving ? "Saving…" : "Save changes"}
          </button>
        </div>
      </div>
    </div>
  );
};

/* ─────────────────────── Add Song Modal ─────────────────────── */
const AddSongModal = ({ onClose, onAdded }) => {
  const { user } = useSelector((state) => state.auth);
  const isUserArtist = user?.isArtist && !user?.isAdmin;
  const [form, setForm] = useState({
    name: "",
    artist: isUserArtist ? user.artistName : "",
    img: null,
    song: null,
    duration: 0,
  });
  const [adding, setAdding] = useState(false);

  const handleState = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) {
      toast.error("Song name is required.");
      return;
    }
    if (!form.song) {
      toast.error("Please provide a song file or URL.");
      return;
    }
    setAdding(true);
    try {
      const res = await api.post("/song/create", form);
      toast.success(res.message || "Song added!");
      onAdded();
      onClose();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to add song.");
    } finally {
      setAdding(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[250] flex items-center justify-center bg-black/70 px-3 py-4 backdrop-blur-md md:px-6 md:py-8">
      <div
        className="w-full max-w-2xl overflow-y-auto rounded-3xl p-5 md:rounded-[32px] md:p-8"
        style={{
          background: "rgba(18, 13, 24, 0.98)",
          border: "1px solid rgba(255,255,255,0.1)",
          boxShadow: "0 40px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,209,102,0.06)",
          backdropFilter: "blur(30px)",
          maxHeight: "92vh",
        }}
      >
        {/* Header */}
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <span
              className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-widest"
              style={{ background: "rgba(255,209,102,0.15)", color: "#ffd166" }}
            >
              <HiSparkles size={12} /> New Track
            </span>
            <h3 className="hero-title mt-3 text-3xl font-bold text-white">
              Add a new song
            </h3>
            <p className="mt-1 text-sm text-white/50">
              Upload files or paste public URLs below.
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-2 text-white/60 transition hover:bg-white/10 hover:text-white"
            type="button"
          >
            <IoClose size={22} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name + Artist */}
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-semibold text-white/70">
                Song name <span className="text-[#ff8552]">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Blinding Lights"
                value={form.name}
                onChange={(e) => handleState("name", e.target.value)}
                className="w-full rounded-2xl px-4 py-3 text-white outline-none placeholder:text-white/30 transition"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-white/70">Artist</label>
              <input
                type="text"
                placeholder="e.g. The Weeknd"
                value={form.artist}
                onChange={(e) => handleState("artist", e.target.value)}
                disabled={isUserArtist}
                className={`w-full rounded-2xl px-4 py-3 text-white outline-none placeholder:text-white/30 transition ${isUserArtist ? 'opacity-50 cursor-not-allowed' : ''}`}
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              />
            </div>
          </div>

          {/* Song file */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-white/70">
              Song file <span className="text-[#ff8552]">*</span>
            </label>
            <FileInput
              label="Choose song"
              icon={<FaMusic />}
              type="audio"
              name="song"
              handleInputState={handleState}
              value={form.song}
              helperText="Upload an MP3/audio file or paste a direct stream URL."
            />
          </div>

          {/* Cover image */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-white/70">Cover image</label>
            <FileInput
              label="Choose image"
              type="image"
              name="img"
              value={form.img}
              handleInputState={handleState}
              helperText="Upload cover art or paste a public image URL. Defaults to a placeholder if empty."
            />
          </div>

          {/* Live preview */}
          {(form.name || form.img) && (
            <div
              className="flex items-center gap-3 rounded-2xl p-3 md:gap-4 md:p-4"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              <img
                src={typeof form.img === "string" ? form.img : DEFAULT_SONG_COVER}
                alt="preview"
                className="h-10 w-10 rounded-lg object-cover md:h-14 md:w-14 md:rounded-xl"
                onError={(e) => fallbackImage(e, DEFAULT_SONG_COVER)}
              />
              <div className="min-w-0">
                <p className="truncate text-sm font-bold text-white md:text-base">{form.name || "Untitled song"}</p>
                <p className="truncate text-[10px] text-white/50 md:text-sm">{form.artist || "Unknown artist"}</p>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-wrap justify-end gap-3 pt-2">
            <button
              onClick={onClose}
              type="button"
              className="rounded-full px-5 py-2.5 text-sm font-semibold text-white/70 transition hover:bg-white/8 hover:text-white"
              style={{ border: "1px solid rgba(255,255,255,0.1)" }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="accent-button inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-bold transition"
              disabled={adding}
            >
              <FaPlus size={13} />
              {adding ? "Publishing…" : "Publish song"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

/* ─────────────────────── Stat Card ─────────────────────── */
const StatCard = ({ label, value, sub, accent }) => (
  <div
    className="relative overflow-hidden rounded-[26px] p-5 transition hover:scale-[1.01]"
    style={{
      background: "rgba(255,255,255,0.04)",
      border: "1px solid rgba(255,255,255,0.08)",
      boxShadow: "0 12px 30px rgba(0,0,0,0.18)",
    }}
  >
    <div
      className="absolute -right-8 -top-8 h-28 w-28 rounded-full opacity-10"
      style={{ background: accent || "rgba(255,133,82,0.6)", filter: "blur(24px)" }}
    />
    <p className="text-xs font-bold uppercase tracking-[0.22em]" style={{ color: accent || "#ff8552" }}>
      {label}
    </p>
    <p className="hero-title mt-3 text-4xl font-bold text-white">{value}</p>
    <p className="mt-2 text-sm text-white/45">{sub}</p>
  </div>
);

/* ─────────────────────── AllSongs Page ─────────────────────── */
const AllSongs = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { addAllSongs } = useSelector((state) => state.audioPlayer);
  const [editingSong, setEditingSong] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [saving, setSaving] = useState(false);

  const isUserArtist = user?.isArtist && !user?.isAdmin;

  const fetchSongs = async () => {
    try {
      const url = isUserArtist ? `/song/get?artist=${encodeURIComponent(user.artistName)}` : "/song/get";
      const response = await api.get(url);
      if (response.success && response.data) {
        dispatch(setAddAllSongs(response.data));
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to load songs.");
    }
  };

  useEffect(() => {
    fetchSongs();
  }, [dispatch]);

  const deleteRow = async (id) => {
    try {
      const res = await api.delete(`/song/delete/${id}`);
      if (res.success && res.data) {
        dispatch(setAddAllSongs(res.data));
        toast.success("Song deleted.");
      }
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.message || "Failed to delete song.");
    }
  };

  const handleSaveEdit = async (id, payload) => {
    setSaving(true);
    try {
      const res = await api.put(`/song/update/${id}`, payload);
      if (res.success) {
        const updatedSongs = addAllSongs.map((song) =>
          song._id === id ? res.data : song
        );
        dispatch(setAddAllSongs(updatedSongs));
        setEditingSong(null);
        toast.success(res.message || "Song updated.");
      }
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Failed to update song.");
    } finally {
      setSaving(false);
    }
  };

  const rows = useMemo(
    () =>
      addAllSongs?.map((song) => ({
        ...song,
        id: song._id,
      })) || [],
    [addAllSongs]
  );

  const uniqueArtists = useMemo(
    () => new Set(addAllSongs?.map((s) => s.artist?.trim()).filter(Boolean)).size,
    [addAllSongs]
  );

  const columns = [
    {
      field: "serial",
      headerName: "#",
      renderCell: ({ row }) => (
        <span className="text-sm font-semibold text-white/50">{row.serial}</span>
      ),
    },
    {
      field: "avatar",
      headerName: "Cover",
      renderCell: ({ row }) => (
        <Avatar
          alt={row.name}
          src={row.img}
          imgProps={{ onError: (e) => fallbackImage(e, DEFAULT_SONG_COVER) }}
          sx={{ height: 44, width: 44, borderRadius: "12px" }}
          variant="rounded"
        />
      ),
    },
    { field: "name", headerName: "Song Name" },
    { field: "artist", headerName: "Artist" },
    {
      field: "song",
      headerName: "Media",
      renderCell: ({ row }) => (
        <a
          href={row.song}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition"
          style={{
            background: "rgba(255,209,102,0.1)",
            color: "#ffd166",
            border: "1px solid rgba(255,209,102,0.2)",
          }}
          title={row.song}
        >
          <FaMusic size={10} /> Open
        </a>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      renderCell: ({ row }) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => setEditingSong(row)}
            className="rounded-full p-2 text-white/60 transition hover:bg-white/10 hover:text-white"
            title="Edit"
            type="button"
          >
            <AiTwotoneEdit size={17} />
          </button>
          <button
            onClick={() => deleteRow(row.id)}
            className="rounded-full p-2 text-white/50 transition hover:bg-red-500/15 hover:text-red-400"
            title="Delete"
            type="button"
          >
            <AiTwotoneDelete size={17} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <AppLayout>
      <div className="page-enter space-y-6">

        {/* ── Page header ── */}
        <div
          className="relative overflow-hidden rounded-[32px] p-6 md:p-8"
          style={{
            background:
              "linear-gradient(135deg, rgba(255,133,82,0.18) 0%, rgba(255,209,102,0.1) 50%, rgba(255,255,255,0.04) 100%)",
            border: "1px solid rgba(255,255,255,0.09)",
            boxShadow: "0 24px 50px rgba(0,0,0,0.22)",
          }}
        >
          <div
            className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full opacity-25"
            style={{ background: "rgba(255,133,82,0.5)", filter: "blur(60px)" }}
          />
          <div
            className="pointer-events-none absolute -bottom-12 left-10 h-40 w-40 rounded-full opacity-15"
            style={{ background: "rgba(255,209,102,0.6)", filter: "blur(50px)" }}
          />
          <div className="relative flex flex-wrap items-center justify-between gap-5">
            <div>
              <span className="eyebrow">Admin Catalog</span>
              <h1 className="hero-title mt-3 text-4xl font-bold text-white md:text-5xl">
                All Songs
              </h1>
              <p className="mt-2 text-sm text-white/55">
                Manage your entire music library — edit, delete, or publish new tracks.
              </p>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="accent-button inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold transition"
              type="button"
            >
              <FaPlus size={14} />
              Add new song
            </button>
          </div>
        </div>

        {/* ── Stats ── */}
        <div className="grid gap-4 sm:grid-cols-3">
          <StatCard
            label="Total tracks"
            value={rows.length}
            sub="Songs in the catalog"
            accent="#ff8552"
          />
          <StatCard
            label="Artists"
            value={uniqueArtists}
            sub="Unique artists represented"
            accent="#ffd166"
          />
          <StatCard
            label="Quick actions"
            value="Edit / Delete"
            sub="Inline without leaving the page"
            accent="#a78bfa"
          />
        </div>

        {/* ── Table ── */}
        <Table heading="Track Library" columns={columns} rows={rows} pageSize={8} />

        {/* ── Modals ── */}
        {showAddModal && (
          <AddSongModal
            onClose={() => setShowAddModal(false)}
            onAdded={fetchSongs}
          />
        )}

        <EditSongModal
          song={editingSong}
          onClose={() => setEditingSong(null)}
          onSave={handleSaveEdit}
          saving={saving}
        />
      </div>
    </AppLayout>
  );
};

export default AllSongs;
