// タグに入力したものを表示するモジュール
class OutputTextModule extends ConnectModule {
	//コンストラクタ
	constructor() {
		super();  //継承先でコンストラクタを定義する場合は親のコンストラクタを初めに呼ぶ
		this.elm = null;
	}
	// セットアップ
	setup() {
		this.addPort("text", true, true);  //ポート text を追加 (ポート名, IN許可, OUT許可)
	}
	// 表示するエレメント（タグ）のIDを指定
	setElement(id) {
		this.elm = document.getElementById(id);
	}
	// ポート text に値がセットされたときに動作する setter
	set_text(value) {
		this.elm.innerText = value;
	}
}

