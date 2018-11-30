cc.Class({
    extends: cc.Component,

    properties: {
        bgm: {
            default: null,
            url: cc.AudioClip
        },
        hit: {
            default: null,
            url: cc.AudioClip,
        }
    },

    playMusic() {
        cc.audioEngine.playMusic( this.bgm, true );
    },
    stopMusic() {
        cc.audioEngine.stop( this.bgm );
    },
    hit() {
        cc.audioEngine.playMusic( this.hit, false );
    },
    pauseMusic() {
        cc.audioEngine.pauseMusic();
    },

});
