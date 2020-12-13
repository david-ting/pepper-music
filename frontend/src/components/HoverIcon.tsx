import React, { useState } from "react";
import { IconContext } from "react-icons";

const HoverIcon: React.FC<{
  color: string;
  hoverColor: string;
  size: string;
  hoverSize: string;
}> = ({ color, hoverColor, size, hoverSize, children }) => {
  const [colorState, setColorState] = useState(color);
  const [sizeState, setSizeState] = useState(size);

  return (
    <IconContext.Provider value={{ color: colorState, size: sizeState }}>
      <span
        onMouseOver={() => {
          setColorState(hoverColor);
          setSizeState(hoverSize);
        }}
        onMouseOut={() => {
          setColorState(color);
          setSizeState(size);
        }}
      >
        {children}
      </span>{" "}
    </IconContext.Provider>
  );
};

export default HoverIcon;
