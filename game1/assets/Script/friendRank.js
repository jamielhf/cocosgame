import wxApi from './wx/wxApi';

cc.Class({
    extends: cc.Component,

    properties: {
       display: cc.Sprite,
       texture: null,
       backBtn: cc.Node,
       nextBtn: cc.Node,
       prevBtn: cc.Node,
    },

  
    onLoad () {
       
    },
    renderFriendRank() {
       
    },
    start () {
        console.log(this.backBtn);
        this.backBtn.on('touchstart',  ( event ) => {
            setTimeout(()=>{
                cc.director.loadScene('menu');
            }, 300);
        });
        this.nextBtn.on('touchstart',  ( event ) => {
            console.log('下一页');
        });
        this.prevBtn.on('touchstart',  ( event ) => {
            console.log('上一页');
        });
       
    },
    update () {
    }
});
