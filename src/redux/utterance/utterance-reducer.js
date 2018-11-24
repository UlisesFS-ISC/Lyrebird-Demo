import { Map, fromJS } from "immutable";

const initialState = fromJS({
  dataFlag: false,
  data: new Map(),
  searchCriteria: fromJS({
    text: "",
    foundMatches: []
  }),
  error: ""
});

let UtteranceReducer = (state = initialState, action) => {
  switch (action.type) {
    case "UTTERANCE_GET_DATA_CALL_FULLFILLED": {
      let utterances = new Map();
      action.data.forEach(utteranceEntry => {
        let formatedEntry = fromJS(utteranceEntry);
        utterances = utterances.set(formatedEntry.get("text"), formatedEntry);
      });
        utterances = utterances.sort((ut1, ut2) => ut1.get('created_at') > ut2.get('created_at'));
      return state.set("data", utterances);
    }

    case "SET_DATA_FLAG": {
      return state.set("dataFlag", action.value);
    }

    case "UPDATE_SEARCH_CRITERIA": {
      let foundMatches = [];
      if (action.text !== "") {
        foundMatches = state
          .get("data")
          .filter(entry => entry.get("text").includes(action.text));
      }
      return state
        .setIn(["searchCriteria", "text"], action.text)
        .setIn(["searchCriteria", "foundMatches"], foundMatches);
    }
    case "CLEAN_SEARCH_CRITERIA": {
      return state.set("searchCriteria", initialState.get("searchCriteria"));
    }

    case "UTTERANCE_SERVICE_CALL_FAILED": {
      return state.set("error", action.error);
    }

    default:
      return state;
  }
};

export default UtteranceReducer;
