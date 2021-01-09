export type IFeed = Partial<{
	researchPaper_id: {
		id: number;
		author_id: number;
		advisory_id: number;
	};
	user: {
		id: number;
		firstName: string;
		lastName: string;
		middleName: string;
		role: number;
	};
	text: string;
	date: string;
	id: number;
}>;
