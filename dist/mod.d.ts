export declare function EventModule<T>(): EventModule<T>;
export interface EventModuleParams<T> {
}
export interface EventModuleMethods<T> {
    Connect(callback: (value: T) => void): EventConnection;
    Destroy(): void;
    Disconnect(connection: EventConnection): void;
    Fire(value: T): void;
}
export type EventModule<T> = EventModuleMethods<T> & EventModuleParams<T>;
export type EventConnection = number;
