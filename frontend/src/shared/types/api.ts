export type TResponse<Result> =
	| {
			success: true;
			result: Result;
			timestamp?: string;
	  }
	| {
			success: false;
			result: null;
			error?: {
				message: string;
			};
			code?: number;
			timestamp?: string;
	  };
