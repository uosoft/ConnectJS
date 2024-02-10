// LEDModule
// モジュールはConnectModuleクラスを継承する
class LEDModule extends ConnectModule {
	//コンストラクタ
	constructor(led) {
		super();  //継承先でコンストラクタを定義する場合は親のコンストラクタを初めに呼ぶ
		this.led = document.getElementById(led);
	}
	// セットアップ
	setup() {
		this.addPort("led", true, false);  //ポート led1 を追加 (ポート名, IN許可, OUT許可)
	}
	// ポート led に値がセットされたときに動作する setter
	set_led(value) {
		if (value == 1) {
			this.led.style.backgroundColor = "#ff0000";
		} else {
			this.led.style.backgroundColor = "#ffffff";
		}
	}
}

