// <div>タグに入力したものを表示するモジュール
class CounterModule extends ConnectModule {
	// セットアップ
	setup() {
		this.isCountup = false;
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

