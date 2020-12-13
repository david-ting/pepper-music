import React from "react";
import { Col } from "react-bootstrap";
import { BsFillPersonFill } from "react-icons/bs";
import { IconContext } from "react-icons/lib";
import { useHistory } from "react-router-dom";
import { Item } from "../../pages/SearchResultPage";
import CustomImage from "../CustomImage";

const ArtistResults: React.FC<{ results: { items: Item["artist"][] } }> = ({
  results,
}) => {
  const history = useHistory();

  const clickHandler = (id: string) => {
    history.push(`/search/artist/${id}`);
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
                    <CustomImage
                      src={item.images[0].url}
                      alt=""
                      clickHandler={() => clickHandler(item.id)}
                    ></CustomImage>
                  ) : (
                    <IconContext.Provider value={{ size: "100%" }}>
                      <BsFillPersonFill onClick={() => clickHandler(item.id)} />
                    </IconContext.Provider>
                  )}
                  )
                </div>
              </div>
            </Col>
          );
        })}
    </>
  );
};

export default ArtistResults;
