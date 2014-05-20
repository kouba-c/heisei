var BoostEffect = cc.LabelTTF.extend({
  ctor:function () {
    this._super();
    this.initWithString("" , "Arial", 18, cc.SIZE_ZERO, cc.TEXT_ALIGNMENT_CENTER, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
    this.setColor(cc.c3b(255, 0, 0));
  },
  init:function () {
    this.scheduleUpdate();
  },
  runAction:function () {
    var action = cc.Sequence.create(
      this.changeLabelAnime("∵"),
      cc.DelayTime.create(0.05),
      this.changeLabelAnime("："),
      cc.DelayTime.create(0.05),
      this.changeLabelAnime("・"),
      cc.DelayTime.create(0.05),
      this.changeLabelAnime("")
      );
    this._super(action);
  },
  changeLabelAnime:function (str) {
    return cc.CallFunc.create(function () { this.setString(str); }, this)
  },
});

BoostEffect.create = function () {
  var effect = new BoostEffect();
  effect.init();
  return effect;
};

