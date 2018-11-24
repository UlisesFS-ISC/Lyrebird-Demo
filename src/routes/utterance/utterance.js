import React from "react";

import InsertionModal from "../../components/modals/insertion-modal-component";
import UtteranceTable from "../../components/utterance-table/utterance-table-component";
import LoadingOverlay from "../../components/loading-overlay/loading-overlay-component";
import {ACCESS_PROMPT_URL} from "../../services/context-root";

import "bulma/css/bulma.css";
import "./utterance.css";


class UtteranceContainer extends React.Component {
    static AccessPrompt() {
        return  <div>
          <div className="container is-fluid">
            <div className="column is-offset-one-fifth">
              <div className="title">Lyrebird demo - Access Prompt</div>
              <hr />
              <div className="column is-offset-one-quarter">
                <a href={ACCESS_PROMPT_URL}
                   className="button is-info"
                >
                  Provide Access to your profile
                </a>
              </div>
            </div>
          </div>
        </div>
    }
  static SearchField({
    searchCriteria,
    updateSearchCriteria,
    cleanSearchCriteria
  }) {
    return (
      <div className="box">
        <div className="field">
          <label className="label">Search</label>
          <div className="control">
            <input
              className="input"
              type="text"
              onChange={evt => updateSearchCriteria(evt.target.value)}
              value={searchCriteria.get("text")}
              placeholder="Search utterance"
            />
          </div>
        </div>
        <a
          className="button is-primary is-focused"
          onClick={() => {
            cleanSearchCriteria();
          }}>
          Clear fields
        </a>
      </div>
    );
  }

  constructor(props) {
    super();
    this.state = {
      modalActive: false,
      token: ""
    };
  }

  componentDidMount = async () => {
    let { loadData, HASH_PATH } = this.props;
    let token = '';
    if(HASH_PATH) {
        token = HASH_PATH.substr(1).split('=')[1].split('&')[0];
        if (token !== '') {
            loadData(token);
        }
        this.setState({token: token});
    }
  };

  componentDidUpdate = prevProps => {
    if (prevProps.data !== this.props.data) this.props.cleanSearchCriteria();
  };

  setModalActive = value => this.setState({ modalActive: value });

  render() {
    let { SearchField, AccessPrompt } = UtteranceContainer;
    let {
      data,
      dataFlag,
      searchCriteria,
      updateSearchCriteria,
      cleanSearchCriteria,
      insertUtterance
    } = this.props;
    let insertionModalComponent = (
      <InsertionModal
        modalActive={this.state.modalActive}
        setModalActive={this.setModalActive}
        insertUtterance={insertUtterance(this.state.token)}
        dataFlag={dataFlag}
      />
    );
      if (!this.state.token || this.state.token === ''){
          return <AccessPrompt/>;
      }


      let LoadingOverlayComponent = <LoadingOverlay indeterminedTime={true} />;

    return (
      <div className="utterance-container">
        {this.state.modalActive ? insertionModalComponent : null}
        {dataFlag ? null : LoadingOverlayComponent}
        <div className="container is-fluid">
          <div className="column is-offset-one-fifth">
            <div className="title">Lyrebird demo</div>
            <SearchField
              searchCriteria={searchCriteria}
              cleanSearchCriteria={cleanSearchCriteria}
              updateSearchCriteria={updateSearchCriteria}
            />
            <UtteranceTable
              utteranceData={data}
              searchCriteria={searchCriteria}
            />
            <hr />
            <div className="column is-offset-one-quarter">
              <button
                className="button is-info"
                onClick={() => {
                  this.setModalActive(true);
                }}>
                Create utterance
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UtteranceContainer;
