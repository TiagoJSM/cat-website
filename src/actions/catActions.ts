import axios, { AxiosInstance } from 'axios';

export const GET_UPLOADED_IMAGES_STARTED = "GET_UPLOADED_IMAGES_STARTED";
export const GET_UPLOADED_IMAGES_SUCCESS = "GET_UPLOADED_IMAGES_SUCCESS";
export const GET_UPLOADED_IMAGES_FAILURE = "GET_UPLOADED_IMAGES_FAILURE";

let axiosInstance: AxiosInstance;

function GetAxiosInstance() {
    if(axiosInstance === undefined)
    {
        axiosInstance = axios.create({
            baseURL: 'https://api.thecatapi.com/v1/',
            headers: {'x-api-key': '0c1d5ef5-ffba-4abb-96c5-5c637bd24071'}
        });
    }
    return axiosInstance;
}

export const getUploadedImages = () => {
    return (dispatch: any) => {
        dispatch(getUploadedImagesStarted());

        GetAxiosInstance()
            .get(`/images?limit=100`)
            .then(res => {
                dispatch(getUploadedImagesSuccess(res.data));
            })
            .catch(err => {
                dispatch(getUploadedImagesFailure(err.message));
            });
    };
};

export const uploadImage = (file: any) => {
    return (dispatch: any) => {
        dispatch(getUploadedImagesStarted());

        const headers = {
            'Content-Type':'multipart/form-data'
        };
        var formData = new FormData();
        formData.append("file", file);

        GetAxiosInstance()
            .post(`images/upload`, formData, { headers: headers })
            .then(res => {
                //dispatch(getUploadedImagesSuccess(res.data));
            })
            .catch(err => {
                //dispatch(getUploadedImagesFailure(err.message));
            });
    };
};

const getUploadedImagesSuccess = (cats: any) => ({
    type: GET_UPLOADED_IMAGES_SUCCESS,
    payload: cats
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