import cn from 'classnames';
import Image from 'next/image';
import { FaCheck } from 'react-icons/fa';
import Link from 'next/link';
import { IMaterialDto } from './types/materials';
import { Label, Checkbox } from 'radix-ui';
import { useRouter } from 'next/navigation';

interface IMaterialBlockProps {
	material: IMaterialDto;
	onValueChange: (id: number, value: boolean) => void;
}

export function MaterialBlock({ material, onValueChange }: IMaterialBlockProps) {
	const router = useRouter();
	const onCheckedChange = (value: boolean) => {
		onValueChange(material.id, value);
	};

	return (
		<div
			className={cn(
				'shadow-small-card pt-6 pb-4 px-4',
				'flex flex-col gap-2 justify-between',
				'w-full h-full',
				'rounded-md',
				'cursor-pointer'
			)}
			onClick={() => {
				router.push(material.hrefToMaterials);
			}}
		>
			<div className="flex gap-2">
				<div className="shrink-0">
					<Image
						src={material.imgSrc}
						width={140}
						height={100}
						alt="IMG: Справочный материал"
						className="w-[140px] h-[100px]"
					/>
				</div>
				<div>
					<div className="text-2xl">{material.title}</div>
					<div className="text-gray-600 text-lg">{material.description}</div>
				</div>
			</div>
			<div
				className="flex gap-2 self-end"
				onClick={(e) => {
					e.stopPropagation();
				}}
			>
				<Checkbox.Root
					className={cn(
						'bg-[#FBF9FC]',
						'p-2',
						'pr-4',
						'rounded',
						'flex items-center justify-center gap-2',
						'shadow--inner-border',
						'cursor-pointer',
						'hover:bg-[#F1EFF2]'
					)}
					id={String(material.id)}
					onCheckedChange={onCheckedChange}
					checked={material.marked}
				>
					<div
						className={cn(
							material.marked ? 'bg-emerald-400' : 'bg-white',
							'shadow--card-border',
							'w-[25px]',
							'h-[25px]',
							'rounded',
							'flex items-center justify-center'
						)}
					>
						<Checkbox.Indicator className={cn('text-white')}>
							<FaCheck />
						</Checkbox.Indicator>
					</div>
					<Label.Root className="cursor-pointer" htmlFor={String(material.id)}>
						Просмотрено
					</Label.Root>
				</Checkbox.Root>
			</div>
		</div>
	);
}
