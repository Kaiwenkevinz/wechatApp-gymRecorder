// pages/bodyweight_chart/index.js

import data from "./fake_data.js"
import util from './../../utils/util'

let chart = null;

function initChart(canvas, width, height, F2) {
  chart = new F2.Chart({
    el: canvas,
    width,
    height
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
    readableDate: null
  },

  onLoad: function(options) {
    this.setData({
      readableDate: util.formatDate(new Date(this.data.currentDate))
    })
    console.log(this.data.readableDate)
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
    console.log(event.detail)
    this.setData({
      currentDate: event.detail,
      show: false
    })
    this.setData({
      readableDate: util.formatDate(new Date(this.data.currentDate))
    })
    console.log("loading data")
  }
});
