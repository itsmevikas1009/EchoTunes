import { useRef, useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
// import { CircularProgress } from "@mui/material";
import toast from "react-hot-toast";
// import storage from "../../../firebase";
// import Button from "../../Button";
// import BackupIcon from "@mui/icons-material/Backup";
// import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { FaCheckCircle } from "react-icons/fa";
import storage from "../firebase"
import { FaCloudUploadAlt } from "react-icons/fa";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';


const FileInput = ({
    name,
    label,
    value,
    icon,
    type,
    handleInputState,
    ...rest
}) => {

    const inputRef = useRef();
    const [progress, setProgress] = useState(0);
    const [progressShow, setProgressShow] = useState(false);

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

    return (
        <div className="flex items-center justify-between px-6 border rounded-lg p-1">
            <label htmlFor={name} className="border p-2 rounded-md">{label}</label>
            <input
                type="file"
                id={name}
                onChange={(e) => handleInputState(name, e.currentTarget.files[0])}
                vlaue={value}
                {...rest}
                className="hidden"
            />

            {type === "image" && value && (
                <img height={100} width={100} className="object-contain rounded-md"
                    src={typeof value === "string" ? value : URL.createObjectURL(value)}
                    alt="file"
                />
            )}
            {type === "audio" && value && (
                <audio
                    src={typeof value === "string" ? value : URL.createObjectURL(value)}
                    controls
                />
            )}

            {value !== null && !progressShow && typeof value !== "string" && (

                <button
                    onClick={handleUpload}
                    className="pr-2"
                ><FaCloudUploadAlt size={28} />
                </button>
            )}
            {progressShow && progress < 100 && (
                <div style={{ width: 50, height: 50 }}>
                    <CircularProgressbar value={progress} text={`${progress}%`} />;
                </div>
            )}
            {progress === 100 && (
                <div className="">
                    <FaCheckCircle size={30} />
                </div>
            )}
        </div>
    );
};

export default FileInput;
