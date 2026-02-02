import { ALL_EXERCISES_TYPES } from './types/exercises-types';
import { ProgressDto } from './schema/progress.dto';

export const FINAL_TEST_THRESHOLD_PERCENT = 80;

export const EXERCISES_TERMS_TYPE = 1;
export const EXERCISES_PHRASES_TYPE = 2;
export const EXERCISES_FINAL_TEST_TYPE = 3;
export const MATERIALS_SYNTHETIC_TYPE = 'materials';

export const PART_PROGRESS_SETTINGS: Record<
	ALL_EXERCISES_TYPES,
	Omit<ProgressDto, 'progressText'>
> = {
	[EXERCISES_TERMS_TYPE]: {
		id: 1,
		title: 'Термины',
		description: 'Изучайте профессиональные термины',
		imgSrc: '/assets/img/office.svg',
		hrefToMaterials: '/terms',
	},
	[EXERCISES_PHRASES_TYPE]: {
		id: 2,
		title: 'Фразы',
		description: 'Практикуйте деловые фразы',
		imgSrc: '/assets/img/advertising.svg',
		hrefToMaterials: '/phrases',
	},
	[MATERIALS_SYNTHETIC_TYPE]: {
		id: 3,
		title: 'Справочный материал',
		description: 'Ознакомьтесь с различными полезными материалами',
		imgSrc: '/assets/img/book.svg',
		hrefToMaterials: '/reference-materials',
	},
};
