import { useState } from "react";
import { SERVER_URL, URLS } from "../constants";
import axios from "axios";

export default function useSignUp() {
  const [email, setEmail] = useState("");
  const [successfullRegistration, setSuccessfullRegistration] = useState(false);
  const [isVerified, setisVerified] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const register = async ({ payload }) => {
    try {
      console.log(payload, "hooks");
      setLoading(true);
      const { data } = await axios.post(
        SERVER_URL + URLS.AUTH + "/register",
        payload
      );
      setEmail(payload.email);
      if (data.msg === "Succes") setSuccessfullRegistration(true);
    } catch (e) {
      const msg = e ? e.message : "Create API Failed";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const verify = async ({ payload }) => {
    try {
      setLoading(true);
     const verify =  await axios.post(SERVER_URL +URLS.AUTH + "/verify", payload)
     setisVerified(verify);
    }
   
    catch (e) {
      const msg = e ? e.message : "Create API Failed";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };
  const regenerate = async ({ payload }) => {
    try {
      setLoading(true);
      await axios.post(SERVER_URL +URLS.AUTH + "/regenerate", payload);
      setEmail(payload.email);
    } catch (e) {
      const msg = e ? e.message : "Create API Failed";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return {
    email,
    error,
    loading,
    successfullRegistration,
    isVerified,
    register,
    verify,
    regenerate,
  };
}
