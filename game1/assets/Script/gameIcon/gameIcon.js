
const gameIconMove = require('gameIconMove');
console.log(gameIconMove);

cc.Class({
    extends: gameIconMove,
    properties: {
      
    },
    onLoad () {
      
    },

    start () {
      // console.log(this.node.getComponent(cc.Animation));
      this.anim = this.node.getComponent(cc.Animation);// 获取节点中的动画组件
      // console.log(this.node);
      const animState =  this.anim.play(this.node.name); // 播放动画
      // 播放速度
      animState.speed = .3;
      // 设置循环模式为 Loop
      animState.wrapMode = cc.WrapMode.Loop;
    },

});
