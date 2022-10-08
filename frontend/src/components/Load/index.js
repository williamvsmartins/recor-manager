import React from "react";

import PacmanLoader from "react-spinners/PacmanLoader";

import "./styles.css";

export function Load() {
  return <PacmanLoader className="loadAnimation" autoplay loop />;
}
