import React from "react";
import Container from "react-bootstrap/Container";
import Jumbotron from "react-bootstrap/Jumbotron";
import MusicBars from "../components/MusicBars";
import SearchBar from "../components/SearchBar";

const SearchPage: React.FC = () => {
  document.title = "Search | Pepper Music";

  return (
    <Container fluid className="outer-container">
      <Container className="center-container">
        <MusicBars />
        <Jumbotron>
          <SearchBar />
        </Jumbotron>
      </Container>
    </Container>
  );
};

export default SearchPage;
