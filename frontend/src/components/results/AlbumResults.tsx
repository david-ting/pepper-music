import React from "react";
import { Col } from "react-bootstrap";
import { Item } from "../../pages/SearchResultPage";
import { IconContext } from "react-icons/lib";
import { RiAlbumFill } from "react-icons/ri";
import CustomImage from "../CustomImage";
import { useHistory } from "react-router-dom";

const AlbumResults: React.FC<{ results: { items: Item["album"][] } }> = ({
  results,
}) => {
  const history = useHistory();

  const clickHandler = (id: string) => {
    history.push(`/search/album/tracks/${id}`);
  };

  return (
    <>
      {" "}
      {results.items.length > 0 &&
        results.items.map((item) => {
          return (
            <Col xs="6" md="4" lg="3" className="p-2" key={item.id}>
              <div className="col-result">
                <div className="col-result-content">
                  <p className="text-white m-0 py-2 ellipsis">{item.name}</p>
                  {item.images && item.images.length > 0 ? (
                    <CustomImage
                      src={item.images[0].url}
                      alt=""
                      clickHandler={() => clickHandler(item.id)}
                    ></CustomImage>
                  ) : (
                    <IconContext.Provider value={{ size: "100%" }}>
                      <RiAlbumFill onClick={() => clickHandler(item.id)} />
                    </IconContext.Provider>
                  )}
                  {item.artists && item.artists.length > 0 && (
                    <p
                      className="m-0 py-2 ellipsis"
                      style={{ color: "gray", fontStyle: "italic" }}
                    >
                      {item.artists[0].name}
                    </p>
                  )}
                </div>
              </div>
            </Col>
          );
        })}
    </>
  );
};

export default AlbumResults;
