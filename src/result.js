var g = {
  score:0,
};

var Result = cc.Layer.extend({
  init:function () {
    this._super();
    var size = cc.Director.getInstance().getWinSize();

    var resultLabel = cc.LabelTTF.create("Socre : " + g.score, "Arial", 20);
    resultLabel.setPosition(cc.p(size.width / 2, size.height / 2 + 25));
    this.addChild(resultLabel);

    var highScore = parseInt(sys.localStorage.getItem("Heisei3/highScore") || 0);
    if (g.score > highScore) {
      highScore = g.score;
      sys.localStorage.setItem("Heisei3/highScore", highScore);
    }
    var highLabel = cc.LabelTTF.create("HighScore : " + highScore, "Arial", 20);
    highLabel.setPosition(cc.p(size.width / 2, size.height / 2 - 25));
    this.addChild(highLabel);


    var goGameScene = function () {
      g.score = 0;
      cc.Director.getInstance().replaceScene(new GameScene());
    };
    this.scheduleOnce(function () {
      this.onTouchesBegan = function (touches, event) { goGameScene(); };
      this.onKeyDown = function (e) { goGameScene(); };
    }, 1.0);

    this.setTouchEnabled(true);
    this.setKeyboardEnabled(true);
    return true;
  },

  onTouchesBegan:function (touches, event) {},
  onTouchesBegan:function (touches, event) {},
  onTouchesBegan:function (touches, event) {},
  onTouchesBegan:function (touches, event) {},
});

var ResultScene = cc.Scene.extend({
  onEnter:function () {
    this._super();
    var layer = new Result();
    layer.init();
    this.addChild(layer);
  }
});

