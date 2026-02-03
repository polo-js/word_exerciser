import { JSX } from 'react';

export interface IProfileProgress {
	totalProgress: number;
	finalTestIsAvailable: boolean;
	progressList: IProgress[];
}

export interface IProgress {
	id: number;
	title: string;
	description: string;
	imgSrc: string;
	progressText: string | JSX.Element;
	hrefToMaterials?: string;
}
