import wxApi from './wx/wxApi';


cc.Class({
  extends: cc.Component,

  properties: {
     avatarUrl: '',
     nickName: '',
  },
  onLoad () {
   
  },
  start() {
    if(CC_WECHATGAME){
      wxApi.login().then(res=>{
        console.log('给到游戏的用户信息', res);
        if(res) {
          const nickNameNode = cc.find("Canvas/name");
          const label = nickNameNode.getComponent(cc.Label);
          label.string = res.nickName;
          const avatarSprite = new cc.Node('avatarSprite');
          avatarSprite.addComponent(cc.Sprite);
          avatarSprite.parent = cc.find("Canvas/avatar");
          avatarSprite.width = 60;
          avatarSprite.height = 60;
          avatarSprite.type = cc.Sprite.Type.FILLED;
          avatarSprite.fillType = cc.Sprite.FillType.HORIZONTAL;
          avatarSprite.fillRange = 1;
          avatarSprite.scale = 0.5;
          avatarSprite.fillStart = 0;
          this.setUser(avatarSprite, res.avatarUrl);
        }
      })
    }
  },
   /**
   * 设置头像
   * @param {*} remoteUrl 
   */
  setUser(node, remoteUrl) {
    cc.loader.load({url: remoteUrl, type: 'png'},  (err, texture) => {
      const sprite = node.getComponent(cc.Sprite);
      sprite.width = 60;
      sprite.heigit = 60;
      sprite.spriteFrame = new cc.SpriteFrame(texture);
    });
  },
});
