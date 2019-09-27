// pages/user/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    this.getTabBar().init();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  onClickButton: function (e) {

    var area;
    switch (e.currentTarget.dataset.bindex) {
      case 0:
        // 胸部
        area = "chest";
        break;
      case 1:
        // 背部
        area = "back";
        break;
      case 2:
        // 肩部
        area = "shoulder";
        break;
      case 3:
        // 手臂
        area = "arms";
        break;
      case 4:
        // 核心
        area = "abs";
        break;
      case 5:
        // 臀腿
        area = "legs";
        break;
      default:
        wx.showToast({
          title: 'Something wrong',
          icon: '',
          image: '',
          duration: 0,
          mask: true,
          success: function(res) {},
          fail: function(res) {},
          complete: function(res) {},
        })
    }
    
    wx.navigateTo({
      url: '/pages/enter_info/index?area=' + area
    })

  }
})