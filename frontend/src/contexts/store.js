// store.js
import { createStore } from 'redux';
import { CurrentUserContext } from "./CurrentUserContext";

const store = createStore(CurrentUserContext);
export default store;