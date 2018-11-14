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
    bgm : null,
    properties: {
       btn: cc.Button,
    },
    onLoad () {
        let bgm = cc.find('bgMusic/music');
        if (bgm) {
            bgm = bgm.getComponent('AudioMng');
        }
        this.node.on('mousedown',  ( event ) => {
            if (this.btn.interactable) {
                bgm.pauseMusic();
            } else {
                bgm.playMusic();
            }
            this.btn.interactable = !this.btn.interactable;
        });
        
    },
    onDestroy() {
        // cc.audioEngine.stop(this.current);
    }

    // update (dt) {},
});
