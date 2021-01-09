export type IPaper = Partial<{
	id: number;
	author_id: {lastName: string; firstName: string; middleName: string };
	description: string;
	theme: string;
	advisory_id: string;
}>;
