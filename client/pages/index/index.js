// pages/user/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    last_login_date: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getStorage({
      key: 'last_login_date',
      success: function (res) {
        that.setData({
          last_login_date: res.data
        })
        that.setUpRepetition()
      }, 
      fail: function() {
        that.setUpRepetition()
      }
    })
  },

  setUpRepetition() {
    // 判定是否清零组数
    console.log("index, check if clear rep")
    const current_date_without_time = new Date().setHours(0, 0, 0, 0);
    const last_login_date = this.data.last_login_date

    // console.log("last_login_date" + last_login_date)
    // console.log("current_date_without_time" + current_date_without_time)


    if (!last_login_date || last_login_date.valueOf() < current_date_without_time.valueOf()) {
      console.log("clear repetition record")
      wx.clearStorage()
    }   

    wx.setStorage({
      key: 'last_login_date',
      data: current_date_without_time,
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getTabBar().init();
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