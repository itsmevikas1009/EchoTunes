import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { FaCheckCircle, FaCloudUploadAlt, FaLink } from "react-icons/fa";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import api from "../services/api";

const FileInput = ({
  name,
  label,
  value,
  icon,
  type,
  handleInputState,
  helperText,
}) => {
  const [progress, setProgress] = useState(0);
  const [progressShow, setProgressShow] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [manualUrl, setManualUrl] = useState(typeof value === "string" ? value : "");
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (typeof value === "string") {
      setManualUrl(value);
      setProgress(100);
      setProgressShow(true);
      return;
    }

    setProgress(0);
    setProgressShow(false);
    if (!value) {
      setManualUrl("");
    }
  }, [value]);

  const previewUrl = useMemo(() => {
    if (!value) {
      return "";
    }

    if (typeof value === "string") {
      return value;
    }

    return URL.createObjectURL(value);
  }, [value]);

  useEffect(() => {
    return () => {
      if (value && typeof value !== "string" && previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl, value]);

  const setAudioDurationFromUrl = (url) => {
    if (type !== "audio") {
      return;
    }

    const audio = new Audio(url);
    audio.addEventListener(
      "loadedmetadata",
      () => {
        const duration = Math.floor(audio.duration);
        if (!Number.isNaN(duration)) {
          handleInputState("duration", duration);
        }
      },
      false
    );
  };

  const handleUpload = async () => {
    if (!value || typeof value === "string" || isUploading) {
      return;
    }

    setUploadError("");
    setProgressShow(true);
    setProgress(0);
    setIsUploading(true);

    const formData = new FormData();
    formData.append("mediaType", type);
    formData.append("file", value);

    try {
      const response = await api.post("/upload/media", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        timeout: 120000,
        onUploadProgress: (event) => {
          if (!event.total) {
            return;
          }

          const uploaded = Math.floor((event.loaded / event.total) * 100);
          setProgress(uploaded);
        },
      });

      const uploadedUrl = response?.data?.url;

      if (!uploadedUrl) {
        throw new Error("Cloudinary upload did not return a media URL.");
      }

      handleInputState(name, uploadedUrl);
      setManualUrl(uploadedUrl);
      setUploadError("");
      setProgress(100);
      setAudioDurationFromUrl(uploadedUrl);
      toast.success(`${label} uploaded to Cloudinary.`);
    } catch (error) {
      console.log(error);
      setProgressShow(false);
      setProgress(0);

      const message =
        error?.response?.data?.message ||
        "Upload failed. You can paste a direct public URL instead.";

      setUploadError(message);
      toast.error(message);
    } finally {
      setIsUploading(false);
    }
  };

  const handleManualUrlApply = () => {
    const trimmedUrl = manualUrl.trim();

    if (!trimmedUrl) {
      toast.error(`Paste a valid ${type === "audio" ? "audio" : "image"} URL first.`);
      return;
    }

    handleInputState(name, trimmedUrl);
    setUploadError("");
    setProgressShow(true);
    setProgress(100);
    setAudioDurationFromUrl(trimmedUrl);
    toast.success(`${label} URL added.`);
  };

  return (
    <div className="space-y-4 rounded-[24px] border border-white/8 bg-white/[0.03] p-4">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm font-semibold text-white">{label}</p>
          <p className="mt-1 text-xs leading-6 text-white/50">
            {helperText ||
              `Upload directly to Cloudinary through the backend, or paste a public ${
                type === "audio" ? "audio stream/file" : "image"
              } URL.`}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <label
            htmlFor={name}
            className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-white/10 bg-white/8 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/12"
          >
            {icon || <FaCloudUploadAlt />}
            Select file
          </label>
          <input
            type="file"
            id={name}
            onChange={(e) => {
              const file = e.currentTarget.files?.[0] || null;
              handleInputState(name, file);
              setUploadError("");
              setProgress(0);
              setProgressShow(false);
            }}
            className="hidden"
          />

          {value !== null && typeof value !== "string" && !progressShow && (
            <button
              onClick={handleUpload}
              className="accent-button inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold transition duration-200"
              type="button"
            >
              <FaCloudUploadAlt />
              {isUploading ? "Uploading..." : "Upload"}
            </button>
          )}

          {progressShow && progress < 100 && (
            <div style={{ width: 48, height: 48 }}>
              <CircularProgressbar value={progress} text={`${progress}%`} />
            </div>
          )}

          {progress === 100 && (
            <div
              style={{ width: 48, height: 48 }}
              className="flex items-center justify-center text-[#ffd166]"
            >
              <FaCheckCircle size={28} />
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-3 lg:flex-row">
        <input
          type="url"
          value={manualUrl}
          onChange={(e) => setManualUrl(e.target.value)}
          placeholder={`Paste public ${type === "audio" ? "audio" : "image"} URL`}
          className="glass-card flex-1 rounded-2xl px-4 py-3 text-white outline-none placeholder:text-white/35"
        />
        <button
          onClick={handleManualUrlApply}
          className="muted-button inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
          type="button"
        >
          <FaLink />
          Use URL
        </button>
      </div>

      {uploadError && (
        <p className="rounded-2xl border border-amber-300/15 bg-amber-400/10 px-4 py-3 text-sm leading-6 text-amber-100">
          {uploadError}
        </p>
      )}

      {previewUrl && type === "image" && (
        <img
          height={120}
          width={120}
          className="h-28 w-28 rounded-2xl object-cover"
          src={previewUrl}
          alt="preview"
        />
      )}

      {previewUrl && type === "audio" && (
        <audio src={previewUrl} controls className="w-full" />
      )}
    </div>
  );
};

export default FileInput;
