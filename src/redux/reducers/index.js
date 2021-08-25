import { combineReducers } from "redux";
import core from "./core";
import loan from "./loan";
import auth from "./auth";
import wallet from "./wallet"

export default combineReducers({ core, loan, auth, wallet });
