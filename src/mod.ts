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

export interface EventModuleParams<T> {}

export interface EventModuleMethods<T> {
	Connect(callback: (value: T) => void): EventConnection;
	Disconnect(connection: EventConnection): void;
	Fire(value: T): void;
}

export type EventModule<T> = EventModuleMethods<T> & EventModuleParams<T>;

export type EventConnection = number;