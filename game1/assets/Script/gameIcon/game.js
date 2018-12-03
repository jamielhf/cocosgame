
const gameIconMove = require('gameIconMove');
console.log(gameIconMove);

cc.Class({
    extends: gameIconMove,
    properties: {
      pork: cc.Node,
      corn: cc.Node,
      octopus: cc.Node,
      tomato: cc.Node,
      tomato2: cc.Node,
      mushroom: cc.Node,
    },
    onLoad() {
      this.allItem = ['pork', 'corn', 'tomato', 'tomato2', 'mushroom', 'octopus'];
      const Canvas =  cc.find('Canvas');
      this.global = Canvas.getComponent('global');
      const Pens = cc.find('Canvas/pens');
      this.pens = Pens.getComponent('pen');
      this.render = false;
      console.log(this.pens.node);
    },
    /**
     * 随机取一个节点
     */
    getRandomOneNode() {
      const r = Math.floor(this.allItem.length * Math.random());
      // console.log(node);
      return this[this.allItem[r]];
    },
    start () {
      // 随机取结点中的一个
      this.gameNode = this.getRandomOneNode();
      // console.log(node);
      const N_pos = this.gameNode.parent.convertToNodeSpaceAR(cc.v2(cc.winSize.width/2,cc.winSize.height/2));
      this.gameNode.setPosition(N_pos);
      this.gameNode.active = true;
    },
   
    /**
     * 左右移动
     */
    moveLeftandRight() {
      const gameNode = this.getRandomOneNode();
      const N_pos = gameNode.parent.convertToNodeSpaceAR(cc.v2(50, cc.winSize.height / 2));
      gameNode.setPosition(N_pos);
      this.reSetGameIcon(gameNode);
      const action = cc.sequence(
        cc.moveBy(.7, cc.winSize.width - 100, 0),
        cc.moveBy(.7, 100 - cc.winSize.width, 0),
      ).speed(1).repeatForever();
      gameNode.runAction(action);
    },
    /**
     * 重制节点
     * @param {s} gameNode 
     */
    reSetGameIcon(gameNode) {
      gameNode.opacity = 255;
      gameNode.scaleY = .5;
      gameNode.scaleX = .5;
      gameNode.rotation = 0;
      gameNode.active = true;
    },
    update(e) {
      if(!this.render && this.global.level > 1) {
        this.pens.reSetPen();
        if (this.global.level === 2) {
          this.moveLeftandRight();
          this.render = true;
        }
      }
    }

});
