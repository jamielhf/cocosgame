
cc.Class({
  extends: cc.Component,

  properties: {
    score: cc.Label,
  },

  onLoad () {
    const Canvas =  cc.find('Canvas');
    this.global = Canvas.getComponent('global');
    this.score.string = this.global.score;
  },
  start () {
  },
  update () {
    this.score.string = this.global.score;
  },
});
