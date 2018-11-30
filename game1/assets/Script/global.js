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
        life: 3,  // 生命
        level: 1, // 关数
        score: 0, // 分数
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        const pens =  cc.find('Canvas/pens');
        const pensCom = pens.getComponent('pen');
        console.log(pensCom);
        this.node.on('touchstart', ()=>{
            pensCom.move();
        })
    },
    // 下一关
    levelUp() {
        this.level = this.level + 1;
    },
    // 减少生命
    loseLife() {
        this.life = this.life - 1;
    },
    // 加分
    addScore(num = 1) {
        this.score = this.score + num;
    },
    start () {

    },

    // update (dt) {},
});
