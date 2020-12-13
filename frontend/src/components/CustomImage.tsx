import React, { useState } from "react";
import CustomLoading from "./CustomLoading";

const CustomImage: React.FC<{
  src: string;
  alt: string;
  clickHandler?: () => void;
}> = ({ src, alt, clickHandler }) => {
  const [loading, setLoading] = useState(true);
  return (
    <>
      {loading && <CustomLoading />}
      <div className="image-container">
        <img
          className="image-fit"
          style={loading ? { opacity: "0.1" } : { opacity: "1" }}
          {...{ src, alt }}
          onLoad={(event) => {
            setLoading(false);
            if (clickHandler !== undefined)
              event.currentTarget.addEventListener("click", clickHandler);
          }}
        />
      </div>
    </>
  );
};

export default CustomImage;
