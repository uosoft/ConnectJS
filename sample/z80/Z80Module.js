
// Z80Module
// モジュールはConnectModuleクラスを継承する
class Z80Module extends ConnectModule {
	//コンストラクタ
	constructor() {
		super();  //継承先でコンストラクタを定義する場合は親のコンストラクタを初めに呼ぶ
	}
	// セットアップ
	setup() {
		this.enableClock = true;
		var self = this;
		this.z80 = new Z80( {
			mem_read: function(address) {
				self.port.mem_read = address;
				var value = self.port.mem_value
				console.log("READ  :", address, value);
				return value;
			},
			mem_write: function(address, value) {
				self.port.mem_value = value;
				self.port.mem_write = address
				console.log("WRITE :", address, value);
			},
			io_read: function(address) {
				self.port.io_read = address;
				return self.port.io_value;
			},
			io_write: function(address, value) {
				self.port.io_value = value;
				self.port.io_write = address
			},
		});
		this.addPort("mem_read", false, true);   //ポート mem_read を追加 (ポート名, IN許可, OUT許可)
		this.addPort("mem_write", false, true);  //ポート mem_write を追加 (ポート名, IN許可, OUT許可)
		this.addPort("mem_value", true, true);   //ポート mem_write を追加 (ポート名, IN許可, OUT許可)
		this.addPort("io_read", false, true);    //ポート io_read を追加 (ポート名, IN許可, OUT許可)
		this.addPort("io_write", false, true);   //ポート io_write を追加 (ポート名, IN許可, OUT許可)
		this.addPort("io_value", true, true);    //ポート io_write を追加 (ポート名, IN許可, OUT許可)
		this.addPort("clock", true, false);      //ポート clock を追加 (ポート名, IN許可, OUT許可)
	}
	
	reset() {
		this.z80.reset();
	}
	
	set_clock(value) {
		if (value == 1) {
			if (this.enableClock) {
				this.z80.run_instruction();
				this.enableClock = false;
			}
		} else {
			this.enableClock = true;
		}
	}
}

