// TimerModule
class OscillatorModule extends ConnectModule {
	//コンストラクタ
	constructor(id) {
		super();  //継承先でコンストラクタを定義する場合は親のコンストラクタを初めに呼ぶ
		this.t = null;
	}
	// セットアップ
	setup() {
		this.addPort("clockout", false, true);  //ポート clockout を追加 (ポート名, IN許可, OUT許可)
		this.addPort("enable", true, false);    //ポート enable を追加 (ポート名, IN許可, OUT許可)
		this.port.enable = false;
		var self = this;
		setInterval(function() {
			if (self.port.enable) {
				self.port.clockout = 1;
				self.port.clockout = 0;
			}
		}, 1);
	}
	// ポート text に値がセットされたときに動作する setter
}

