"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function EventModule() {
    const Connections = new Map();
    const state = {};
    const methods = (_state) => ({
        Connect(callback) {
            const Identifier = os.time();
            Connections.set(Identifier, callback);
            return Identifier;
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
exports.default = EventModule;
