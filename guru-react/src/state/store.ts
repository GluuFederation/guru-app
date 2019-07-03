import { createBrowserHistory } from "history";
import { createStore, applyMiddleware, compose } from "redux";
import { routerMiddleware } from "connected-react-router";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import createRootReducer from "./reducers";

const persistConfig = {
  key: "rbht-app-root",
  blacklist: ["router"],
  storage
};

export const history = createBrowserHistory();
const rootReducer = createRootReducer(history);
const persistedReducer = persistReducer(persistConfig, rootReducer);
// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

function configureStore(preloadedState?: any) {
  const store = createStore(
    persistedReducer,
    preloadedState,
    composeEnhancers(applyMiddleware(routerMiddleware(history), thunk))
  );
  return store;
}

const store = configureStore();
export const persistor = persistStore(store);

export default store;
