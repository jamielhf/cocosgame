// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init();


const db = cloud.database({
  env: 'test-1b220c',
});



// 云函数入口函数
exports.main = async (event, context) => {
  return new Promise((resolve, reject) => {
    if (event.score) {
      db.collection('users').where({
        _openid: event.userInfo.openId,
      }).update({
        data: {
          score: event.score,
        },
      }).then(res => {
        console.log('更新分数', res);
        resolve(res);
      })
    }
  })
}