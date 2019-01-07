cc.Class({
    extends: cc.Component,

    properties: {
        content: cc.Node,
        prefab: cc.Prefab
    },

    start () {
        let _self = this;

        wx.onMessage( data => {
            console.log(data.message);
            if(data.type === 'updateMaxScore') {
                this.updateMaxScore();
            }
        });

        // https://developers.weixin.qq.com/minigame/dev/document/open-api/data/wx.getUserInfo.html
        wx.getUserInfo({
            openIdList: ['selfOpenId'],
            lang: 'zh_CN',
            success: (res) => {
                console.log('success', res.data);
                let userInfo = res.data[0];
                // _self.createUserBlock(userInfo);
            },
            fail: (res) => {
                reject(res);
            }
        });
        
        // https://developers.weixin.qq.com/minigame/dev/document/open-api/data/wx.getFriendCloudStorage.html
        wx.getFriendCloudStorage({
            keyList: ['maxScore'],
            success:  (res)  =>{
                console.log(222, res);
                const nArr = res.data.filter( (item,index,array) => {
                    //元素值，元素的索引，原数组。
                    return (item.KVDataList.length>0);
                });
                console.log(333, nArr);
                const arr = this.sortList(nArr);
                console.log(444, arr);
                const l = arr.length > 5 ? 5 : arr.length;
                for (let i = 0; i < l; i++) {
                    let friendInfo = arr[i];
                    if (!friendInfo) {
                        _self.createPrefab();
                        continue;
                    }
                    _self.createUserBlock(friendInfo);
                }
            },
            fail: function (res) {
                console.error(res);
            }
        });
    },
    // 更新最高分数
    updateMaxScore() {
        wx.getUserCloudStorage({
            keyList: ['maxScore'],
            success:   (res) => {
                console.log(res);
                res = res.KVDataList;
                if(!res[1] || +res[1].value < +res[0].value) {
                    wx.setUserCloudStorage({
                        KVDataList: [{ key: 'maxScore', value: res[0].value}],
                        success:   (res2) => {
                            console.log('子域更新最高分数', res[0].value)
                        },
                    })
                }  
            },
            fail: function (res) {
                console.error(res);
            }
        });
    },
    createUserBlock (user) {
        console.log(111, user);
        let node = this.createPrefab();
        // getUserInfo will return the nickName, getFriendCloudStorage will return the nickname.
        let nickName = user.nickName ? user.nickName : user.nickname;
        let avatarUrl = user.avatarUrl;

        let userName = node.getChildByName('userName').getComponent(cc.Label);
        let score = node.getChildByName('score').getComponent(cc.Label);
        let userIcon = node.getChildByName('mask').children[0].getComponent(cc.Sprite);

        userName.string = nickName;
        score.string = user.KVDataList ? '' + user.KVDataList[0].value  : '0';
        console.log(nickName + '\'s info has been getten.');
        cc.loader.load({
            url: avatarUrl, type: 'png'
        }, (err, texture) => {
            if (err) console.error(err);
            userIcon.spriteFrame = new cc.SpriteFrame(texture);
        });                   
    },

    createPrefab () {
        let node = cc.instantiate(this.prefab);
        node.parent = this.content;
        return node;
    },
    //排序(ListData：res.data;order:false降序，true升序)
    sortList: (ListData, order = false) => {
        ListData.sort((a,b) => {
            var AMaxScore = 0;
            var KVDataList = a.KVDataList;
            for(var i = 0; i < KVDataList.length; i++){
                if(KVDataList[i].key == "score"){
                AMaxScore = KVDataList[i].value;
                }
            }
            var BMaxScore = 0;
            KVDataList = b.KVDataList;
            for(var i = 0; i<KVDataList.length; i++){
                if(KVDataList[i].key == "score"){
                BMaxScore = KVDataList[i].value;
                }
            }
            if(order){
                return parseInt(AMaxScore) - parseInt(BMaxScore);
            }else{
                return parseInt(BMaxScore) - parseInt(AMaxScore);
            }
        });
        return ListData;
    }

});
