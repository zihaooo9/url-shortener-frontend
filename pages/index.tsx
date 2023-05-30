import { useState, ChangeEvent } from "react";
import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
});

export default function Home() {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortenedUrl, setShortenedUrl] = useState("");

  const handleShorten = async () => {
    try {
      const response = await api.post("/url/create", { url: originalUrl });
      const shortenedUrl = response.data.shortenedUrl;
      setShortenedUrl(`${window.location.origin}/${shortenedUrl}`);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUrlChange = (event: ChangeEvent<HTMLInputElement>) => {
    setOriginalUrl(event.target.value);
  };

  return (
    <>
      <div className="bg-blue-200 h-screen flex flex-col items-center">
        <h1 className="bg-clip-text py-7 text-6xl font-extrabold tracking-wide sm:text-6xl mt-8">
          URL_SHORTENER
        </h1>
        <input
          type="text"
          value={originalUrl}
          onChange={handleUrlChange}
          placeholder="Enter URL"
        />
        <button className="bg-sky-500/100" onClick={handleShorten}>Shorten</button>
        {shortenedUrl && (
          <div>
            <a href={shortenedUrl} target="_blank" rel="noopener noreferrer">
              {shortenedUrl}
            </a>
          </div>
        )}
      </div>
    </>
  );
}
