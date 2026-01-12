export interface JwtPayload {
	sub: number
	login: string
	iat: number
	exp: number
}