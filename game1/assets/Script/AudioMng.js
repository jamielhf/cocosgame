cc.Class({
    extends: cc.Component,

    properties: {
        bgm: {
            default: null,
            type: cc.Texture2D,
            url: cc.AudioClip
        },
        hit: {
            type: cc.Texture2D,
            default: null,
            url: cc.AudioClip,
        }
    },

    playMusic() {
        cc.audioEngine.playMusic( this.bgm, true );
    },
    stopMusic() {
        cc.audioEngine.stopMusic( this.bgm );
    },
    onHit() {
        cc.audioEngine.play( this.hit, false );
    },
    pauseMusic() {
        cc.audioEngine.pauseMusic();
    },

});
