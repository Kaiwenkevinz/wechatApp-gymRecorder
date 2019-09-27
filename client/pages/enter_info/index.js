// pages/user/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    area: "chest",
    show: false   // 弹出层
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData(
      {
        area: options.area
      }
    )
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log(this.data.area)
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  onClickMovementBtn() {
    this.setData({ show: true });
  },

  onClosePopup() {
    this.setData({ show: false });
  }
})