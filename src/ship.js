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
    this.setPosition(cc.p(winSize.width / 2, winSize.height / 2 + 100));
    this.state = STATE.LIVE;
  },
  update:function (dt) {
    var winSize = g_mainLayer.screenRect;
    var pos = this.getPosition();
    this.v = cc.p(this.v.x, this.speedAdjust(this.v.y - GRAVITY));
    this.setPosition(pos.x + this.v.x, pos.y + this.v.y);

    if (pos.x < -10 || pos.x > winSize.width + 10 || pos.y < -20 || pos.y > winSize.height + 10) {
      this.state = STATE.DEAD;
    }
  },
  boost:function (dir) {
    if(this.state == STATE.LIVE) {
      this.v = cc.p(BOOST_SPEED_X * dir, this.speedAdjust(this.v.y + BOOST_SPEED_Y));
    }
  },
  speedAdjust: function(cur_sp) {
    if(cur_sp > MAX_UP_SPEED) {
      return MAX_UP_SPEED;
    }
    else if(cur_sp < MAX_DOWN_SPEED) {
      return MAX_DOWN_SPEED;
    }
    else {
      return cur_sp;
    }
  },
});

Ship.create = function () {
  var ship = new Ship();
  ship.init();
  return ship;
};

