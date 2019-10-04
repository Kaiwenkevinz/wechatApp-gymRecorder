// pages/history/index.js
import util from './../../utils/util'

//获取应用实例
const app = getApp()
let currentPage = 0 // 当前第几页,0代表第一页 
let pageSize = 15 //每页显示多少数据 

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
    readableCurrentDate: null,
    loadMore: false, //"上拉加载"的变量，默认false，隐藏  
    loadAll: false //“没有数据”的变量，默认false，隐藏  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this

    wx.cloud.callFunction({
      name: 'getOpenId',
      complete: res => {
        var openid = res.result.openId
        that.data.open_id = openid
        console.log("open id " + this.data.open_id)
        that.setData({
          contentArray: []
        })
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
    
    this.setData({
      loadAll: false, //把“没有数据”设为true，显示  
      loadMore: false, //把"上拉加载"的变量设为false，隐藏  
      contentArray: []
    })

    this.getContentByOpenIdAndDate()
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  },

  onHide:function() {
    this.setData({
      loadAll: false, //把“没有数据”设为true，显示  
      loadMore: false, //把"上拉加载"的变量设为false，隐藏  
      contentArray: []
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log("上拉触底事件")
    let that = this
    currentPage++
    if (!that.data.loadMore) {
      that.setData({
        loadMore: true, //加载中  
        loadAll: false //是否加载完所有数据
      });

      //加载更多，这里做下延时加载
      setTimeout(function () {
        that.getContentByOpenIdAndDate()
      }, 2000)
    }
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
    let that = this
    
    if (currentPage == 1) {
      this.setData({
        loadMore: true, //把"上拉加载"的变量设为true，显示  
        loadAll: false //把“没有数据”设为false，隐藏  
      })
    }

    db.collection("users")
      .skip(currentPage * pageSize)
      .limit(pageSize)
      .where({
      _openid: this.data.open_id,
      date: this.data.readableCurrentDate
    }).get({
      success: res => {
        if (res.data && res.data.length > 0) {
          var new_array = that.data.contentArray.concat(res.data)
          that.setData({
            contentArray: new_array,
            loadMore: false //把"上拉加载"的变量设为false，显示  
          })

          if (res.data.length < pageSize) {
            that.setData({
              loadMore: false, //隐藏加载中。。
              loadAll: true //所有数据都加载完了
            })
          }
        } else {
          that.setData({
            loadAll: true, //把“没有数据”设为true，显示  
            loadMore: false //把"上拉加载"的变量设为false，隐藏  
          })
        }
        // console.log(this.data.contentArray)
      },
      fail: res => {
        that.setData({
          loadAll: false,
          loadMore: false
        });
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
    currentPage = 0

    this.setData({
      show: false,
      loadAll: false, //把“没有数据”设为true，显示  
      loadMore: false, //把"上拉加载"的变量设为false，隐藏  
      readableCurrentDate: date,
      contentArray: []
    }),
      this.getContentByOpenIdAndDate()
  }
})