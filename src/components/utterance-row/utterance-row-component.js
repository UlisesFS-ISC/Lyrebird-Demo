import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faDownload } from "@fortawesome/free-solid-svg-icons";

import "bulma/css/bulma.css";

const UtteranceRow = ({ utteranceEntry }) => {
  let utteranceAudio = new Audio(utteranceEntry.get("url"));
  return (
    <div className="box">
      <article className="media">
        <div className="media-left">
          <figure className="image is-32x32">
            <a className="button is-success">
              <span className="icon">
                <FontAwesomeIcon
                  icon={faPlay}
                  onClick={() => utteranceAudio.play()}
                  className="fa-lg">
                  Play
                </FontAwesomeIcon>
              </span>
            </a>
          </figure>
        </div>
        <div className="media-content">
          <div className="content">
            <p>
              <strong>{utteranceEntry.get("text")}</strong>
            </p>
            {`Created at: ${new Date(utteranceEntry.get("created_at")).toLocaleString()}`}
          </div>
        </div>
        <a className="" href={utteranceEntry.get("url")} download>
          <FontAwesomeIcon icon={faDownload} className="fa-lg">
            Download
          </FontAwesomeIcon>
        </a>
      </article>
    </div>
  );
};

export default UtteranceRow;
