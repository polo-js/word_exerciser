export interface IProgress {
	id: number;
	title: string;
	description: string;
	typeId: number;
	imgSrc: string;
	passed: number;
	total: number;
}
