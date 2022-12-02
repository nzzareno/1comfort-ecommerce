import { T_SHIRTS, FOOTWEAR, ACCESSORIES } from "../constants/actionTypes";

const categoryReducer = (state = { category: null }, action) => {
  switch (action.type) {
    case T_SHIRTS:
      return { ...state, category: action?.data };
    case FOOTWEAR:
      return { ...state, category: action?.data };
    case ACCESSORIES:
      return { ...state, category: action?.data };
    default:
      return state;
  }
}
export default categoryReducer;
