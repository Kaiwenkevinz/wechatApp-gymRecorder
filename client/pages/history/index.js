// pages/history/index.js
import util from './../../utils/util'

//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    contentArray: [],
    open_id: null,
    show: false,
    minDate: new Date(2009,10,2).getTime(),
    maxDate: new Date().getTime(),
    currentDate: new Date().getTime(),
    readableCurrentDate: null
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
        console.log("open id " + this.data.open_id)
        this.getContentByOpenIdAndDate()
      }
    })

    this.setData({
      readableCurrentDate: util.formatTime(new Date(this.data.currentDate))
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getTabBar().init();
    console.log("refresh history")
    this.getContentByOpenIdAndDate()
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

  getContentByOpenIdAndDate: function () {
    const db = wx.cloud.database()
    const that = this
    db.collection("users").where({
      _openid: this.data.open_id,
      date: this.data.readableCurrentDate
    }).get({
      success: res => {
        if (res.data) {
          that.setData({
            contentArray: res.data
          })
        }
        console.log(this.data.contentArray)
      }
    })
  },
  
  showPopup() {
    this.setData({ show: true });
  },

  onClosePopup() {
    this.setData({ show: false });
  },

  onInputPopup(event) {
    this.setData({
      currentDate: event.detail
    });
  },

  onCancelPicker() {
    this.setData({
      show: false
    })
  },

  onConfirmPicker() {
    var date = util.formatTime(new Date(this.data.currentDate))

    this.setData({
      show: false,
      readableCurrentDate: date
    }),
      this.getContentByOpenIdAndDate()
  }
})