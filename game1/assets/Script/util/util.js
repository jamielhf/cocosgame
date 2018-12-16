export default {
  /**
   * 角度返回弧度
   * @param {*} num 
   */
  getRadian(num) {
    return Math.PI*num/180;
  },
  getAngle(num) {
    return num*180/Math.PI;
  }
}