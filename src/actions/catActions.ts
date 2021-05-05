import catApi, { VoteType } from '../api/catApi';
import Image from '../models/image';
import { RootState } from '../store';

export const GET_UPLOADED_IMAGES_STARTED = "GET_UPLOADED_IMAGES_STARTED";
export const GET_UPLOADED_IMAGES_SUCCESS = "GET_UPLOADED_IMAGES_SUCCESS";
export const GET_UPLOADED_IMAGES_FAILURE = "GET_UPLOADED_IMAGES_FAILURE";
export const SET_IMAGE_FAVOURITE_STATE = "SET_IMAGE_FAVOURITE_STATE";
export const VOTE_IMAGE = "VOTE_IMAGE";

export const getUploadedImages = () => {
    return async (dispatch: any) => {
        dispatch(getUploadedImagesStarted());

        try{
            const getImagesPromise = catApi.getImages();
            const getFavouritesPromise = catApi.getFavorites();
            const getVotesPromise = catApi.getVotes();

            const [imagesResult, favoritesResult, votesResult] = await Promise.all([getImagesPromise, getFavouritesPromise, getVotesPromise]);

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

export const favouriteImage = (imageId: string) => {
    return (dispatch: any) => {
        dispatch(setImageFavouriteState(imageId, true));

        catApi
            .addFavourite(imageId)
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

            catApi
                .deleteFavourite(image.favouriteId)
                .then(res => {
                    dispatch(setImageFavouriteState(imageId, false));
                })
                .catch(err => {
                    dispatch(setImageFavouriteState(imageId, true, image.favouriteId));
                });
            }
    };
};

const voteImage = (imageId: string, voteType: VoteType) => {
    return (dispatch: any) => {
          catApi
            .addVote(imageId, voteType)
            .then(res => {
                dispatch(voteImageAction(imageId, voteType === VoteType.Up ? 1 : -1));
            })
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