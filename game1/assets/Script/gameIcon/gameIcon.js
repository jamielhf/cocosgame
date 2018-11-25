
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
      console.log(this.anim);
      const animState =  this.anim.play('gameIconMove'); // 播放动画
      // 播放速度
      animState.speed = .3;
      // 设置循环模式为 Loop
      animState.wrapMode = cc.WrapMode.Loop;
    },
    onSheet() {
      const animState =  this.anim.play('onShoot'); // 播放动画
      // 播放速度
      animState.speed = .3;
      
    }

});
