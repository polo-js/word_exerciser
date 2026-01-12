import { Request } from 'express';
import { JwtPayload } from '../auth/auth.type';

export type IRequestWithToken = Request & {
	userToken: JwtPayload;
};
