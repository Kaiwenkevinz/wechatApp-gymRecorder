// pages/enter_info/index.js
import Toast from './../../miniprogram_npm/vant-weapp/toast/toast';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    area: "chest",
    show: false,   // 弹出层
    columns: [],
    movement: "选择动作",
    weight: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    // Mock Data. Delete In Production
    options.area = "back";

    this.setData({
      area: options.area
    })
    
    var selected_col = [];
    switch (options.area) {
      case "chest":
        selected_col = ["平板杠铃卧推", "上斜杠铃卧推", "平板哑铃卧推", "上斜哑铃卧推", "蝴蝶夹胸", "十字夹胸"];
        break;
      case "back":
        selected_col = ["引体向上", "高位下拉", "坐姿划船", "杠铃划船", "练习器划船", "哑铃划船"];
        break;
      case "shoulder":
        selected_col = [""];
        break;
      case "arms":
        selected_col = [];
        break;
      case "abs":
        selected_col = [];
        break;
      case "legs":
        selected_col = [];
        break;
    }
    
    this.setData({
        columns: selected_col
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
  },

  onCancelPicker() {
    this.setData({ show: false });
  },

  onConfirmPicker(event) {
    const { picker, value, index } = event.detail;
    console.log(value)
    this.setData({
      show: false,
      movement: value
    })

    // 更新已选动作对应组数
  },

  onChangeStepper(event) {
    // console.log(event.detail)
    this.setData({
      weight: event.detail
    })
  }

  // 判定组数
  // 数据库存入latest_login_date
  // 与date_of_today 比较，判定是否当天首次登陆
  // 是->清空组数
})