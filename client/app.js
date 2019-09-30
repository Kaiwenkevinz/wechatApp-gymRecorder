App({
  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        env: "todo100-jiccb",
        traceUser: true,
      })
    }

    // wx.cloud.callFunction({
    //   name: 'getOpenId',
    //   complete: res => {
    //     var openid = res.result.openId;
    //     this.globalData.userInfo = openid
    //     console.log("app.js " + openid)
    //     wx.setStorage({
    //       key: 'openId',
    //       data: openid
    //     })
    //   }
    // })
  },

  globalData: {
    userInfo: ''
  }
})