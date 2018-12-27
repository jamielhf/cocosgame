import wxApi from './wx/wxApi';


cc.Class({
  extends: cc.Component,

  properties: {
     
  },
  onLoad () {
   
  },
  start() {
    wxApi.login();
  }
});
