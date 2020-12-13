import React, { useContext } from "react";
import { Col } from "react-bootstrap";
import { FaPlay } from "react-icons/fa";
import { IconContext } from "react-icons/lib";
import { MdAudiotrack } from "react-icons/md";
import { PlayerContext } from "../../contexts/PlayerContextProvider";
import { Item } from "../../pages/SearchResultPage";
import CustomImage from "../CustomImage";
import HoverIcon from "../HoverIcon";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TrackResults: React.FC<{ results: { items: Item["track"][] } }> = ({
  results,
}) => {
  const { setCurrentTrack } = useContext(PlayerContext);

  const playHandler = (track: string) => {
    setCurrentTrack(null);
    setCurrentTrack(track);
    toast.dark("click start button to play", {
      position: "top-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <>
      {results.items.length > 0 &&
        results.items.map((item) => {
          return (
            <>
              <Col xs="6" md="4" lg="3" className="p-2" key={item.id}>
                <div className="col-result">
                  <div className="col-result-content">
                    <p className="text-white ellipsis m-0 py-2">{item.name}</p>
                    {
                      <div className="image-wrapper">
                        {item.album &&
                        item.album.images &&
                        item.album.images.length > 0 ? (
                          <CustomImage
                            src={item.album.images[0].url}
                            alt=""
                          ></CustomImage>
                        ) : (
                          <IconContext.Provider value={{ size: "100%" }}>
                            <MdAudiotrack />
                          </IconContext.Provider>
                        )}
                        <div className="image-description">
                          {item.artists && item.artists.length > 0 && (
                            <p>{item.artists[0].name}</p>
                          )}
                          <p>
                            <HoverIcon
                              color="#00cc00"
                              hoverColor="#00ff00"
                              size="1.3rem"
                              hoverSize="1.8rem"
                            >
                              <FaPlay onClick={() => playHandler(item.uri)} />
                            </HoverIcon>
                          </p>
                        </div>
                      </div>
                    }
                  </div>
                </div>
              </Col>
            </>
          );
        })}
    </>
  );
};

export default TrackResults;
