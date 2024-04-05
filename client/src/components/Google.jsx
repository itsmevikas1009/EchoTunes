import React from 'react'
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import toast from "react-hot-toast"
import { app } from '../firebase';
import { server } from "../services/api"
import axios from "axios";
import { useNavigate } from "react-router-dom";


const Google = () => {
    const auth = getAuth(app);
    const navigate = useNavigate();


    const handleGoogleClick = async () => {
        const provider = new GoogleAuthProvider()
        provider.setCustomParameters({ prompt: 'select_account' })
        try {
            const resultsFromGoogle = await signInWithPopup(auth, provider)

            const data = {
                name: resultsFromGoogle.user.displayName,
                email: resultsFromGoogle.user.email,
                // googlePhotoUrl: resultsFromGoogle.user.photoURL,
            }

            const res = await axios.post(`${server}/google`, data, { withCredentials: true });
            console.log(res);

            if (res.data.success === true) {
                // dispatch(signInSuccess(res.data.rest));
                toast.success("Login Successfully");
                navigate("/");
            }
        } catch (error) {
            console.log(error || "Something Went Wrong !");
        }
    }

    return (
        <button className="w-full bg-green-500 rounded-lg p-3  font-semibold text-lg" onClick={handleGoogleClick}>
            Login With Google
        </button>
    )
}

export default Google
