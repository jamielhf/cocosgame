window.__require=function e(r,n,t){function c(a,i){if(!n[a]){if(!r[a]){var s=a.split("/");if(s=s[s.length-1],!r[s]){var u="function"==typeof __require&&__require;if(!i&&u)return u(s,!0);if(o)return o(s,!0);throw new Error("Cannot find module '"+a+"'")}}var f=n[a]={exports:{}};r[a][0].call(f.exports,function(e){return c(r[a][1][e]||e)},f,f.exports,e,r,n,t)}return n[a].exports}for(var o="function"==typeof __require&&__require,a=0;a<t.length;a++)c(t[a]);return c}({launch:[function(e,r,n){"use strict";cc._RF.push(r,"e53e6YiUd9FJLf8yIQu1n47","launch"),cc.Class({extends:cc.Component,properties:{content:cc.Node,prefab:cc.Prefab},start:function(){var e=this;wx.onMessage(function(e){console.log(e.message)}),wx.getUserInfo({openIdList:["selfOpenId"],lang:"zh_CN",success:function(r){console.log("success",r.data);var n=r.data[0];e.createUserBlock(n)},fail:function(e){reject(e)}}),wx.getFriendCloudStorage({success:function(r){for(var n=0;n<6;n++){var t=r.data[n];t?e.createUserBlock(t):e.createPrefab()}},fail:function(e){console.error(e)}})},createUserBlock:function(e){var r=this.createPrefab(),n=e.nickName?e.nickName:e.nickname,t=e.avatarUrl,c=r.getChildByName("userName").getComponent(cc.Label),o=r.getChildByName("mask").children[0].getComponent(cc.Sprite);c.string=n,console.log(n+"'s info has been getten."),cc.loader.load({url:t,type:"png"},function(e,r){e&&console.error(e),o.spriteFrame=new cc.SpriteFrame(r)})},createPrefab:function(){var e=cc.instantiate(this.prefab);return e.parent=this.content,e}}),cc._RF.pop()},{}]},{},["launch"]);