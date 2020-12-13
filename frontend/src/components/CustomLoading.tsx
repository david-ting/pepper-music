import React from "react";

const CustomLoading: React.FC = () => {
  return (
    <svg width="80" height="80" className="loading-svg">
      <polygon points="0,0 80,0 80,80 0,80" />
    </svg>
  );
};

export default CustomLoading;
