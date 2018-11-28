
cc.Class({
  extends: cc.Component,

  properties: {
    heard1: cc.Node,
    heard2: cc.Node,
    heard3: cc.Node,
  },

  onLoad () {
    const Canvas =  cc.find('Canvas');
    this.global = Canvas.getComponent('global');
    console.log(this.global.life);
  },
  start () {
  },
  update () {
    // 更新生命的数量
    switch(this.global.life) {
      case 0 : 
        this.heard1.active = false;
        this.heard2.active = false;
        this.heard3.active = false;
      break;
      case 1 : 
        this.heard2.active = false;
        this.heard3.active = false;
      break;
      case 2 : 
        this.heard3.active = false;
      break;
    }
  },
});
