const wxApi = {
  login() {
    // 
    const env = 'test-1b220c';
    wx.cloud.init({
      traceUser: true,
      env, 
    });
    this.db = wx.cloud.database({
      env,
    });
    // testDB.collection('users').get().then(res => {
    //   // res.data 是一个包含集合中有权限访问的所有记录的数据，不超过 20 条
    //   console.log('数据库返回的', res.data)
    // });

    // 发起登录
    return new Promise((resolve, reject)=>{
      wx.login({
        success: ((res) => {
           this.wxCode = res.code;
           this.wxGetUserState(resolve);
          }
        )
      })
    })
  },
  wxGetUserState(resolve) {
      // 获取用户当前的授权状态。
      wx.getSetting({
        fail: (res) => {
          console.log(res);
          this.wxGetUserInfo();
        },
        success: (res) => {
          console.log(res);
          if (res.authSetting['scope.userInfo']) {
            this.getUserInfo(resolve);
          }
          else{
            this.wxGetUserInfo(resolve);
          }
        }
      })
  },
  wxGetUserInfo(resolve) {
    console.log('提示按钮获取用户信息');
    const systemInfo = wx.getSystemInfoSync();
    const button = wx.createUserInfoButton({
      type: 'text',
      text: '',
      style: {
        left: 0,
        top: 0,
        width: systemInfo.windowWidth,
        height: systemInfo.windowHeight,
        lineHeight: 60,
        backgroundColor: 'transparent',
        color: 'transparent',
        textAlign: 'center',
        fontSize: 16,
        borderRadius: 4
      }
    })
    button.onTap((res) => {
      console.log(res);
      if (res.errMsg.indexOf('auth deny') > -1 || res.errMsg.indexOf('auth denied') > -1) {
        // 处理用户拒绝授权的情况
        this.guideActive(resolve)
      }else {
        if(res)  button.destroy();
        this.setUserData(res, resolve);
      }
    })
  },
  getUserInfo(resolve) {
    // 获取用户信息
    wx.getUserInfo({
      fail: (res) => {
        console.log(res);
        if (res.errMsg.indexOf('auth deny') > -1 || res.errMsg.indexOf('auth denied') > -1) {
          // 处理用户拒绝授权的情况
          this.guideActive(resolve);
        }
      },
      success:(res) => {
        this.setUserData(res, resolve);
      }
    })
  },
  setUserData(data, resolve) {
    console.log('拿到用户信息', data);
    const userInfo = data.userInfo;
    resolve(userInfo);
    wx.cloud.callFunction({
      name: 'getOpenid',
      complete: res => {
       console.log('云函数获取到的', res.result)
       this.openId = res.result.openId;
       this.db.collection('users').where({
        _openid: this.openId,
       }).get().then(res=>{
         console.log('数据库查到的用户信息', res.data);
         // 没有用户信息
         if(res.data.length === 0) {
           console.log(this.db);
          this.db.collection('users').add({
            // data 字段表示需新增的 JSON 数据
            data: {
              score: 0,
              avatarUrl: userInfo.avatarUrl,
              nickName:  userInfo.nickName,
            }
          }).then(res=>{
            console.log('插入数据', res);
          })
         }
       })
      }
     });
  },
  // 处理用户拒绝授权的情况
  guideActive (resolve) {
    wx.showModal({
      title: '警告',
      content: '拒绝授权将无法正常游戏',
      cancelText: '取消',
      showCancel: true,
      confirmText: '设置',
      success: (res) => {
        if (res.confirm) {
          this.wxGetUserState(resolve);
        } else {
          resolve(false);
        }
      }
    })
  },
  /**
   * 更新分数
   * @param {*} score 
   */
  setScore(score) {
    console.log("分数", score);
    // 更新云函数的数据
    wx.cloud.callFunction({
      name: 'setScore',
      data:{
        score,
      },
      complete: res => {
        console.log('更新数据库分数', res);
      }
    });
    // 更新数据域的数据
    wx.setUserCloudStorage({
      KVDataList: [{ key: 'score', value: ''+score }],
      success: res => {
        console.log(res);
        // 让子域更新当前用户的最高分，因为主域无法得到getUserCloadStorage;
        let openDataContext = wx.getOpenDataContext();
        openDataContext.postMessage({
            type: 'updateMaxScore',
        });
      },
      fail: res => {
        console.log(res);
      }
    });
  },
 renderFriendRank() {
  // 主域绘制
                            
 }
}


export default wxApi