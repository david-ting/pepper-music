import React, { useState, useEffect } from "react";
import { FaPepperHot } from "react-icons/fa";
import { IconContext } from "react-icons/lib";

const duration = 3000;

const LoadingPepper: React.FC = () => {
  const [sizes, setSizes] = useState<string[]>([
    "1.5rem",
    "1.5rem",
    "1.5rem",
    "1.5rem",
    "1.5rem",
  ]);

  useEffect(() => {
    let count = 0;

    const interval = setInterval(() => {
      let newSizes = ["1.5rem", "1.5rem", "1.5rem", "1.5rem", "1.5rem"];

      newSizes = sizes.map((size, index) => {
        if (index <= count) {
          return "1.7rem";
        } else {
          return "1.5rem";
        }
      });
      if (count === 4) {
        count = 0;
      } else {
        count++;
      }
      setSizes(newSizes);
    }, duration / 5);

    return () => {
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="pepper-loading-container">
      {sizes.map((size, index) => {
        return (
          <IconContext.Provider
            key={index}
            value={{ color: "red", size: size }}
          >
            <div className="pepper-loading">
              <FaPepperHot />
            </div>
          </IconContext.Provider>
        );
      })}
    </div>
  );
};

export default LoadingPepper;
