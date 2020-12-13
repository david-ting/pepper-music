import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import AlbumResults from "../components/results/AlbumResults";
import { fetchDataFunc } from "../customFunc/fetchData";

const ArtistPage: React.FC = () => {
  const [artist, setArtist] = useState<any>(null);
  const [albums, setAlbums] = useState<any>(null);
  const { id } = useParams() as { id: string };

  useEffect(() => {
    if (id !== "") {
      (async () => {
        try {
          const data = await fetchDataFunc("artists", id);
          setArtist(data);
        } catch (error) {
          console.error(error);
        }
      })();

      (async () => {
        try {
          const data = await fetchDataFunc("artists_albums", id);
          setAlbums(data);
        } catch (error) {
          console.error(error);
        }
      })();
    }
  }, [id]);

  return (
    <Container fluid className="artist-container">
      {artist && (
        <Container className="pt-5" style={{ height: "100%" }}>
          <Row style={{ height: "100%" }}>
            <Col
              style={{ height: "100%" }}
              className="artist-info"
              xs={12}
              md={3}
            >
              {artist.images && artist.images.length > 1 && (
                <img
                  src={artist.images[0].url}
                  width={180}
                  height={180}
                  style={{ objectFit: "cover", borderRadius: "50%" }}
                ></img>
              )}
              {artist.name && (
                <h5 className="text-white my-3">{artist.name}</h5>
              )}
              {artist.genres && artist.genres.length > 1 && (
                <div className="genres-container">
                  {artist.genres.map((g: string) => (
                    <div key={g} className="badge badge-secondary">
                      {g}
                    </div>
                  ))}
                </div>
              )}
            </Col>
            {albums && (
              <Col xs={12} md={9} className="text-white artist-albums">
                <Container>
                  <Row>
                    <AlbumResults results={albums} />
                  </Row>
                </Container>
              </Col>
            )}
          </Row>
        </Container>
      )}
    </Container>
  );
};

export default ArtistPage;
