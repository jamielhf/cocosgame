
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
    defaultAction() {
       // console.log(this.node.getComponent(cc.Animation));
       this.anim = this.node.getComponent(cc.Animation);// 获取节点中的动画组件
       console.log(this.anim);
       const animState =  this.anim.play(this.node.name); // 播放动画
       // 播放速度
       animState.speed = .3;
       // 设置循环模式为 Loop
       animState.wrapMode = cc.WrapMode.Loop;
    },
    runAction(actionType) {
      if(actionType === 'circleAction') {
        this.circleAction();
      }
    },
    circleAction() {
      this.action = () => {
        this.circleMove(this.node);
      };
      this.schedule(this.action, .01);
    },
    stopAction() {
      this.unscheduleAllCallbacks();
    },
    start () {
      this.defaultAction();
    },
    onShoot() {
      
      const animState =  this.anim.play(this.node.name + 'OnShoot'); // 播放动画
      // 播放速度
      animState.speed = .3;
      animState.wrapMode = cc.WrapMode.Normal;
      
    },
    // 在 被击中的时候播放状态的动画结束后调用，
    finished() {
      
    },
    update() {

    }

});
