var BoostEffect = cc.Sprite.extend({
  ctor:function () {
    this._super();
  },
  init:function (position) {
    this._super();
    this.scheduleUpdate();
    this.setPosition(position);
  },
  runAction:function () {
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

    this._super(action);
  },
});

BoostEffect.create = function (position) {
  var effect = new BoostEffect();
  effect.init(position);
  return effect;
};

