
// Memory64KModule
class Memory64KModule extends ConnectModule {
	// セットアップ
	setup() {
		this.mem = Array(65536).fill(0);
		this.addPort("mem_read", true, false);   //ポート mem_read を追加 (ポート名, IN許可, OUT許可)
		this.addPort("mem_write", true, false);  //ポート mem_write を追加 (ポート名, IN許可, OUT許可)
		this.addPort("mem_value", true, true);   //ポート mem_write を追加 (ポート名, IN許可, OUT許可)
	}
	
	set_mem_read(address) {
		this.port.mem_value = this.mem[address];
	}
	
	set_mem_write(address) {
		this.mem[address] = this.port.mem_value
	}
	
}

