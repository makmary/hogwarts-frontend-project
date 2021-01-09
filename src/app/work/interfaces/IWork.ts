export type IWork = Partial<{
	workInfo: any;
	mark: string;
	presFile: any;
	review?: string;
	reportFile: any;
	letter: string;
	status: number;
	created: boolean;
	commentSent: boolean;
	error: string;
	description: string;
	theme: string;
	objective: string;
	edited: boolean;
	advisory_id: any;
	researchPaper_id: number;
	text: string;
	date: any;
	isDeleted: boolean;
	statusId: number;
	id: number;
	isPushed: boolean;
	isPoped: boolean;
	isReturned: boolean;
	response: { type: string; message: string };
}>;

