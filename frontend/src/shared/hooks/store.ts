import { useLayoutEffect, useState } from 'react';
import { BaseStore } from '@/shared/lib/base.store';

export function useService<IStore extends BaseStore<any>>(
	service: IStore
): IStore extends BaseStore<infer State> ? Readonly<State> : never {
	const [, setState] = useState<Record<string, unknown>>({});

	useLayoutEffect(() => {
		const forceUpdate = () => setState({});
		const unsubscribe = service.subscribe(forceUpdate);
		return () => unsubscribe();
	}, [service]);

	// eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/no-unsafe-return
	return service.getState() as any;
}
