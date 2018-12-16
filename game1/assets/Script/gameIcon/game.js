
const gameIconMove = require('gameIconMove');
const util = require('../util/util');

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
      // this.allItem = ['pork', 'corn', 'tomato', 'tomato2', 'mushroom', 'octopus'];
      this.allItem = ['pork', 'corn', 'tomato', 'tomato2', 'mushroom', 'octopus'];
      const Canvas =  cc.find('Canvas');
      this.global = Canvas.getComponent('global');
      const Pens = cc.find('Canvas/pens');
      this.pens = Pens.getComponent('pen');
      this.startNew = true;
    },
    /**
     * 随机取节点 默认取一个
     */
    getRandomOneNode(num = 1) {
      if(num !== 1) {
        const arr = [].concat(this.allItem);
        let result = [];
        this.gameNodeList = [];
        let ranNum = num;
        for (let i = 0; i < ranNum; i++) {
          let ran = Math.floor(Math.random() * arr.length);
          // console.log()
          result.push(this[[arr.splice(ran, 1)[0]]]);
        };
        return result;
      } else {
        const r = Math.floor(this.allItem.length * Math.random());
        return [this[this.allItem[r]]];
      }   
    },
    start () {
    },
    /**
     * 放置一个固定的
     */
   startOne() {
      this.gameNode = this.getRandomOneNode();
      const N_pos = this.gameNode[0].parent.convertToNodeSpaceAR(cc.v2(cc.winSize.width/2,cc.winSize.height/2));
      this.gameNode[0].setPosition(N_pos);
      this.gameNode[0].active = true;
   },
   /**
    * 圆周运动
    * @param {*} num 
    */
    setCircleMove(num = 1) {
      this.global.gameItem = num;
      this.gameNode = this.getRandomOneNode(num);

      this.gameNode.map((i, k)=>{
        this.reSetGameIcon(i);
        i.radian = util.getRadian(k*60);
        const gameIcon = i.getComponent('gameIcon');
        gameIcon.runAction('circleAction');
      });
     
    },
    /**
     * 左右移动
     * @param {*} num 
     */
    moveLR(num = 1) {
      this.global.gameItem = num;
      this.gameNode = this.getRandomOneNode(num);
      console.log(this.gameNode);
      if (num>1) {
        const N_pos = this.gameNode[0].parent.convertToNodeSpaceAR(cc.v2(0,cc.winSize.height/2 - 70));
        this.gameNode[0].setPosition(N_pos);
        const N_pos2 = this.gameNode[1].parent.convertToNodeSpaceAR(cc.v2(cc.winSize.width,cc.winSize.height/2 + 70));
        this.gameNode[1].setPosition(N_pos2);
      } else {
        const N_pos = this.gameNode[0].parent.convertToNodeSpaceAR(cc.v2(cc.winSize.width,cc.winSize.height/2));
        this.gameNode[0].setPosition(N_pos);
      }
      this.moveLeftandRight(this.gameNode);
    },
    cardinalSplineAction(num) {
      this.global.gameItem = num;
      this.gameNode = this.getRandomOneNode(num);
      if (num>1) {
        const N_pos = this.gameNode[0].parent.convertToNodeSpaceAR(cc.v2(cc.winSize.width/2,cc.winSize.height/2));
        this.gameNode[0].setPosition(N_pos);
        const N_pos2 = this.gameNode[1].parent.convertToNodeSpaceAR(cc.v2(cc.winSize.width/2,cc.winSize.height/2));
        this.gameNode[1].setPosition(N_pos2);
      } else {
        const N_pos = this.gameNode[0].parent.convertToNodeSpaceAR(cc.v2(cc.winSize.width/2,cc.winSize.height/2));
        this.gameNode[0].setPosition(N_pos);
      }
      this.cardinalSplineTo(this.gameNode);
    },
    jumpMoveAction(num) {
      this.global.gameItem = num;
      this.gameNode = this.getRandomOneNode(num);
      if (num>1) {
        const N_pos = this.gameNode[0].parent.convertToNodeSpaceAR(cc.v2(0,cc.winSize.height/2 - 70));
        this.gameNode[0].setPosition(N_pos);
        const N_pos2 = this.gameNode[1].parent.convertToNodeSpaceAR(cc.v2(cc.winSize.width,cc.winSize.height/2 + 70));
        this.gameNode[1].setPosition(N_pos2);
      } else {
        const N_pos = this.gameNode[0].parent.convertToNodeSpaceAR(cc.v2(0,cc.winSize.height/2));
        this.gameNode[0].setPosition(N_pos);
      }
      this.jumpByMove(this.gameNode);
    },
    /**
     * 重新设置关卡
     */
    reStart() {
      console.log('重新设置关卡');
      this.startNew = true;
    },
    update(e) {
      if(this.startNew && this.global.level > 0) {
        switch (this.global.level) {
          case 1 : this.startOne();break;
          case 2 : this.moveLR(1);break;
          case 3 : this.setCircleMove(1); break;
          case 4 : this.jumpMoveAction(1);break
          case 5 : this.setCircleMove(3); break;
          case 6 : this.jumpMoveAction(2); break;
          default: 
            const ranNum = Math.floor(Math.random() * 11);
            switch (ranNum) {
              case 0: this.cardinalSplineAction(1);break;
              case 1: this.cardinalSplineAction(2);break;
              case 2: this.setCircleMove(2);break;
              case 3: this.setCircleMove(3);break;
              case 4: this.cardinalSplineAction(2);break;
              case 5: this.setCircleMove(5);break;
              case 6: this.setCircleMove(6);break;
              case 7: this.jumpMoveAction(1);break;
              case 8: this.jumpMoveAction(2);break;
              case 9: this.moveLR(1);break;
              case 10: this.moveLR(2);break;
             
            }
          break;
        }
        this.startNew = false;
      }
      // console.log(1);
     
    }

});
