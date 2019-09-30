// pages/history/index.js
import util from './../../utils/util'

//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    contentArray: [
      { "num_of_set": 2.0, "movement": "高位下拉", "weight": 25.0, "repetition": 1.0 },
      { "movement": "坐姿划船", "weight": 25.0, "repetition": 12.0, "num_of_set": 2.0 },
      { "num_of_set": 2.0, "movement": "高位下拉", "weight": 30.0, "repetition": 21.0 }
    ],
    open_id: null    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this

    wx.cloud.callFunction({
      name: 'getOpenId',
      complete: res => {
        // console.log(res)
        var openid = res.result.openId
        that.data.open_id = openid
        console.log("history " + this.data.open_id)
        this.getContentByOpenId()
      }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getTabBar().init();
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  onCloseSwipeCell(event) {
    const { position, instance } = event.detail;
    console.log(position)
    switch (position) {
      case 'left':
      case 'cell':
        instance.close();
        break;
      case 'right':
        instance.close();
        break;
    }
  },

  getContentByOpenId: function () {
    const db = wx.cloud.database()
    const that = this

    db.collection("users").where({
      _openid: this.data.open_id
    }).get({
      success: res => {
        if (res.data) {
          console.log("根据openid获取用户信息：", res.data);
          that.setData({
            contentArray: res.data
          })
        }
      }
    })
  }
})