cc.Class({
    extends: cc.Component,

    properties: {
        bgm: {
            default: null,
            url: cc.AudioClip
        }
    },

    playMusic() {
        cc.audioEngine.playMusic( this.bgm, true );
    },
    stopMusic() {
        cc.audioEngine.stop( this.bgm );
    },
    pauseMusic() {
        cc.audioEngine.pauseMusic();
    },

});
