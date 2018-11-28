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
        const Canvas =  cc.find('Canvas');
        this.global = Canvas.getComponent('global');
        // 碰撞检测
        this.manager = cc.director.getCollisionManager();
        // 默认没有开启
        this.manager.enabled = true;
        // debug
        // manager.enabledDebugDraw = true;
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
        this.manager.enabled = false;
        console.log(11221);
        const g = other.getComponent('gameIcon');
        // 播放击中的动画
        g.onShoot();
        // self.node.rotation = 90;
        this.jumpAction = cc.sequence(
            cc.spawn(
                cc.scaleTo(0.1, .4, .4),
                cc.moveBy(0.1, 0, 10),
            ),
            cc.spawn(
                cc.rotateBy(.5, 360),
                cc.moveBy(.5, 20, 50),
            ),
            cc.spawn(
                cc.rotateBy(.5, 360),
                cc.moveBy(.5, 30, 90),
            ),
            cc.spawn(
                cc.scaleTo(0.1, .4, .4),
                cc.rotateBy(1, 540),
                cc.moveBy(1, 50, -100),
                cc.fadeOut(1),
            ),
            cc.callFunc( (e) => {
                if(e.name === 'pens') {
                    this.global.levelUp();
                    this.manager.enabled = true;
                    console.log(this.global.level);
                }
                //do something
            } , this)
        // 以1/2的速度慢放动画，并重复5次
        ).speed(2).repeat(1);
      
        // 集中后掉落的动画
        self.node.runAction(this.jumpAction);
        other.node.runAction(this.jumpAction.clone());
        
    }

});
