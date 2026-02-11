export const isDevelopment = process.env.NODE_ENV === 'development';
export const API_URL = process.env.NEXT_PUBLIC_API_API_URL;
export const isWeb = typeof window !== 'undefined';

export enum EXERCISE_TYPE {
	TERMS = 1,
	PHRASES,
	FINAL_TEST,
}

export const FINAL_TEST_THRESHOLD_PERCENT = 90;
export const ADMIN_LOGIN = 'admin';