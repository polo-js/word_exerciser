'use client';
import { IMaterialsInfoDto } from './types/materials';
import { ProgressLine } from '@/shared/ui/progress';

interface IMaterialsInfoProps {
	materialsInfo: IMaterialsInfoDto;
}

export function MaterialsInfo({ materialsInfo }: IMaterialsInfoProps) {
	return (
		<div className="flex flex-col w-full">
			<div className="w-full">
				<ProgressLine percent={materialsInfo.progress} />
			</div>
			<div></div>
		</div>
	);
}
