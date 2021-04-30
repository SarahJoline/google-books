import { createStore, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import _ from "lodash";

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

function UserBooksReducer(state = initialState, action) {
  switch (action.type) {
    case "USERBOOKS_LOADING":
      return {
        ...state,
        loading: true,
        loaded: false,
        error: null,
      };
    case "USERBOOKS_LOADED":
      return {
        ...state,
        loading: false,
        loaded: true,
        error: null,
        data: action.data,
      };
    case "USERBOOKS_ERROR":
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

function JoinedBooksReducer(state = initialState, action) {
  switch (action.type) {
    case "JOINED_LOADING":
      return {
        ...state,
        loading: true,
        loaded: false,
        error: null,
      };
    case "JOINED_LOADED":
      return {
        ...state,
        loading: false,
        loaded: true,
        error: null,
        data: action.data,
      };
    case "JOINED_ERROR":
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error,
      };
    case "DELETE_FROM_JOINED":
      const id = action._id;
      const updatedJoinedBooks = _.reject(state.data, { _id: id });

      return {
        ...state,
        data: updatedJoinedBooks,
      };
    case "ADD_TO_JOINED":
      const newBook = action.data;
      const updatedBooks = [...state.data, newBook];

      return {
        ...state,
        data: updatedBooks,
      };
    case "BORROW_BOOK":
      const newDataCopy = { ...state.data };

      const bookToUpdate = _.find(newDataCopy, { _id: action.joinedBookID });

      bookToUpdate.borrowerID = action.userID;

      const newState = {...state.data}

      return {
        ...state,
        data: newState,
      };
    default:
      return state;
  }
}

// Combine the reducers
let combinedReducer = combineReducers({
  books: BooksReducer,
  userBooks: UserBooksReducer,
  joinedBooks: JoinedBooksReducer,
});

let store = createStore(combinedReducer, composeWithDevTools());

export default store;
