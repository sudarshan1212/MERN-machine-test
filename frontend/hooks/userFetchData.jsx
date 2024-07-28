import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { BASE_URL } from "../../config";

const useFetchdata = (url) => {
  console.log(url);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const userInfo = useSelector((state) => state.bazar.userInfo);
  console.log(userInfo);
  useEffect(() => {
    const getProfile = async () => {
      setLoading(true);
      //   console.log(url);
      try {
        const config = {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        };
        const data = await axios.get(url, config);
        //   if (!data.ok) {
        //     throw new Error(data.message + "error");
        //   }
        // console.log(data.data);
        setData(data.data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        console.log(err);
      }
    };
    getProfile();
  }, [url, userInfo.token]);

  return {
    data,
    loading,
  };
};

export default useFetchdata;
