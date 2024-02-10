// bitShiftModule
// モジュールはConnectModuleクラスを継承する
class ShiftModule extends ConnectModule {
	// セットアップ
	setup() {
		this.isCountup = false;
		this.addPort("si", true, false);  //ポート si を追加 (ポート名, IN許可, OUT許可)
		this.addPort("ck", true, false);  //ポート clock を追加 (ポート名, IN許可, OUT許可)
		this.addPort("qa", false, true);  //ポート qa を追加 (ポート名, IN許可, OUT許可)
		this.addPort("qb", false, true);  //ポート qb を追加 (ポート名, IN許可, OUT許可)
		this.addPort("qc", false, true);  //ポート qc を追加 (ポート名, IN許可, OUT許可)
		this.addPort("qd", false, true);  //ポート qd を追加 (ポート名, IN許可, OUT許可)
		this.port.qa = 0;
		this.port.qb = 0;
		this.port.qc = 0;
		this.port.qd = 0;
	}
	
	// ポート ck に値がセットされたときに動作する setter
	set_ck(value) {
		if (value) {
			if (!this.isCountup) {
				var si = this.port.si;
				if (si != 1) {
					si = 0
				}
				this.port.qd = this.port.qc;
				this.port.qc = this.port.qb;
				this.port.qb = this.port.qa;
				this.port.qa = si;
			}
			this.port.isCountup = true;
		} else {
			this.port.isCountup = false;
		}
	}
}

