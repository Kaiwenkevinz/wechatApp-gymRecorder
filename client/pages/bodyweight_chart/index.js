let chart = null;
import data from "./fake_data.js"

function initChart(canvas, width, height, F2) {
  chart = new F2.Chart({
    el: canvas,
    width,
    height,
    animate: false
  });
  chart.source(data, {
    date: {
      min: 2014,
      max: 2018
    }
  });
  chart.tooltip({
    showCrosshairs: true,
    showItemMarker: false,
    background: {
      radius: 2,
      fill: '#1890FF',
      padding: [3, 5]
    },
    nameStyle: {
      fill: '#fff'
    },
    onShow(ev) {
      const items = ev.items;
      items[0].name = items[0].date;
    }
  });
  chart.line().position('date*weight');
  chart.point()
    .position('date*weight')
    .style({
      lineWidth: 1,
      stroke: '#fff'
    });

  chart.interaction('pan');
  // 定义进度条
  chart.scrollBar({
    mode: 'x',
    xStyle: {
      offsetY: -5
    }
  });

  // // 绘制 tag
  // chart.guide().tag({
  //   position: [1969, 1344],
  //   withPoint: false,
  //   content: '1,344',
  //   limitInPlot: true,
  //   offsetX: 5,
  //   direct: 'cr'
  // });
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
    }
  },

  onReady() {
  }
});
