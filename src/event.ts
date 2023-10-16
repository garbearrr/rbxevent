import { EventConnection, EventModuleMethods, EventModuleParams } from "../out/index";

export function EventModule<T>(): EventModuleMethods<T> {
	const Connections: Map<EventConnection, (value: T) => void> = new Map();

	const state: EventModuleParams<T> = {};

	const methods = (_state: EventModuleParams<T>): EventModuleMethods<T> => ({
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
