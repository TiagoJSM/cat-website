import axios, { AxiosResponse } from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://api.thecatapi.com/v1/',
    headers: {'x-api-key': '0c1d5ef5-ffba-4abb-96c5-5c637bd24071'}
});

export enum VoteType {
    Up,
    Down
}

class CatApi {
    getImages(): Promise<AxiosResponse<any>> {
        return axiosInstance.get(`/images?limit=100`);
    }
    getFavorites(): Promise<AxiosResponse<any>> {
        return axiosInstance.get(`/favourites`);
    }
    getVotes(): Promise<AxiosResponse<any>> {
        return axiosInstance.get(`/votes`);
    }
    addImage(file: any): Promise<AxiosResponse<any>> {
        const headers = {
            'Content-Type':'multipart/form-data'
        };
        var formData = new FormData();
        formData.append("file", file);

        return axiosInstance.post(`images/upload`, formData, { headers: headers });
    };
    addFavourite(imageId: string): Promise<AxiosResponse<any>> {
        return axiosInstance.post(`favourites`, { image_id: imageId });
    };
    deleteFavourite(favouriteId: string): Promise<AxiosResponse<any>> {
        return axiosInstance.delete(`favourites/${favouriteId}`);
    };
    addVote(imageId: string, voteType: VoteType): Promise<AxiosResponse<any>> {
        return axiosInstance.post(`votes`, { image_id: imageId, value: voteType === VoteType.Up ? 1 : 0 });
    };
}

const catApi = new CatApi();

export default catApi;