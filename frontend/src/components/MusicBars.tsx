import React from "react";
import styled, { keyframes, css } from "styled-components";

interface Animation {
  start: number;
  end: number;
  duration: number;
  delay: number;
}
const movingBar = (props: Animation) => {
  return keyframes`
  0% {
    height: ${props.start}px;
    opacity: 0.5;
  }
  100% {
    height: ${props.end}px;
    opacity: 1;
  }
`;
};

const Bar = styled.div`
  flex: 1 1 5px;
  background-color: red;
  animation: ${(props: Animation) =>
    css`
      ${movingBar(
        props
      )} ${props.duration}ms linear ${props.delay}ms infinite alternate both, changing-bg-color 10000ms linear 0ms infinite alternate both;
    `};
`;

const SingleBar: React.FC = () => {
  const maxHeight = 50;
  const baseDuration = 800;
  const start = Math.floor((Math.random() * maxHeight) / 2);
  const end = Math.floor((Math.random() * maxHeight) / 2) + maxHeight / 2;
  const duration = baseDuration + (Math.random() * baseDuration) / 2;
  const delay = (Math.random() * duration) / 2;

  return <Bar {...{ start, end, duration, delay }} />;
};

const MusicBars: React.FC = () => {
  const barNo = 150;

  const barCollection = [];

  for (let i = 0; i < barNo; i++) {
    barCollection.push(<SingleBar key={i} />);
  }

  return <div id="music-bars-container">{barCollection}</div>;
};

export default MusicBars;
