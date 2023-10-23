-- Compiled with roblox-ts v2.2.0
local TS = _G[script]
local DeclareModule = TS.import(script, TS.getModule(script, "@rbxgar", "basemodule").dist.mod).DeclareModule
local function EventModule()
	local Connections = {}
	local state = {
		IsDestroyed = false,
	}
	local methods = function(state)
		return {
			Connect = function(self, callback)
				local Identifier = os.time()
				local _callback = callback
				Connections[Identifier] = _callback
				return Identifier
			end,
			Destroy = function(self)
				table.clear(Connections)
			end,
			Disconnect = function(self, connection)
				local _connection = connection
				Connections[_connection] = nil
			end,
			Fire = function(self, value)
				local _arg0 = function(fn)
					return fn(value)
				end
				for _k, _v in Connections do
					_arg0(_v, _k, Connections)
				end
			end,
		}
	end
	local IsDestroyed = function(state)
		return state.IsDestroyed
	end
	local _object = {}
	for _k, _v in methods(state) do
		_object[_k] = _v
	end
	_object.IsDestroyed = function()
		return IsDestroyed(state)
	end
	local Module = _object
	return DeclareModule(Module)
end
return {
	EventModule = EventModule,
}
