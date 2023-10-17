"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventModule = void 0;
function EventModule() {
    const Connections = new Map();
    const state = {};
    const methods = (state) => ({
        Connect(callback) {
            const Identifier = os.time();
            Connections.set(Identifier, callback);
            return Identifier;
        },
        Destroy() {
            Connections.clear();
        },
        Disconnect(connection) {
            Connections.delete(connection);
        },
        Fire(value) {
            Connections.forEach((fn) => fn(value));
        },
    });
    return methods(state);
}
exports.EventModule = EventModule;
