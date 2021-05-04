import axios, { AxiosInstance } from 'axios';
import Image from '../models/image';
import { RootState } from '../store';

export const GET_UPLOADED_IMAGES_STARTED = "GET_UPLOADED_IMAGES_STARTED";
export const GET_UPLOADED_IMAGES_SUCCESS = "GET_UPLOADED_IMAGES_SUCCESS";
export const GET_UPLOADED_IMAGES_FAILURE = "GET_UPLOADED_IMAGES_FAILURE";
export const SET_IMAGE_FAVOURITE_STATE = "SET_IMAGE_FAVOURITE_STATE";
export const VOTE_IMAGE = "VOTE_IMAGE";

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
    return async (dispatch: any) => {
        dispatch(getUploadedImagesStarted());

        const instance = GetAxiosInstance();
        try{
            const imagesResult = await instance.get(`/images?limit=100`);
            const favoritesResult = await instance.get(`/favourites`);
            const votesResult = await instance.get(`/votes`);

            const imagesData = imagesResult.data.map((img: any) => {
                const favouriteData = favoritesResult.data.find((f: any) => f.image_id === img.id);
                const voteCount = votesResult
                    .data
                    .filter((v: any) => v.image_id === img.id)
                    .reduce((sum: number, current: any) => sum + (current.value === 1 ? 1 : -1), 0);
                return {
                    id: img.id,
                    url: img.url,
                    favourite: favouriteData != null,
                    favouriteId: favouriteData != null ? favouriteData.id : null,
                    voteCount: voteCount
                } as Image;
            });

            dispatch(getUploadedImagesSuccess(imagesData));
        }
        catch(error){
            dispatch(getUploadedImagesFailure(error.message));
        }
            
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

export const favouriteImage = (imageId: string) => {
    return (dispatch: any) => {
        dispatch(setImageFavouriteState(imageId, true));
        GetAxiosInstance()
            .post(`favourites`, { image_id: imageId })
            .then(res => {
                dispatch(setImageFavouriteState(imageId, true, res.data.id));
            })
            .catch(err => {
                dispatch(setImageFavouriteState(imageId, false));
            });
    };
};

export const unfavouriteImage = (imageId: string) => {
    return (dispatch: any, getState: () => RootState) => {
        const { cats: { images } } = getState();

        const image = images.find(i => i.id === imageId);

        if(image)
        {
            dispatch(setImageFavouriteState(imageId, false));

            GetAxiosInstance()
                .delete(`favourites/${image.favouriteId}`)
                .then(res => {
                    dispatch(setImageFavouriteState(imageId, false));
                })
                .catch(err => {
                    dispatch(setImageFavouriteState(imageId, true, image.favouriteId));
                });
            }
    };
};

enum VoteType {
    Up,
    Down
}

const voteImage = (imageId: string, voteType: VoteType) => {
    return (dispatch: any) => {
        GetAxiosInstance()
            .post(`votes`, { image_id: imageId, value: voteType === VoteType.Up ? 1 : 0 })
            .then(res => {
                dispatch(voteImageAction(imageId, voteType === VoteType.Up ? 1 : -1));
            })
            .catch(err => {
                //dispatch(setImageFavouriteState(imageId, false));
            });
    };
};

export const upvoteImage = (imageId: string) => {
    return voteImage(imageId, VoteType.Up);
}
export const downvoteImage = (imageId: string) => {
    return voteImage(imageId, VoteType.Down);
}

const getUploadedImagesSuccess = (images: Image[]) => ({
    type: GET_UPLOADED_IMAGES_SUCCESS,
    payload: images
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

const setImageFavouriteState = (imageId: string, favourite: boolean, favouriteId: string = null) => ({
    type: SET_IMAGE_FAVOURITE_STATE,
    payload: {
        imageId,
        favourite,
        favouriteId
    }
});

const voteImageAction = (imageId: string, voteValue: number) => ({
    type: VOTE_IMAGE,
    payload: {
        imageId,
        voteValue
    }
});