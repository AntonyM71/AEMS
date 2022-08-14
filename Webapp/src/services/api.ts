import axios, { AxiosResponse } from "axios";
import config from "../config";

const apiBaseURL = config.get("apiBaseURL");

export const getuserToken = async (
    username: string,
    password: string): Promise<AxiosResponse<TokenResponseType>> => {
     const response: AxiosResponse<TokenResponseType> = await axios.post(apiBaseURL + "auth", { username, password })

    // rejected promises are automatically handled at the top topLevelErrorHandler
    return response

}


export const httpWithAuth = () => {
    axios.create({
        baseURL: apiBaseURL,
        headers: {}
    })
}


export interface TokenResponseType {
    "user": {
        "passwordExpired": boolean;
        "lastLogin": string;
        "dflg": boolean;
        "_id": string;
        "firstName": string;
        "lastName": string;
        "emailAddress": string;
        "permissionLevel": number;
        "lupt": string;
        "lupu": string;
        "crtt": string;
        "crtu": string;
        "__v": number;
        "fullName": string;
        "initials": string;
        "crttDisplay": string;
        "luptDisplay": string;
        "id": string;
    },
    "access_token": string;
    "refresh_token": string;
    "expires_in": number
}
