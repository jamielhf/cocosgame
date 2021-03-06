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
       
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        var bgm = cc.find('Canvas/btnMusic');
        console.log(bgm);
        if (bgm) {
            bgm = bgm.getComponent('audio');
        }
        this.node.on('touchstart',  ( event ) => {
            bgm.play();
            setTimeout(()=>{
                cc.director.loadScene('game');
            }, 300);
        });
    },

    start () {

    },

    // update (dt) {},
});
