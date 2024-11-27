import axios, { AxiosResponse } from 'axios';

export const linkUrl = import.meta.env.VITE_API_URL;



export const headerWithJson = () => {

    return {
        headers: {
            'Content-Type': 'application/json',
        },
    };

};

export const PostWithJson = async <T>(payload: any, endpoint: string) => {
    try {
        const headersParam = headerWithJson();
        const response: AxiosResponse<T> = await axios.post(
            linkUrl + endpoint,
            payload,
            headersParam
        );
        return response;
    } catch (error: any) {
        throw {
            errorStatus: error.response?.status,
        };
    }
};