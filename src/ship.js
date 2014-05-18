var DIRECTION = {
  LEFT:-1,
  RIGHT:+1,
};

var STATE = {
  LIVE:0,
  DEAD:1,
};

var Ship = cc.LabelTTF.extend({
  state:STATE.LIVE,
  v:cc.p(0,0),
  ctor:function () {
    this._super();
    this.initWithString("Ё" , "Arial", 18, cc.SIZE_ZERO, cc.TEXT_ALIGNMENT_CENTER, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
    this.setColor(cc.c3b(255, 255, 255));
  },
  init:function () {
    this.scheduleUpdate();
    this.initState();
  },
  initState:function () {
    var winSize = g_mainLayer.screenRect;
    this.direction = randomDirection();
    this.setPosition(cc.p(winSize.width / 2, winSize.height / 2));
    this.state = STATE.LIVE;
  },
  update:function (dt) {
    var winSize = g_mainLayer.screenRect;
    var pos = this.getPosition();
    this.setPosition(pos.x + this.v.x, pos.y + this.v.y);

    if (pos.x < 0 || pos.x > winSize.width || pos.y < 0 || pos.y > winSize.height) {
      this.state = STATE.DEAD;
    }
  }
});

Ship.create = function () {
  var ship = new Ship();
  ship.init();
  return ship;
};

