
import wxApi from './wx/wxApi';

cc.Class({
    extends: cc.Component,

    properties: {
        life: 3,  // 生命
        level: 1, // 关数
        score: 0, // 分数
        gameItem: 1, // 每一关击中多少个可以过关
        dialogOver: cc.Node,
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
        if(this.life === 0) {
            this.gameover();
        }
    },
    // 加分
    addScore(num = 1) {
        this.score = this.score + num;
    },
    start () {

    },
    restart() {
        cc.director.loadScene('game');
    },
    // 游戏结束
    gameover() {
        const N_pos = this.dialogOver.parent.convertToNodeSpaceAR(cc.v2(cc.winSize.width/2,cc.winSize.height/2));
        this.dialogOver.setPosition(N_pos);
        this.dialogOver.active = true;
         // 更新分数
        if(CC_WECHATGAME){
            wxApi.setScore(this.score);
        }
    },
   
    // update (dt) {},
});
