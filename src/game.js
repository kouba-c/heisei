var g_mainLayer;
var GRAVITY = 0.15;
var MAX_UP_SPEED = 4.5;
var MAX_DOWN_SPEED = -5.5;
var BOOST_SPEED_X = 1.2;
var BOOST_SPEED_Y = 6.5;


var Game = cc.Layer.extend({
  screenRect:null,
  audio:null,
  init:function () {
    this._super();
    g_mainLayer = this;

    var size = cc.Director.getInstance().getWinSize();
    this.screenRect = cc.rect(0, 0, size.width, size.height);

    this.audio = cc.AudioEngine.getInstance();

    // Space Ship
    this.ship = Ship.create();
    this.addChild(this.ship, 5);

    // Enemy
    this.enemies = [];
    for (var i = 0; i < 15; i++) {
      var enemy = Enemy.create()
      this.addChild(enemy, 10);
      this.enemies.push(enemy);
    }

    // Score
    this.scoreLabel = cc.LabelTTF.create("", "Arial", 17);
    this.scoreLabel.setPosition(cc.p(20, size.height - 20));
    this.scoreLabel.setAnchorPoint(cc.p(0, 1));
    this.addChild(this.scoreLabel, 10);
    this.scheduleUpdate();
    this.setTouchEnabled(true);
    this.setKeyboardEnabled(true);

    return true;
  },

  update:function (dt) {
    var size = cc.Director.getInstance().getWinSize();

    var pos = this.ship.getPosition();
    if (this.touched) {
      var touch_dir = this.touched;
      this.touched = null;
      this.ship.boost(touch_dir);
      this.audio.playEffect(s_boost);

      this.effect = cc.Sprite.create();
      this.addChild(this.effect, 5);

      var ship_position = this.ship.getPosition();
      this.effect.setPosition(cc.p(ship_position.x + (8 * -1 * touch_dir), ship_position.y - 8));

      var anime = cc.Animation.create();
      var label1 = cc.LabelTTF.create("∵", "Arial", 18);
      var label2 = cc.LabelTTF.create("：", "Arial", 18);
      var label3 = cc.LabelTTF.create("・", "Arial", 18);
      var label4 = cc.LabelTTF.create("", "Arial", 18);
      label1.setColor(cc.c3b(255, 0, 0));
      label2.setColor(cc.c3b(255, 0, 0));
      label3.setColor(cc.c3b(255, 0, 0));
      label4.setColor(cc.c3b(255, 0, 0));
      var anime1 = label1._texture;
      var anime2 = label2._texture;
      var anime3 = label3._texture;
      var anime4 = label4._texture;
      anime.addSpriteFrameWithTexture(anime1, cc.rect(0,0,18,18));
      anime.addSpriteFrameWithTexture(anime2, cc.rect(0,0,18,18));
      anime.addSpriteFrameWithTexture(anime3, cc.rect(0,0,18,18));
      anime.addSpriteFrameWithTexture(anime4, cc.rect(0,0,18,18));
      anime.setDelayPerUnit(0.05);
      var action = cc.Animate.create(anime);
      this.effect.runAction(action);
    }

    for (var i = 0; i < this.enemies.length; i++) {
      var enemy = this.enemies[i];
      var distance = cc.pDistance(pos, enemy.getPosition());
      if (distance < 8 && this.ship.state == STATE.LIVE) {
        this.ship.kill();
      }
    }

    if (this.ship.state == STATE.DEAD) {
      if (!this.gameover) {
        this.setTouchEnabled(false);
        this.setKeyboardEnabled(false);
        this.gameover = true;
        this.onGameover();
      }
    }
    else {
      g.score++;
    }

    this.scoreLabel.setString("Score : " + g.score);
  },

  onGameover:function () {
    this.audio.playEffect(s_bomb);
    this.audio.stopMusic(s_bgm);
    var transition = cc.TransitionFade.create(1.0, new ResultScene());
    cc.Director.getInstance().replaceScene(transition);
  },

  onTouchesBegan:function (touches ,event) {
    var winSize = this.screenRect;
    if(touches[0].getLocation().x < winSize.width / 2) {
      this.touched = DIRECTION.LEFT;
    }
    else {
      this.touched = DIRECTION.RIGHT;
    }
  },
  onKeyDown:function (e) {
    if(e == cc.KEY.left) {
      this.touched = DIRECTION.LEFT;
    }
    else if(e == cc.KEY.right) {
      this.touched = DIRECTION.RIGHT;
    }
  },
});

var GameScene = cc.Scene.extend({
  onEnter:function () {

    this._super();
    var layer = new Game();
    layer.init();
    layer.audio.playMusic(s_bgm, true);
    this.addChild(layer);
  }
});

