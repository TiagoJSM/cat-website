// import {
//     ADD_TODO_SUCCESS,
//     ADD_TODO_FAILURE,
//     ADD_TODO_STARTED,
//     DELETE_TODO
//   } from './types';

import axios from 'axios';

const GET_UPLOADED_IMAGES_STARTED = "GET_UPLOADED_IMAGES_STARTED";
const GET_UPLOADED_IMAGES_SUCCESS = "GET_UPLOADED_IMAGES_SUCCESS";
const GET_UPLOADED_IMAGES_FAILURE = "GET_UPLOADED_IMAGES_FAILURE";

export const getUploadedImages = () => {
    return (dispatch: any) => {
        dispatch(getUploadedImagesStarted());

        axios
        .get(`https://api.thecatapi.com/v1/images?api_key=0c1d5ef5-ffba-4abb-96c5-5c637bd24071`)
        .then(res => {
            dispatch(getUploadedImagesSuccess(res.data));
        })
        .catch(err => {
            dispatch(getUploadedImagesFailure(err.message));
        });
    };
};

const getUploadedImagesSuccess = (cats: any) => ({
    type: GET_UPLOADED_IMAGES_SUCCESS,
    payload: {
        ...cats
    }
});

const getUploadedImagesStarted = () => ({
    type: GET_UPLOADED_IMAGES_STARTED
});

const getUploadedImagesFailure = (error: any) => ({
    type: GET_UPLOADED_IMAGES_FAILURE,
    payload: {
        error
    }
});