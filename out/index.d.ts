export declare interface EventModuleParams<T> {}

export declare interface EventModuleMethods<T> {
	Connect(callback: (value: T) => void): EventConnection;
	Disconnect(connection: EventConnection): void;
	Fire(value: T): void;
}

export declare type EventModule<T> = EventModuleMethods<T> & EventModuleParams<T>;

export declare type EventConnection = number;
