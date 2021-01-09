export type IChangePassword = Partial<{
	data: {
		message: string;
		type: string;
	};
	error: string;
}>;
