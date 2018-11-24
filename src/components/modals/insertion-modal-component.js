import React from "react";

import "bulma/css/bulma.css";
import LoadingOverlay from "../loading-overlay/loading-overlay-component";

class InsertionModal extends React.Component {
  constructor(props) {
    super();
    this.state = {
      voiceInput: "",
      loadOverlayActive: false,
      progressValue: 0
    };
  }

  setVoiceInput = value => this.setState({ voiceInput: value });
  setLoadOverlayActive = value => this.setState({ loadOverlayActive: value });
  setProgressValue = value => this.setState({ progressValue: value });

  startProgressBar = (timeSpent = 0, recursionCall) => {
      this.setProgressValue(timeSpent);
      if(timeSpent > 90 || this.props.dataFlag) {
          this.setProgressValue( 100 );
          setTimeout(() => {
              this.props.setModalActive(false);
          }, 1100);
          return null;
      } else
      setTimeout(() => {
          recursionCall(timeSpent+24, recursionCall)
      }, 1000);
  };

    componentDidUpdate(prevProps){
        let {dataFlag } = this.props;
        if(!dataFlag && prevProps.dataFlag !== dataFlag){
            this.setLoadOverlayActive(true);
            this.startProgressBar(0, this.startProgressBar);
        }
    }

  render() {
    let {
      setVoiceInput
    } = this;
    let { insertUtterance, modalActive, setModalActive } = this.props;
    let { voiceInput, loadOverlayActive, progressValue } = this.state;
    if (!modalActive) return null;

    let modalContent = loadOverlayActive ? (
      <LoadingOverlay indeterminedTime={false} progressValue={progressValue} />
    ) : (
      <div className="field">
        <label className="label">Fill the utterance's fields</label>
        <div className="control">
          <input
            className="input"
            type="text"
            placeholder="Voice input"
            value={voiceInput}
            onChange={evt => setVoiceInput(evt.target.value)}
          />
        </div>
      </div>
    );

    return (
      <div className="modal is-active">
        <div className="modal-background" />
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Create new utterance</p>

            <button
              className="delete"
              onClick={() => setModalActive(false)}
              aria-label="close"
            />
          </header>
          <section className="modal-card-body">{modalContent}</section>
          <footer className="modal-card-foot">
            <button
              className="button is-success"
              onClick={() => {
                 insertUtterance(voiceInput);
              }}>
              Submit
            </button>
            <button className="button" onClick={() => setModalActive(false)}>
              Cancel
            </button>
          </footer>
        </div>
      </div>
    );
  }
}

export default InsertionModal;
