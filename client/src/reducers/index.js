import { combineReducers } from "redux";

import auth from "./auth";
import categories from "./categories";

export const reducers = combineReducers({
  auth,
  categories,
});
