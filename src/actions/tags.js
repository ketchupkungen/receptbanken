import { START_LOADING, END_LOADING, FETCH_ALL, FETCH_TAG, CREATE_TAG } from '../constants/actionTypes';
import * as api from '../api/index.js';

export const getTag = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });

    const { data } = await api.fetchTag(id);

    dispatch({ type: FETCH_TAG, payload: { tag: data } });
  } catch (error) {
    console.log(error);
  }
};

export const getTags = (page) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data: { data, currentPage, numberOfPages } } = await api.fetchTags(page);

    dispatch({ type: FETCH_ALL, payload: { data, currentPage, numberOfPages } });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

/* Kanske rent av även create tag?*/

export const createTag = (tag) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.createTag(tag);

    dispatch({ type: CREATE_TAG, payload: data });

    //history.push(`/posts/${data._id}`);
  } catch (error) {
    console.log(error);
  }
};