import axios, { AxiosResponse } from "axios";
import config from "../config";

const apiBaseURL = config.get("apiBaseURL");

export const getuserToken = async (
    username: string,
    password: string,
    currentTimestamp: number): Promise<AxiosResponse<TokenResponseType>> => {
     const response: AxiosResponse<TokenResponseType> = await axios.post(apiBaseURL + "auth", { username, password })

     // write to localStorage
    localStorage.setItem("userName",response.data.user.fullName)
	localStorage.setItem("userInitial",response.data.user.initials)
	localStorage.setItem("userAccessToken",response.data.access_token)
	localStorage.setItem("userAccessTokenExpiry",(
				response.data.expires_in * 1000 + currentTimestamp - 10).toString()
			)
	localStorage.setItem("userRefreshToken",response.data.refresh_token)

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
