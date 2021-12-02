/* eslint-disable camelcase */
import axios, { AxiosResponse } from "axios"
import { getRecoil, setRecoil } from "recoil-nexus"
import config from "../config"
import {
	currentToken,
	currentTokenExpiry,
	refreshToken
} from "../recoil/atoms/auth"

const apiBaseURL = config.get("apiBaseURL")

export const getuserToken = async (
	username: string,
	password: string
): Promise<AxiosResponse<TokenResponseType>> => {
	const response: AxiosResponse<TokenResponseType> = await axios.post(
		apiBaseURL + "auth",
		{ username, password }
	)

	// rejected promises are automatically handled at the top topLevelErrorHandler
	return response
}

export const tokenHelper = async (): Promise<void> => {
	const tokenExpiry = getRecoil(currentTokenExpiry)
	const currentRefreshToken = getRecoil(refreshToken)

	const currentTime = Date.now()
	if (currentTime > tokenExpiry) {
		const response: AxiosResponse<TokenResponseType> = await axios.post(
			apiBaseURL + "auth/refresh",
			// eslint-disable-next-line camelcase
			{ refresh_token: currentRefreshToken }
		)
		// update tokens in state
		setRecoil(currentToken, response.data.access_token)
		setRecoil(refreshToken, response.data.refresh_token)
	}
}

export const postWithAuth = async (
	endpoint: string,
	data?: Record<string, unknown>
) => {
	await tokenHelper()
	const token = getRecoil(currentToken)

	return await axios.post(apiBaseURL + endpoint, {
		headers: { Authorization: "Bearer " + token },
		data
	})
}
export const getWithAuth = async (
	endpoint: string,
	data?: Record<string, unknown>
) => {
	await tokenHelper()
	const token = getRecoil(currentToken)

	return await axios.get(apiBaseURL + endpoint, {
		headers: { Authorization: "Bearer " + token },
		data
	})
}
export interface TokenResponseType {
	user: {
		passwordExpired: boolean
		lastLogin: string
		dflg: boolean
		_id: string
		firstName: string
		lastName: string
		emailAddress: string
		permissionLevel: number
		lupt: string
		lupu: string
		crtt: string
		crtu: string
		__v: number
		fullName: string
		initials: string
		crttDisplay: string
		luptDisplay: string
		id: string
	}
	access_token: string
	refresh_token: string
	expires_in: number
}
