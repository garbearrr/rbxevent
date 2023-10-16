interface EventModuleParams<T> {}

interface EventModuleMethods<T> {
	Connect(callback: (value: T) => void): EventConnection;
	Disconnect(connection: EventConnection): void;
	Fire(value: T): void;
}

type EventModule<T> = EventModuleMethods<T> & EventModuleParams<T>;

type EventConnection = number;
