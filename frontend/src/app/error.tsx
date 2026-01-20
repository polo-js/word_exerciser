'use client';
import { MainWrapper } from '@/shared/ui/wrapper';

export default function Error() {
	return (
		<MainWrapper fullHeight className="flex items-center justify-center">
			<h1 className="text-3xl">Упс, что-то пошло не так</h1>
		</MainWrapper>
	);
}
