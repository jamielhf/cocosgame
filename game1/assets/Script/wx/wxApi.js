const wxApi = {
  login() {
    // 
    const env = 'test-1b220c';
    wx.cloud.init({
      traceUser: true,
      env, 
    });
    const testDB = wx.cloud.database({
      env,
    });
    console.log('数据库', testDB);
    console.log('数据库', testDB.collection('users'));
    testDB.collection('users').get().then(res => {
      // res.data 是一个包含集合中有权限访问的所有记录的数据，不超过 20 条
      console.log('数据库返回的', res.data)
    });

    // 发起登录
    wx.login({
      success: ((res) => {
        this.wxCode = res.code;
        console.log(res);
        this.wxGetUserState();
        }
      )
    })
  },
  wxGetUserState() {
    // 获取用户当前的授权状态。
    wx.getSetting({
      fail: (res) => {
        console.log(res);
        this.wxGetUserInfo();
      },
      success: (res) => {
        console.log(res);
        if (res.authSetting['scope.userInfo']) {
          this.getUserInfo();
        }
        else{
          this.wxGetUserInfo();
        }
      }
    })
  },
  wxGetUserInfo() {
    console.log('获取用户信息');
    const button = wx.createUserInfoButton({
      type: 'text',
      text: '获取用户信息',
      style: {
        left: 0,
        top: 0,
        width: this.windowWidth,
        height: this.windowHeight,
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        color: '#000',
        textAlign: 'center',
        fontSize: 40,
        borderRadius: 4
      }
    })
    button.onTap((res) => {
      console.log(res);
      if (res.errMsg.indexOf('auth deny') > -1 || res.errMsg.indexOf('auth denied') > -1) {
        // 处理用户拒绝授权的情况
        this.guideActive()
      }else {
        this.setUserData(res)
      }
    })
  },
  getUserInfo() {
    // 获取用户信息
    wx.getUserInfo({
      fail: (res) => {
        console.log(res);
        if (res.errMsg.indexOf('auth deny') > -1 || res.errMsg.indexOf('auth denied') > -1) {
          // 处理用户拒绝授权的情况
          this.guideActive()
        }
      },
      success:(res) => {
        console.log(res);
        this.setUserData(res);
      }
    })
  },
  setUserData(data) {
    console.log(data);
  },
  // 处理用户拒绝授权的情况
  guideActive () {
    wx.showModal({
      title: '警告',
      content: '拒绝授权将无法正常游戏',
      cancelText: '取消',
      showCancel: true,
      confirmText: '设置',
      success: (res) => {
          if (res.confirm) {
            this.wxGetUserState();
          }
      }
    })
  },
}


export default wxApi