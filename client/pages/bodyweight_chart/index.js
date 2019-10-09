// pages/bodyweight_chart/index.js

import util from './../../utils/util'
import Dialog from './../../miniprogram_npm/vant-weapp/dialog/dialog';
import Toast from './../../miniprogram_npm/vant-weapp/toast/toast';

const app = getApp()
const db = wx.cloud.database()
let chart = null;
let data = [{
  "weight": 0,
  "date": 0
}];

function initChart(canvas, width, height, F2) {
  chart = new F2.Chart({
    el: canvas,
    width,
    height,
    animate: false
  });

  chart.source(data);

  chart.line().position('date*weight')
  chart.render();
  return chart;
}

Page({
  onShareAppMessage: function (res) {
    return {
      title: 'F2 微信小程序图表组件，你值得拥有~',
      path: '/pages/index/index',
      success: function () { },
      fail: function () { }
    }
  },
  data: {
    opts: {
      onInit: initChart
    },
    show: false,   // 弹出层
    minDate: new Date(2019,1,1).getTime(),
      formatter(type, value) {
        if (type === 'year') {
          return `${value}年`;
        } else if (type === 'month') {
          return `${value}月`;
        }
        return value;
      },
    maxDate: new Date().getTime(),
    currentDate: new Date().getTime(),
    readableDate: null,
    weight_entered: null
  },

  onLoad: function(options) {
    this.setData({
      readableDate: util.formatDate(new Date(this.data.currentDate))
    })
    this.loadBodyWeight()
  },

  onClickDateCell() {
    this.setData({ show: true });
  },

  onClosePopup() {
    this.setData({ show: false });
  },

  onCancelPicker() {
    this.setData({ show: false });
  },

  onConfirmPicker(event) {
    this.setData({
      currentDate: event.detail,
      show: false
    })
    this.setData({
      readableDate: util.formatDate(new Date(this.data.currentDate))
    })
    this.loadBodyWeight()
  },

  onClickEnterWeightBtn() {
    var obj = {
      date: util.formatTime(new Date()),
      weight: parseInt(this.data.weight_entered)
    }
    console.log(obj.weight)
    if (obj.weight) {
      console.log(obj)
      db.collection('body_weight').add({
        data: obj,
        success: res => {
          console.log("weight saved")
          this.setData({
            weight_entered: null
          })
          this.loadBodyWeight()
        }
      })
    } else {
      Toast('请输入体重')
    }
  },

  onChangeFieldBodyWeight(event) {
    // console.log(event.detail);
    this.setData({
      weight_entered: event.detail
    })
  },

  loadBodyWeight() {
    console.log('loading')

    const _ = db.command
    var data = []
    const date_selected = new Date(this.data.currentDate)
    var date = util.formatTime(date_selected)
    var firstDay = util.getFirstDay(date_selected)
    var lastDay = util.getLastDay(date_selected)

    db.collection('body_weight')
      .where({
        _openid: app.globalData.openid,
        date: _.gte(firstDay).and(_.lte(lastDay))
      }).get({
        success: res => {
          res.data.forEach(function (obj) {
            obj.date = parseInt(obj.date.slice(-2))
          });
          console.log(res.data)
          chart.changeData(res.data)
          chart.render()
          Toast('体重追踪图已更新')
          console.log("render")
        },
        fail: res => {
          console.log('fail on loading body weight')
        }
      })
  }
});
