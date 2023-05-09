import { FETCH_ALL, FETCH_TAG, CREATE_TAG } from '../constants/actionTypes';

export default (state = { isLoading: true, posts: [] }, action) => {
  switch (action.type) {
    case 'START_LOADING':
      return { ...state, isLoading: true };
    case 'END_LOADING':
      return { ...state, isLoading: false };
    case FETCH_ALL:
      return {
        ...state,
        posts: action.payload.data,
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numberOfPages,
      };
    case FETCH_TAG:
      return { ...state, post: action.payload.post };
    case CREATE_TAG:
      return { ...state, posts: [...state.posts, action.payload] };
    default:
      return state;
  }
};

