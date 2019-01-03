import wxApi from './wx/wxApi';

cc.Class({
    extends: cc.Component,

    properties: {
       display: cc.Sprite,
       texture: null,
    },

  
    onLoad () {
        this.display.node.active = false;
    },
    renderFriendRank() {
       
    },
    start () {
        console.log(this._isShow);
        this._isShow = true;
        this._show = cc.moveTo(0.5, 0, 110);
        this._hide = cc.moveTo(0.5, 0, 1000);
        console.log(this.display);
        this.node.on('touchstart',()=>{
            this.display.node.active = true;
            this._isShow = !this._isShow;
            if (this._isShow) {
                this.display.node.runAction(this._show);
            }
            else {
                this.display.node.runAction(this._hide);
            }
        })
    },
    update () {
    }
});
