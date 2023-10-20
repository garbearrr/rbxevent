import { BaseModule } from "@rbxgar/basemodule";
export declare function EventModule<T>(): EventModule<T>;
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
