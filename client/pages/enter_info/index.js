// pages/enter_info/index.js
import Toast from './../../miniprogram_npm/vant-weapp/toast/toast';
import Notify from './../../miniprogram_npm/vant-weapp/notify/notify';
import util from './../../utils/util'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    area: "chest",
    show: false,   // 弹出层
    columns: [],
    movement: '选择动作', // 动作
    weight: 30,           // 重量
    repetition: null,    // 次数 
    num_of_set: 1,        // 组数
    date: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    // Mock Data. Delete In Production
    // options.area = "back";

    this.setData({
      area: options.area
    })
    
    var selected_col = [];
    switch (options.area) {
      case "chest":
        selected_col = ['平板杠铃卧推', '上斜杠铃卧推', '平板哑铃卧推', '上斜哑铃卧推', '蝴蝶夹胸', '十字夹胸'];
        break;
      case "back":
        selected_col = ['引体向上', '高位下拉', '坐姿划船', '杠铃划船', '练习器划船', '哑铃划船'];
        break;
      case "shoulder":
        selected_col = ['侧平举', '反向飞鸟', '前平举', '哑铃推举'];
        break;
      case "arms":
        selected_col = ['哑铃弯举', '杠铃弯举', '肱三头肌绳索下压'];
        break;
      case "abs":
        selected_col = ['卷腹', '十字交叉'];
        break;
      case "legs":
        selected_col = ['负重深蹲'];
        break;
    }

    this.setData({
      columns: selected_col,
      date: util.formatTime(new Date(wx.getStorageSync("last_login_date")))
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
    console.log("onShow: " + this.data.area)
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
  },

  onCancelPicker() {
    this.setData({ show: false });
  },

  onConfirmPicker(event) {
    var that = this
    const { picker, value, index } = event.detail;
    console.log(value)

    this.setData({
      show: false,
      movement: value
    }), 
      // 更新已选动作对应组数
      wx.getStorage({
        key: this.data.movement,
        success: function (res) {
          console.log(res.data)
          that.setData({
            num_of_set: res.data
          })
        },
        fail: function (res) {
          that.setData({
            num_of_set: 1
          })
        }
      })
  },

  onChangeStepper(event) {
    // console.log(event.detail)
    this.setData({
      weight: event.detail
    })
  },

  onChangeField(event) {
    this.setData({
      repetition: parseInt(event.detail)
    })
  },

  onClickFinishBtn() {
    var that = this
    var formatted_info = "第 " + this.data.num_of_set + " 组 " + "重 " + this.data.weight + "Ibs"
    var obj = {
      date: this.data.date,
      content: {
        movement: this.data.movement,
        weight: this.data.weight,
        repetition: this.data.repetition,
        num_of_set: this.data.num_of_set,
        formatted_info: formatted_info
      }
    }
    
    console.log(obj)
    this.onCreateNewRecord(obj)
    
    this.setData({
      num_of_set: this.data.num_of_set += 1
    }),
      wx.setStorage({
        key: that.data.movement,
        data: that.data.num_of_set
      })
  },

  onCreateNewRecord(obj) {
    const db = wx.cloud.database();

    db.collection("users").add({
      data: obj,
      success: res => {
        Notify({ type: 'primary', message: '创建完成' });
      },
      fail: err => {
        console.error("创建失败：", err);
      }
    });
  }
})