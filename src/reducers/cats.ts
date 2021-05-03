import { AnyAction } from 'redux';
import Cat from '../models/cat';

import { GET_UPLOADED_IMAGES_STARTED, GET_UPLOADED_IMAGES_SUCCESS, GET_UPLOADED_IMAGES_FAILURE } from "../actions/catActions";

interface CatsState {
  cats: Cat[];
  isLoadingData: boolean;
  error: boolean
};

const initialState = {
  cats: [],
  isLoadingData: false,
  error: false
} as CatsState;

export default function(state = initialState, action: AnyAction) {
  switch (action.type) {
    case GET_UPLOADED_IMAGES_STARTED:
      return { ...state, cats: [], isLoadingData: true };
    case GET_UPLOADED_IMAGES_SUCCESS:
      return { cats: [...action.payload], isLoadingData: false, error: false };
    case GET_UPLOADED_IMAGES_FAILURE:
      return { cats: [], isLoadingData: false, error: true };
    default:
      return state;
  }
}
