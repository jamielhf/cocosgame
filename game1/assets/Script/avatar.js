

cc.Class({
  extends: cc.Component,

  properties: {
    sprite: {
      default: null,
      type: cc.SpriteFrame,
    },
    renderAvatar: false,
  },

  // LIFE-CYCLE CALLBACKS:

  onLoad () {
    // const Canvas =  cc.find('Canvas');
    // this.init = Canvas.getComponent('init');
  },
  /**
   * 设置头像
   * @param {*} remoteUrl 
   */
  setUser(remoteUrl) {
    // var remoteUrl = "https://wx.qlogo.cn/mmopen/vi_32/xMeTSIu7BKT61DVWUSb6PcDemkX9saZ7bHDdA9MS7897NUF5ict8P314ABleuhQCLWnwAa1yS4ypbXSkGHS44YQ/132";
    cc.loader.load({url: remoteUrl, type: 'png'},  (err, texture) => {
      const sprite = this.getComponent(cc.Sprite);
      sprite.width = 60;
      sprite.heigit = 60;
      sprite.spriteFrame = new cc.SpriteFrame(texture);
    });
  },
  start () {

  },
  update() {
    // if(this.init.avatarUrl && !this.renderAvatar) {
    //   this.setUser(this.init.avatarUrl);
    //   this.renderAvatar  = true;
    // } 
  }
});
