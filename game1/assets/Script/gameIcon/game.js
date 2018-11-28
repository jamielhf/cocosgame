
const gameIconMove = require('gameIconMove');
console.log(gameIconMove);

cc.Class({
    extends: gameIconMove,
    properties: {
      pork: cc.Node,
      corn: cc.Node,
    },
    onLoad() {
      const Canvas =  cc.find('Canvas');
      this.global = Canvas.getComponent('global');
      
      console.log(cc.winSize);
    },
    start () {
      console.log(this.pork);
      var N_pos = this.pork.parent.convertToNodeSpaceAR(cc.p(cc.winSize.width/2,cc.winSize.height/2));
      this.pork.setPosition(N_pos);
      console.log(this.pork);
      // this.pork.position = cc.v2(100, 50);
      this.pork.active = true;
    },
    update() {

    }

});
