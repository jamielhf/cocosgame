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
    penAction() {
        this.action = cc.sequence(
            cc.moveBy(.2, 0, 10),
            cc.moveBy(.2, 0, 0),
            cc.moveBy(.2, 0, -10),
        // 以1/2的速度慢放动画，并重复5次
        ).speed(2).repeatForever();
        this.node.runAction(this.action);
    },
    onLoad() {
        // 击中的音乐
        const music = cc.find('Canvas/music');
        if (music) {
            this.hit = music.getComponent('AudioMng');
        }
        const N_pos = this.node.parent.convertToNodeSpaceAR(cc.v2(cc.winSize.width/2, 100));
        this.node.setPosition(N_pos);
        this.penAction();

        const Canvas =  cc.find('Canvas');
        this.global = Canvas.getComponent('global');
        // 碰撞检测
        this.manager = cc.director.getCollisionManager();
        // 默认没有开启
        this.manager.enabled = true;
        // debug
        // this.manager.enabledDebugDraw = true;
       
    },
    start () {
        const pens = cc.find('Canvas/pens'); 
        this.anim = pens.getComponent(cc.Animation);// 获取节点中的动画组件     
    },
    // 发射
    move() {
        this.anim.pause('pen');
        const action = cc.sequence(
            cc.moveTo(.5, 0, 400),
            cc.callFunc( (e) => {
                    // 没有击中的情况 减少生命值 
                    this.global.loseLife();
                    if(this.global.life > 0) {
                        // 重新开始
                        this.reSetPen();
                    } else {
                        this.gameIconNode.active = false;
                    }
                })
            );
        this.node.runAction(action);
    },
    // 开始碰撞
    onCollisionEnter(other, self) {
        console.log('击中');
       
        this.global.gameItem--;
        // 关闭碰撞检查
        this.manager.enabled = false;
        
        const parentNode = other.node.parent.getComponent('game');
        const g = other.getComponent('gameIcon');
        this.gameIconNode = other.node;
        self.node.stopAllActions();
        g.stopAction();
        // 播放击中的音乐
        this.hit.onHit();
        // 加分
        this.global.addScore();
       
        // 播放击中的动画
        g.onShoot();
        this.jumpAction = cc.sequence(
            cc.spawn(
                cc.jumpBy(3, 100, 50, 150, 1),
                cc.scaleTo(0.1, .4, .4),
                cc.rotateBy(3, 360 + 540),
                cc.delayTime(1),
                cc.fadeOut(3),
            ),
           
            cc.callFunc( (e) => {
                // 动画结束后 隐藏结点 提高等级 进入下一关
                e.active = false;
                if(e.name === 'pens') {
                     // 开启碰撞检查
                    this.manager.enabled = true;
                    console.log(this.global.level);
                    this.reSetPen();
                     // 如果没有可击中的怪物
                    if(this.global.gameItem == 0) {
                        // 下一关
                        this.global.levelUp();
                        parentNode.reStart();
                    } 
                } else {
                    g.defaultAction();
                   
                }
                
            } , this)
        // 以1/2的速度慢放动画，并重复5次
        ).speed(4).repeat(1);
      
        // 集中后掉落的动画
        self.node.runAction(this.jumpAction);
        other.node.runAction(this.jumpAction.clone());
        
    },
     // 重新放制 笔
     reSetPen() {
         console.log('重制笔的位置');
        const penNode = this.node;
        penNode.stopAllActions();
        penNode.opacity = 255;
        const N_pos = penNode.parent.convertToNodeSpaceAR(cc.v2(cc.winSize.width/2, 100));
        penNode.setPosition(N_pos);
        penNode.scaleY = .5;
        penNode.scaleX = .5;
        penNode.rotation = 0;
        penNode.active = true;
        this.penAction();
      },

});
