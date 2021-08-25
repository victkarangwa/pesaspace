import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "redux/reducers";
import initialState from "redux/store/initialState";

const middleware = applyMiddleware(thunk);

let store;
if (process.env.NODE_ENV === "production") {
  store = createStore(rootReducer, initialState, middleware);
} else {
  store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(middleware)
  );
}

export default store;
