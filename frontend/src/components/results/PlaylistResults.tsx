import React from "react";
import { Col } from "react-bootstrap";
import { IconContext } from "react-icons/lib";
import { RiPlayListLine } from "react-icons/ri";
import { useHistory } from "react-router-dom";
import { Item } from "../../pages/SearchResultPage";
import CustomImage from "../CustomImage";

const PlaylistResults: React.FC<{
  results: { items: Item["playlist"][] };
  my?: boolean;
}> = ({ results, my }) => {
  const history = useHistory();

  const clickHandler = (id: string) => {
    if (my === true) {
      history.push(`/myPlaylist/${id}`);
    } else {
      history.push(`/search/playlist/tracks/${id}`);
    }
  };

  return (
    <>
      {results.items.length > 0 &&
        results.items.map((item) => {
          return (
            <Col xs="6" md="4" lg="3" className="p-2" key={item.id}>
              <div className="col-result">
                <div className="col-result-content">
                  <p className="text-white m-0 py-2 ellipsis">{item.name}</p>
                  {item.images && item.images.length > 0 ? (
                    <>
                      <CustomImage
                        src={item.images[0].url}
                        alt=""
                        clickHandler={() => clickHandler(item.id)}
                      ></CustomImage>
                    </>
                  ) : (
                    <IconContext.Provider value={{ size: "100%" }}>
                      <RiPlayListLine onClick={() => clickHandler(item.id)} />
                    </IconContext.Provider>
                  )}
                </div>
              </div>
            </Col>
          );
        })}
    </>
  );
};

export default PlaylistResults;
