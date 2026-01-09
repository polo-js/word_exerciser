declare global {
	namespace NodeJS {
		interface ProcessEnv {
			PORT: string;
			API_GLOBAL_PREFIX: string;
			NODE_ENV: 'development' | 'production';
			SECRET_JWT: string;
		}
	}
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
