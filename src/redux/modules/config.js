import {combineReducers} from "redux";
import userDetail from './UserDetailModule';

const rootReducer = combineReducers({
    userDetail,
});

export default rootReducer;