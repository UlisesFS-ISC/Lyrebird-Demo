
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import RootReducer from "./redux/root-reducer";
import UtteranceRoute from "./routes/utterance/utterance-container";


import "bulma/css/bulma.css";


class App extends React.Component {
  render() {
    let store = createStore(RootReducer, applyMiddleware(thunk));
    return (
      <Provider store={store}>
        <UtteranceRoute />
      </Provider>
    );
  }
}

ReactDOM.render(<App/>, app);
module.hot.accept();
