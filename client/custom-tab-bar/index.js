Component({
  data: {
    active: 0,
    list: [
      {
        icon: 'fire',
        text: '首页',
        url: '/pages/index/index'
      },
      {
        icon: 'wap-nav',
        text: '历史',
        url: '/pages/history/index'
      },
      {
        icon: 'manager',
        text: '我的',
        url: '/pages/user/index'
      },
    ]
  },

  methods: {
    onChange(event) {
      this.setData({ active: event.detail });
      wx.switchTab({
        url: this.data.list[event.detail].url
      });
    },

    init() {
      const page = getCurrentPages().pop();
      this.setData({
        active: this.data.list.findIndex(item => item.url === `/${page.route}`)
      });
    }
  }
});
