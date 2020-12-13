import React, { useEffect } from "react";
import { Row } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import SearchBar from "../components/SearchBar";
import useSearch from "../customHook/useSearch";
import CustomPagination from "../components/CustomPagination";
import { Page } from "../customHook/useSearch";
import TrackResults from "../components/results/TrackResults";
import AlbumResults from "../components/results/AlbumResults";
import ArtistResults from "../components/results/ArtistResults";
import PlaylistResults from "../components/results/PlaylistResults";
import LoadingPepper from "../components/LoadingPepper";

interface CommonItem {
  name: string;
  id: string;
}

interface Artist extends CommonItem {
  images: { height: number; url: string; width: number }[];
}

interface Track extends CommonItem {
  uri: string;
  album: {
    images: { height: number; url: string; width: number }[];
  };
  artists: { name: string }[];
}

interface Album extends CommonItem {
  images: { height: number; url: string; width: number }[];
  artists: {
    external_urls: { spotify: string };
    href: string;
    id: string;
    name: string;
    type: string;
    uri: string;
  }[];
}

interface Playlist extends CommonItem {
  images: { height: number; url: string; width: number }[];
}

export interface Item {
  track: Track;
  album: Album;
  artist: Artist;
  playlist: Playlist;
}

const SearchResultPage: React.FC<{
  searchType: "track" | "album" | "artist" | "playlist";
}> = ({ searchType }) => {
  const [query, results, pageData, loading] = useSearch(searchType) as [
    query: string | null,
    results: { items: Item[typeof searchType][] } | null,
    pageData: Page | null,
    loading: boolean
  ];

  document.title = ` ${query + " | "}  search ${searchType} | Pepper Music`;

  return (
    <Container fluid className="outer-container">
      <Container style={{ paddingBottom: "100px" }}>
        <div className="mb-3 sticky-bar">
          <SearchBar />
        </div>
        {loading && <LoadingPepper />}
        {results !== null && !loading && (
          <>
            <Row>
              {searchType === "track" && (
                <TrackResults
                  results={results as { items: Item[typeof searchType][] }}
                />
              )}
              {searchType === "album" && (
                <AlbumResults
                  results={results as { items: Item[typeof searchType][] }}
                />
              )}
              {searchType === "artist" && (
                <ArtistResults
                  results={results as { items: Item[typeof searchType][] }}
                />
              )}
              {searchType === "playlist" && (
                <PlaylistResults
                  results={results as { items: Item[typeof searchType][] }}
                />
              )}
            </Row>
            {results.items.length === 0 && (
              <>
                <h3 className="text-white">
                  No results found for &quot;{query}&quot;
                </h3>
                <h4 className="text-white">
                  Please check the spelling of the words or search other words
                </h4>
              </>
            )}
            {pageData !== null && (
              <div className="d-flex justify-content-center mt-3">
                <CustomPagination
                  currentPage={pageData.currentPage}
                  totalPages={pageData.totalPages}
                  path={pageData.path}
                />
              </div>
            )}
          </>
        )}
      </Container>
    </Container>
  );
};

export default SearchResultPage;
