export function EventModule<T>(): EventModule<T> {
	const Connections: Map<EventConnection, (value: T) => void> = new Map();

	const state: EventModuleParams<T> = {};

	const methods = (state: EventModuleParams<T>): EventModuleMethods<T> => ({
		Connect(callback: (value: T) => void): EventConnection {
			const Identifier = os.time();
			Connections.set(Identifier, callback);
			return Identifier;
		},
		Disconnect(connection: EventConnection): void {
			Connections.delete(connection);
		},
		Fire(value: T): void {
			Connections.forEach((fn) => fn(value));
		},
	});

	return methods(state);
}
