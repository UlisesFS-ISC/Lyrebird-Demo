import { connect } from "react-redux";

import { utteranceActions } from "../../redux/utterance/utterance-actions";
import Utterance from "./utterance";



const HASH_PATH = window.location.hash;

const mapStateToProps = state => {
  return {
    data: state.Utterance.get("data"),
    dataFlag: state.Utterance.get("dataFlag"),
    searchCriteria: state.Utterance.get("searchCriteria"),
      HASH_PATH
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadData: response =>
      dispatch(utteranceActions.utteranceGetDataServiceCall(response)),
    insertUtterance: token => entry =>
      dispatch(utteranceActions.utteranceInsertDataServiceCall(entry, token)),
    updateSearchCriteria: text =>
      dispatch(utteranceActions.updateSearchCriteria(text)),
    cleanSearchCriteria: () => dispatch(utteranceActions.cleanSearchCriteria())
  };
};

const UtteranceContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Utterance);

export default UtteranceContainer;
