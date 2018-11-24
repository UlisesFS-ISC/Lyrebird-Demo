import { combineReducers } from "redux";
import Utterance from "./utterance/utterance-reducer";

const RootReducer = combineReducers({
  Utterance
});

export default RootReducer;
