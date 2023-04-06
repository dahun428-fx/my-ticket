import { legacy_createStore as createStore, applyMiddleware, compose } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";
import thunk from "redux-thunk";
import { createWrapper } from "next-redux-wrapper";
import rootReducer from "./_reducer";

//https://devkkiri.com/post/59cb38dd-f939-462d-9e7f-afcc338b621f
const isProduction = process.env.NEXT_PUBLIC_RUN_MODE === "production";


const makeStore = () => {
  const enhancer = isProduction
    ? compose(applyMiddleware(thunk))
    : composeWithDevTools(applyMiddleware(thunk));
  const store = createStore(rootReducer, enhancer);
  return store;
};


const wrapper = createWrapper(makeStore, { debug: !isProduction });


export default wrapper;