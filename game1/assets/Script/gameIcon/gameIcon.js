
const gameIconMove = require('gameIconMove');
console.log(gameIconMove);

cc.Class({
    extends: gameIconMove,
    properties: {
      // gameIconImg: cc.Node,
    },
    onLoad () {
      const Canvas =  cc.find('Canvas');
      this.global = Canvas.getComponent('global');
      console.log(this.global.level);
      this.node.active = false;
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
    onShoot() {
      const animState =  this.anim.play('onShoot'); // 播放动画
      // 播放速度
      animState.speed = .3;
      animState.wrapMode = cc.WrapMode.Normal;
      const onShoot = this.anim.getAnimationState('onShoot');
      console.log(onShoot);
        // if (onShoot) {
        //   onShoot.on('finished', (event) => {
        //     console.log(1122);
        //     this.finished();
        //   }, this);
        // }
    },
    // 在 被击中的时候播放状态的动画结束后调用，
    finished() {
      const animState =  this.anim.play('moveOut'); // 播放动画
      // 播放速度
      animState.speed = .3;
      animState.wrapMode = cc.WrapMode.Normal;
    },
    update() {

    }

});
