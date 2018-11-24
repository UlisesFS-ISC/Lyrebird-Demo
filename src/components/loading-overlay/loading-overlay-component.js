import React from "react";
import MDSpinner from "react-md-spinner";
import { Line } from "rc-progress";

import "bulma/css/bulma.css";
import "./loading-overlay-component.css";

const LoadingOverlay = ({ indeterminedTime, progressValue }) => {
  const progressBar = indeterminedTime ? (
    <div className="spinner">
      <MDSpinner />
    </div>
  ) : (
    <Line
      className="progress"
      percent={progressValue}
      strokeWidth="6"
      strokeColor="#00d1b2"
    />
  );

  return <div className="loading-overlay-content">{progressBar}</div>;
};

export default LoadingOverlay;
