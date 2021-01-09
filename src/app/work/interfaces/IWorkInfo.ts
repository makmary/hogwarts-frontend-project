export type IWorkInfo = Partial<{
	id: number;
	consultant_id?: number;
	advisory_id: number;
	review?: string;
	description: string;
	theme: string;
	objective: string;
	results: string;
	content: string;
	sources: string;
	reportFile: string;
	presentationFile: string;
	classes: any;

	consultantLastName: string;
	consultantFirstName: string;
	consultantMiddleName: string;

	advisoryLastName: string;
	advisoryFirstName: string;
	advisoryMiddleName: string;
	advisoryEmail: string;
	advisoryPhone: string;
	advisoryWorkPlace: string;
	advisoryPosition: string;
	advisoryAcademicRank: string;
	advisoryAcademicDegree: string;

	authorLastName: string;
	authorFirstName: string;
	authorMiddleName: string;
	authorEmail: string;
	authorPhone: string;
	authorGroup: string;
	advisoryID: number;
	isNew: boolean;
}>;
