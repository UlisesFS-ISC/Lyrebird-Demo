import {
  getData,
  insertUtterance
} from "../../services/utterance/utterance-services";

const utteranceGetDataServiceCall = token => {
  return async dispatch => {
    dispatch(setDataFlag(false));
    try {
      let response = await getData(token);

      dispatch(utteranceGetDataCallFullfilled(response));
      dispatch(setDataFlag(true));
    } catch (error) {
      dispatch(utteranceServiceCallFailed(error));
      dispatch(setDataFlag(true));
    }
  };
};

const utteranceInsertDataServiceCall = (entry, token) => {
  return async dispatch => {
    dispatch(setDataFlag(false));
    try {
      await insertUtterance(entry, token);
      dispatch(utteranceGetDataServiceCall(token));
    } catch (error) {
      dispatch(utteranceServiceCallFailed(error));
      dispatch(setDataFlag(true));
    }
  };
};

const utteranceGetDataCallFullfilled = data => {
  return {
    type: "UTTERANCE_GET_DATA_CALL_FULLFILLED",
    data
  };
};

const setDataFlag = value => {
  return {
    type: "SET_DATA_FLAG",
    value
  };
};

const updateSearchCriteria = text => {
  return {
    type: "UPDATE_SEARCH_CRITERIA",
    text
  };
};

const cleanSearchCriteria = () => {
  return {
    type: "CLEAN_SEARCH_CRITERIA"
  };
};

const utteranceServiceCallFailed = error => {
  alert("An error ocurred!", error.message);
  return {
    type: "UTTERANCE_SERVICE_CALL_FAILED",
    error
  };
};

export const utteranceActions = {
  utteranceGetDataServiceCall,
  utteranceInsertDataServiceCall,
  utteranceGetDataCallFullfilled,
  setDataFlag,
  updateSearchCriteria,
  cleanSearchCriteria
};
