export const isDevelopment = process.env.NODE_ENV === 'development';
export const API_URL = process.env.NEXT_PUBLIC_API_API_URL;
export const isWeb = typeof window !== 'undefined';

export enum EXERCISE_TYPE {
	TERMS = 1,
	PHRASES,
}
