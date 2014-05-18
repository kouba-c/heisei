var g_mainLayer;

var Game = cc.Layer.extend({
  screenRect:null,
  init:function () {
    this._super();
    g_mainLayer = this;

    var size = cc.Director.getInstance().getWinSize();
    this.screenRect = cc.rect(0, 0, size.width, size.height);


    // Space Ship
    this.ship = cc.LabelTTF.create("Ё", "Arial", 18);
    this.ship.setPosition(cc.p(size.width / 2, size.height / 2));
    this.addChild(this.ship, 5);

    this.enemies = [];
    for (var i = 0; i < 15; i++) {
      var enemy = Enemy.create()
      this.addChild(enemy, 10);
      this.enemies.push(enemy);
    }

    this.scoreLabel = cc.LabelTTF.create("", "Arial", 17);
    this.scoreLabel.setPosition(cc.p(20, size.height - 20));
    this.scoreLabel.setAnchorPoint(cc.p(0, 1));
    this.addChild(this.scoreLabel, 10);
    this.scheduleUpdate();
    this.setTouchEnabled(true);

    return true;
  },

  update:function (dt) {
    var size = cc.Director.getInstance().getWinSize();

    var pos = this.ship.getPosition();
    if (this.touched) {
      var k = 0.9;
      pos.y = (pos.y * k) + (this.touched.y * (1.0 - k));
      this.ship.setPosition(pos);
    }

    for (var i = 0; i < this.enemies.length; i++) {
      var enemy = this.enemies[i];
      var distance = cc.pDistance(pos, enemy.getPosition());
      if (distance < 8) {
        if (!this.gameover) {
          this.gameover = true;
          this.onGameover();
        }
      }
    }

    this.scoreLabel.setString("Score::" + g.score);

    g.score++;
  },

  onGameover:function () {
    var audioEngine = cc.AudioEngine.getInstance();
    audioEngine.playEffect(s_bomb);
    audioEngine.stopMusic(s_bgm);
    var transition = cc.TransitionFade.create(1.0, new ResultScene());
    cc.Director.getInstance().replaceScene(transition);
  },

  onTouchesBegan:function (touches ,event) {
    this.touched = touches[0].getLocation();
  },
  onTouchesMoved:function (touches ,event) {
    this.touched = touches[0].getLocation();
  },
  onTouchesEnded:function (touches ,event) {
    this.touched = null;
  },
  onTouchesCancelled:function (touches ,event) {
    this.touched = null;
  },
});

var GameScene = cc.Scene.extend({
  onEnter:function () {
    var audioEngine = cc.AudioEngine.getInstance();
    audioEngine.playMusic(s_bgm, true);

    this._super();
    var layer = new Game();
    layer.init();
    this.addChild(layer);
  }
});

