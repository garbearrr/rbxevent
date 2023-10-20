import { BaseModule, DeclareModule } from "@rbxgar/basemodule";

export function EventModule<T>(): EventModule<T> {
	const Connections: Map<EventConnection, (value: T) => void> = new Map();

	const state: EventModuleParams<T> = {
		IsDestroyed: false,
	};

	const methods = (state: EventModuleParams<T>): EventModuleMethods<T> => ({
		Connect(callback: (value: T) => void): EventConnection {
			const Identifier = os.time();
			Connections.set(Identifier, callback);
			return Identifier;
		},
		Destroy(): void {
			Connections.clear();
		},
		Disconnect(connection: EventConnection): void {
			Connections.delete(connection);
		},
		Fire(value: T): void {
			Connections.forEach((fn) => fn(value));
		},
	});

	const IsDestroyed = (state: EventModuleParams<T>) => state.IsDestroyed;

	const Module = { ...methods(state), IsDestroyed: () => IsDestroyed(state) };
	return DeclareModule(Module);
}

export interface EventModuleParams<T> {
	IsDestroyed: boolean;
}

export interface EventModuleMethods<T> {
	Connect(callback: (value: T) => void): EventConnection;
	Destroy(): void;
	Disconnect(connection: EventConnection): void;
	Fire(value: T): void;
}

export type EventModule<T> = EventModuleMethods<T> & BaseModule;

export type EventConnection = number;