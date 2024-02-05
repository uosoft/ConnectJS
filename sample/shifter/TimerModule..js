// TimerModule
class TimerModule extends ConnectModule {
	//コンストラクタ
	constructor(id) {
		super();  //継承先でコンストラクタを定義する場合は親のコンストラクタを初めに呼ぶ
		this.t = null;
	}
	// セットアップ
	setup() {
		this.addPort("clockout", false, true);  //ポート clockout を追加 (ポート名, IN許可, OUT許可)
		this.addPort("interval", true, false);  //ポート interval を追加 (ポート名, IN許可, OUT許可)
	}
	// ポート text に値がセットされたときに動作する setter
	set_interval(value) {
		if (this.t != null) {
			clearTimeout(this.t);
		}
		if (value != 0) {
			var self = this;
			self.t = setTimeout(function() {
				self.port.clockout = true;
				self.port.clockout = false;
				self.port.interval = value;
			}, value);
		}
	}
}

