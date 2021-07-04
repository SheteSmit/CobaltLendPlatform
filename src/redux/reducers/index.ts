import { combineReducers } from "redux";
import registrationReducer from "./registrationReducer";
import uiReducer from './uiReducer'
import userReducer from './userReducer'
import votingReducer from './votingReducer'
import blockchainReducer from './blockchainReducer'
import stakingReducer from './stakingReducer'

const rootReducer = {
  ui: uiReducer.reducer,
  user: userReducer.reducer,
  registration: registrationReducer.reducer,
  voting: votingReducer.reducer,
  blockchain: blockchainReducer.reducer,
  staking: stakingReducer.reducer
};

export default rootReducer;