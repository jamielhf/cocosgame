// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        anim: null,
    },
    onLoad() {
        // 碰撞检测
        const manager = cc.director.getCollisionManager();
        // 默认没有开启
        manager.enabled = true;
        // debug
        manager.enabledDebugDraw = true;
    },
    start () {
        const pens = cc.find('Canvas/pens'); 
        this.anim = pens.getComponent(cc.Animation);// 获取节点中的动画组件
        const animState =  this.anim.play('pen'); // 播放动画
        // 播放速度
        animState.speed = 0.5;
        // 设置循环模式为 Loop
        animState.wrapMode = cc.WrapMode.Loop;
       
    },
    // 发射
    move() {
        this.anim.pause('pen');
        const action = cc.moveTo(.5, 0, 400);
        this.node.runAction(action);
    },
    // 开始碰撞
    onCollisionEnter(other, self) {
        self.node.stopAllActions();
        console.log(other.node.getComponent('gameIcon'));
        const gameIcon = other.node.getComponent('gameIcon');
        const animState =  gameIcon.anim.play('onShoot'); // 播放动画
        // 播放速度
        animState.speed = .3;
    }

});
