
const util = require('../util/util');

cc.Class({
    extends: cc.Component,

    properties: {
        circleCenter: cc.v2(0,0), //圆心
        radian: 0, // 弧度
        circleRadius: 200,  // 半径
    },

    onLoad () {
        console.log(this.circleCenter);
    },

    start () {

    },
    /**
     * 左右移动
     * @param {*} gameNode 节点数组
     */
    moveLeftandRight(gameNode) {
        for(let i = 0; i < gameNode.length; i++) {
           
            const action = cc.sequence(
              cc.moveTo(.5, -gameNode[i].x, gameNode[i].y),
              cc.moveTo(.5, gameNode[i].x, gameNode[i].y),
            //   cc.moveBy(.4, cc.winSize.width/2, 0),
            ).speed(1).repeatForever();
            gameNode[i].runAction(action.easing(cc.easeIn(1.0)));
            this.reSetGameIcon(gameNode[i]);
        }
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
    /**
     * 中心点圆周运动
     * @param {*} gameNode 
     */
    circleMove(node) {
        if(node.radian === undefined) {
            node.radian = 0;
        }
        // 先计算弧度
        node.radian += 0.05;
        let x = this.circleRadius * Math.sin(node.radian) + cc.winSize.width/2; 
        let y = this.circleRadius * Math.cos(node.radian) + cc.winSize.height/2;
        // console.log(node.radian);
        const p = node.parent.convertToNodeSpaceAR(cc.v2(x,y));
        node.position = p;
    },
    /**
     * 半圆周运动
     * @param {*} node 
     */
    handCircleMove(node) {
        if(node.radian === undefined) {
            node.radian = 0;
        }
        // 先计算弧度
        node.radian += 0.05;
        let x = this.circleRadius * Math.sin(node.radian) + cc.winSize.width/2; 
        let y = this.circleRadius * Math.cos(node.radian) + cc.winSize.height/2;
        // console.log(node.radian);
        const p = node.parent.convertToNodeSpaceAR(cc.v2(x,y));
        node.position = p;
    },
});
