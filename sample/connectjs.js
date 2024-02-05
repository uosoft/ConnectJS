class ConnectManager {
	static _no = 0;
	
	constructor() {
		var now = new Date();
		this.name = this.constructor.name + "_" + now.getTime() + ConnectManager._no++;
		this.modules = new Object();
		this.connections = new Array();
		this.eventName = "event_" + this.name;
		addEventListener(this.eventName, this.transfer);
	}
	
	connect(module1, port1, module2, port2) {
		if (module1._id > module2._id) {
			var tmp = module1;
			module1 = module2;
			module2 = tmp;
			tmp = port1;
			port1 = port2;
			port2 = tmp;
		}
		
		var isMatch = false;
		for (var con of this.connections) {
			if (con.module1 == module1 && con.port1 == port1 && con.module2 == module2 && con.port2 == port2) {
				isMatch = true;
				break;
			}
		}
		if (!isMatch) {
			this.connections.push({
				'module1' : module1,
				'port1' : port1,
				'module2' : module2,
				'port2' : port2,
			});
			if (!module1.event[this.eventName]) {
				module1.event[this.eventName] = {
					'manager' : this
				}
			}
			if (!module2.event[this.eventName]) {
				module2.event[this.eventName] = {
					'manager' : this
				}
			}
		}
	}
	
	transfer(e) {
		for (var con of e.detail.manager.connections) {
			if (con.module1._id == e.detail.module && con.port1 == e.detail.port) {
				// 送信元に戻すようなイベントは除外（お互い送りあってループしてしまう）
				if (!(con.module2._id == e.detail.sender && con.port2 == e.detail.senderPort)) {
					con.module2.receive(con.port2, con.module1.port[con.port1], con.module1._id, con.port1);
				}
			} else if (con.module2._id == e.detail.module && con.port2 == e.detail.port) {
				// 送信元に戻すようなイベントは除外（お互い送りあってループしてしまう）
				if (!(con.module1._id == e.detail.sender && con.port1 == e.detail.senderPort)) {
					con.module1.receive(con.port1, con.module2.port[con.port2], con.module2._id, con.port2);
				}
			}
		}
	}
}

class ConnectModule {
	static _no = 0;
	
	constructor() {
		var now = new Date();
		this._id = this.constructor.name + "_" + now.getTime() + ConnectModule._no++;
		this.event = new Object();
		this.port = new ConnectModulePort();
		this.port.parent = this;
		this.eventName = "event_" + this._id;
		this.enableEvent = true;
		this.senderPortEvent == "";
		var self = this;
		addEventListener(this.eventName, function(e) {
			if (e.detail.method == "set") {
				if (typeof(self["set_" + e.detail.port]) == "function") {
					self["set_" + e.detail.port](e.detail.value);
				}
			}
		});
		this.setup();
	}
	
	setup() {
	}
	
	addPort(port, portIn, portOut) {
		this.port.add(port, portIn, portOut);
	}
	
	receive(port, value, sender, senderPort) {
		if (this.port.ports[port].in) {
			this.senderEvent = sender;
			this.senderPortEvent = senderPort;
			this.port[port] = value;
			this.senderEvent = "";
			this.senderPortEvent = "";
		}
	}
	
}

class ConnectModulePort {
	constructor() {
		this.ports = Object();
		this.parent = null;
	}
	add(port, portIn, portOut) {
		if (portIn == null) {
			portIn = true;
		}
		if (portOut == null) {
			portOut = true;
		}
		var p = {
			'value' : null,
			'in' : portIn,
			'out' : portOut,
		}
		if (typeof(this.ports[port]) == "undefined") {
			this.ports[port] = p;
			Object.defineProperty(this, port, {
				get() {
					//if (typeof(this["get_" + port]) == "function") {
					//	this["get_" + port]();
					//}
					return this.ports[port].value;
				},
				set(value) {
					this.ports[port].value = value;
					var param = {
						'detail' : {
							'method' : 'set',
							'port' : port,
							'value' : value,
						}
					}
					var event = new CustomEvent(this.parent.eventName, param);
					dispatchEvent(event);
					var param = {
						'detail' : {
							'manager' : null,
							'module' : this.parent._id,
							'port' : port,
							'value' : value,
							'sender' : this.parent.senderEvent,
							'senderPort' : this.parent.senderPortEvent,
						}
					}
					if (this.ports[port].out) {
						for (var name in this.parent.event) {
							param.detail.manager = this.parent.event[name].manager;
							var event = new CustomEvent(name, param);
							dispatchEvent(event);
						}
					}
				},
			});
			return true;
		} else {
			if (typeof(this.ports[port]) == "undefined") {
				throw port + " is an unavailable port.";
			}
			return false;
		}
	}
}
