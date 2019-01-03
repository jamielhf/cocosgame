
cc.Class({
  extends: cc.Component,

  properties: {
     restart: cc.Node,
     score: cc.Label,
     back: cc.Node,
  },

  // LIFE-CYCLE CALLBACKS:

  onLoad () {
    const Canvas =  cc.find('Canvas');
    this.global = Canvas.getComponent('global');
    this.restart.on('touchstart',  ( event ) => {
        this.global.restart();
    });
    this.score.string = this.global.score;
    this.back.on('touchstart', ()=>{
      setTimeout(()=>{
          cc.director.loadScene('menu');
      }, 300);
    })
  },

  start () {

  },
  update () {
    this.score.string = this.global.score;
  },
  // update (dt) {},
});
