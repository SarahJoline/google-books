import { createStore, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

function DonReducer(state = { kissCounter: 0, hugCounter: 0 }, action) {
  switch (action.type) {
    case "KISS_SARAH":
      return {
        ...state,
        kissCounter: (state.kissCounter = state.kissCounter + action.numKisses),
      };
    case "HUG_SARAH":
      return {
        ...state,
        hugCounter: state.hugCounter++,
      };
    default:
      return state;
  }
}

// API reducers
const initialState = {
  loading: false,
  loaded: false,
  error: null,
};

function BooksReducer(state = initialState, action) {
  switch (action.type) {
    case "BOOKS_LOADING":
      return {
        ...state,
        loading: true,
        loaded: false,
        error: null,
      };
    case "BOOKS_LOADED":
      return {
        ...state,
        loading: false,
        loaded: true,
        error: null,
        data: action.data,
      };
    case "BOOKS_ERROR":
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error,
      };
    default:
      return state;
  }
}

function UsersReducer(state = initialState, action) {
  switch (action.type) {
    case "USERS_LOADING":
      return {
        ...state,
        loading: true,
        loaded: false,
        error: null,
      };
    case "USERS_LOADED":
      return {
        ...state,
        loading: false,
        loaded: true,
        error: null,
      };
    case "USERS_ERROR":
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error,
      };
    default:
      return state;
  }
}

// Combine the reducers
let combinedReducer = combineReducers({
  don: DonReducer,
  books: BooksReducer,
  users: UsersReducer,
});

let store = createStore(combinedReducer, composeWithDevTools());

export default store;
