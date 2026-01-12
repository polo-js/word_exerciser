type Listener = () => void;

export class BaseStore<TState> {
	private state?: Partial<TState>;
	private listeners = new Set<Listener>();

	constructor(initialState?: TState) {
		this.state = initialState;
	}

	getState = () => this.state;

	protected setState(partial: Partial<TState>) {
		this.state = { ...this.state, ...partial };
		this.emit();
	}

	subscribe = (listener: Listener) => {
		this.listeners.add(listener);
		return () => {
			this.listeners.delete(listener);
		};
	};

	private emit() {
		for (const listener of this.listeners) {
			listener();
		}
	}
}