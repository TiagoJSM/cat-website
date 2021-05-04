import { AnyAction } from 'redux';
import Image from '../models/image';

import { GET_UPLOADED_IMAGES_STARTED, GET_UPLOADED_IMAGES_SUCCESS, GET_UPLOADED_IMAGES_FAILURE, SET_IMAGE_FAVOURITE_STATE } from "../actions/catActions";

interface ImagesState {
  images: Image[];
  isLoadingData: boolean;
  error: boolean;
};

const initialState = {
  images: [],
  isLoadingData: false,
  error: false
} as ImagesState;

export default function(state = initialState, action: AnyAction) {
  const { type, payload } = action;
  switch (type) {
    case GET_UPLOADED_IMAGES_STARTED:
      return { ...state, images: [], isLoadingData: true };
    case GET_UPLOADED_IMAGES_SUCCESS:
      return { ...state, images: [...payload], isLoadingData: false, error: false };
    case GET_UPLOADED_IMAGES_FAILURE:
      return { ...state, images: [], isLoadingData: false, error: true };
    case SET_IMAGE_FAVOURITE_STATE:
      return { 
        ...state, 
        images: state.images.map(
          i => i.id === payload.imageId ? ({ ...i, favourite: payload.favourite, favouriteId: payload.favouriteId}) : i) 
      };
    default:
      return state;
  }
}
