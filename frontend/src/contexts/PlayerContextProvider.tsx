import React, { createContext, useState, useRef } from "react";
import { ToastContainer } from "react-toastify";

export const PlayerContext = createContext<{
  currentTrack: string | null;
  setCurrentTrack: React.Dispatch<React.SetStateAction<string | null>>;
}>({
  currentTrack: null,
  setCurrentTrack: () => {
    return;
  },
});

const PlayerContextProvider: React.FC = ({ children }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [currentTrack, setCurrentTrack] = useState<string | null>(null);
  const match = currentTrack?.match(/spotify:track:([\S]+)/);
  let trackId = null;
  if (match !== null && match !== undefined) {
    trackId = match[1];
  }

  return (
    <PlayerContext.Provider value={{ currentTrack, setCurrentTrack }}>
      {children}
      {trackId !== null && (
        <ToastContainer
          position="top-left"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover={false}
        />
      )}
      {trackId !== null && (
        <iframe
          id="player"
          ref={iframeRef}
          src={`https://open.spotify.com/embed/track/${trackId}`}
          width="100%"
          height="80"
          frameBorder="0"
          allowTransparency={true}
          allow="encrypted-media"
        ></iframe>
      )}
    </PlayerContext.Provider>
  );
};

export default PlayerContextProvider;
