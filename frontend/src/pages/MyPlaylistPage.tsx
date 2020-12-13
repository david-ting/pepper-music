import React, { useState, useEffect, useContext } from "react";
import { Container, Row } from "react-bootstrap";
import LoadingPepper from "../components/LoadingPepper";
import PlaylistResults from "../components/results/PlaylistResults";
import { UserContext } from "../contexts/UserContextProvider";
import { fetchDataFunc } from "../customFunc/fetchData";

const MyPlaylistPage: React.FC = () => {
  document.title = "My Playlist | Pepper Music";

  const [results, setResults] = useState<any>(null);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const id = user.userID;

    if (id !== "") {
      (async () => {
        try {
          const data = await fetchDataFunc("myPlaylist", id);
          setResults(data);
        } catch (error) {
          console.error(error);
        }
      })();
    }
  }, [user]);

  return (
    <Container fluid className="outer-container">
      {results === null && (
        <Container className="center-container">
          <LoadingPepper />
        </Container>
      )}
      {results !== null && (
        <Container className="pt-4">
          <Row>
            {results && <PlaylistResults results={results} my={true} />}
          </Row>
        </Container>
      )}
    </Container>
  );
};

export default MyPlaylistPage;
