// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
  extends: cc.Component,

  properties: {
     restart: cc.Node,
     score: cc.Label,
  },

  // LIFE-CYCLE CALLBACKS:

  onLoad () {
    const Canvas =  cc.find('Canvas');
    this.global = Canvas.getComponent('global');
    this.restart.on('touchstart',  ( event ) => {
        this.global.restart();
    });
    this.score.string = this.global.score;
  },

  start () {

  },
  update () {
    this.score.string = this.global.score;
  },
  // update (dt) {},
});
