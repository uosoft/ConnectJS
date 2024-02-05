// <div>タグに入力したものを表示するモジュール
class CounterModule extends ConnectModule {
	//コンストラクタ
	constructor() {
		super();  //継承先でコンストラクタを定義する場合は親のコンストラクタを初めに呼ぶ
		this.isCountup = false;
	}
	// セットアップ
	setup() {
		this.addPort("count", true, true);  //ポート count を追加 (現在のカウント値) (ポート名, IN許可, OUT許可)
		this.addPort("countup");  //ポート countup を追加 (trueになったときにカウントアップ) (ポート名, IN許可, OUT許可)
		this.port.count = 0;
	}
	
	// ポート countup に値がセットされたときに動作する setter
	set_countup(value) {
		if (value) {
			if (!this.isCountup) {
				this.port.count++;
			}
			this.port.isCountup = true;
		} else {
			this.port.isCountup = false;
		}
	}
}

