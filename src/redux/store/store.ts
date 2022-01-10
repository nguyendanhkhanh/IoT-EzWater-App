import { applyMiddleware, combineReducers } from "redux";
import { createStore } from "redux";
import rootReducer from "../reducer";
import logger from "redux-logger"
import { persistReducer, persistStore } from "redux-persist";
import ReduxPersist from "../config/reduxPersistConfig";

const persistedReducer = persistReducer(ReduxPersist.storeConfig, rootReducer);
const store = createStore(persistedReducer, applyMiddleware(logger))
const persistor = persistStore(store);
export { store, persistor };
