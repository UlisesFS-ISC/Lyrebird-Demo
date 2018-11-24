import React from "react";

import "bulma/css/bulma.css";

import UtteranceRow from "../utterance-row/utterance-row-component";

const UtteranceTable = ({ utteranceData, searchCriteria }) => {
  let foundMatches = searchCriteria.get("foundMatches");
  if (searchCriteria.get("text") !== "") {
    utteranceData = foundMatches;
  }
  let UtteranceRows =
    !utteranceData || utteranceData.size < 1
      ? null
      : utteranceData.map((utteranceEntry, i) => (
          <UtteranceRow key={i} utteranceEntry={utteranceEntry} />
        ));

  return (
    <div className="utterance-table-content">
      {UtteranceRows === null ? "No entries were found" : UtteranceRows}
    </div>
  );
};

export default UtteranceTable;
