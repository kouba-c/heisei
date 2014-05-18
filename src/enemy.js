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
  init:function () {
    this.scheduleUpdate();
    this.initState();
  },
  initState:function () {
    var winSize = g_mainLayer.screenRect;
    this.direction = randomDirection();
    this.v = cc.p((Math.random() * 2 + 2) * this.direction, 0);

    var startPostionAdjust = Math.random() * 3 * 100;
    var xPosition = (this.direction == DIRECTION.RIGHT) ? 0 - startPostionAdjust : winSize.width + startPostionAdjust;
    this.setPosition(xPosition, Math.random() * winSize.height);
  },
  update:function (dt) {
    var winSize = g_mainLayer.screenRect;
    var pos = this.getPosition();
    this.setPosition(pos.x + this.v.x, pos.y);

    if (pos.x < 0          && this.direction == DIRECTION.LEFT)  this.initState();
    if (pos.x > winSize.width && this.direction == DIRECTION.RIGHT) this.initState();
  }
});

Enemy.create = function () {
  var enemy = new Enemy();
  enemy.init();
  return enemy;
};

