import axios from "axios";
import { useRouter } from "next/router";
import { NextResponse } from "next/server";
import { use, useEffect, useState } from "react";

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  })

const Url = () => {
  const router = useRouter();
  const { url } = router.query;

  const getFullLink = async () => {
    try {
      const response = await api.post('/url/fullUrl', {
        shortenedUrl: url,
      });
      console.log("shortened::::", url);
      console.log("full::::", response.data.originalUrl);
      if (response.data.originalUrl) {
        window.location.replace(response.data.originalUrl);
        return {
          redirect: {
            destination: response.data.originalUrl,
            permanent: false,
          },
        };
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!router.isReady) return;
    getFullLink();
  }, [router.isReady]);


  return null;
}

export default Url;