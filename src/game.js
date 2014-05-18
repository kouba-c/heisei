var DIRECTION = {
  LEFT:-1,
  RIGHT:+1,
};

function randomDirection() {
  var direction = Math.random() - 0.5;
  if (direction >= 0) {
    return DIRECTION.RIGHT;
  }
  else {
    return DIRECTION.LEFT;
  }
};

var Enemy = cc.LabelTTF.extend({
  ctor:function () {
    this._super();
    this.initWithString("㍻" , "Arial", 18, cc.SIZE_ZERO, cc.TEXT_ALIGNMENT_CENTER, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
    this.setColor(cc.c3b(255, 0, 0));
  },
  initState:function () {
    this.direction = randomDirection();

    this.v = cc.p((Math.random() * 2 + 2) * this.direction, 0);

    var size = cc.Director.getInstance().getWinSize();
    var startPostionAdjust = Math.random() * 3 * 100;
    var xPosition = this.direction == DIRECTION.RIGHT ?  0 - startPostionAdjust : size.width + startPostionAdjust;
    this.setPosition(cc.p(
          xPosition,
          Math.random() * size.height));
  },
});

Enemy.create = function () {
  var enemy = new Enemy();
  enemy.initState();
  return enemy;
};

var Game = cc.Layer.extend({
  init:function () {
    this._super();
    var size = cc.Director.getInstance().getWinSize();

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

    for (var i =  0; i < this.enemies.length; i++) {
      var enemy = this.enemies[i];
      var pos = enemy.getPosition();
      pos = cc.p(pos.x, pos.y);
      pos.x += enemy.v.x;
      pos.y += enemy.v.y;

      if (pos.x < 0          && enemy.direction == DIRECTION.LEFT)  pos.x = size.width + 50;
      if (pos.x > size.width && enemy.direction == DIRECTION.RIGHT) pos.x = -50;
      if (pos.y < 0) pos.y = size.height;
      if (pos.y > size.height) pos.y = 0;
      enemy.setPosition(pos);
    }

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

