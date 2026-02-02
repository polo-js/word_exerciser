'use client';
import cn from 'classnames';
import { IMaterialDto } from './types/materials';
import { ProgressLine } from '@/shared/ui/progress';
import { MaterialBlock } from './material-block';
import { useState } from 'react';
import { materialsService } from '@/pages-content/materials/materials.service';

interface IMaterialsInfoProps {
	materialsInfo: IMaterialDto[];
}

function getProgress(materials: IMaterialDto[]) {
	const markedCount = materials.filter(({ marked }) => marked).length;
	const overallCount = materials.length;

	return overallCount ? (markedCount / overallCount) * 100 : 0;
}

export function MaterialsInfo({ materialsInfo }: IMaterialsInfoProps) {
	const [materialInfoState, setMaterialInfoState] =
		useState<IMaterialDto[]>(materialsInfo);
	const progress = getProgress(materialInfoState);
	console.log(progress);

	const materialInfoCheckHandler = (id: number, checked: boolean) => {
		if (checked) {
			void materialsService.addMaterialProgress(id);
		} else {
			void materialsService.deleteMaterialProgress(id);
		}

		setMaterialInfoState(
			materialInfoState.map((material) => {
				if (material.id === id) {
					material.marked = checked;
				}

				return material;
			})
		);
	};

	return (
		<div className="flex flex-col w-full">
			<div className="w-full">
				<ProgressLine percent={progress} />
			</div>
			<div className="mt-6 flex flex-col items-center">
				<div className="text-4xl">Справочные материалы</div>
				<div className="text-center text-lg mt-2 text-gray-600">
					Короткие объяснения по ключевым темам закупок. 
					<br />
					Откройте материал и отметьте его как просмотренный, чтобы зачесть прогресс.
				</div>
				<div
					className={cn('mt-8', 'grid', 'grid-cols-2 auto-rows-fr', 'w-full', 'gap-6')}
				>
					{materialsInfo.map((material) => (
						<MaterialBlock
							material={material}
							key={material.id}
							onValueChange={materialInfoCheckHandler}
						/>
					))}
				</div>
			</div>
		</div>
	);
}
