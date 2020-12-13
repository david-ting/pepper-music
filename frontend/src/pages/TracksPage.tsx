import React, { useEffect, useContext, useState } from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import LoadingPepper from "../components/LoadingPepper";
import { PlayerContext } from "../contexts/PlayerContextProvider";

const TracksPage: React.FC<{ type: "album" | "playlist" }> = ({ type }) => {
  document.title = `${type} tracks | Pepper Music`;

  const { id } = useParams() as { id: string };

  const { setCurrentTrack } = useContext(PlayerContext);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setCurrentTrack(null);
  }, [setCurrentTrack]);

  return (
    <Container fluid className="outer-container">
      <Container className="center-container py-5">
        {loading && (
          <div className="my-3">
            <LoadingPepper />
          </div>
        )}
        <iframe
          src={`https://open.spotify.com/embed/${type}/${id}`}
          width="100%"
          height="600px"
          frameBorder="0"
          allowTransparency={true}
          allow="encrypted-media"
          onLoad={() => {
            setLoading(false);
          }}
        ></iframe>
      </Container>
    </Container>
  );
};

export default TracksPage;
