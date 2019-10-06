App({
  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        env: "todo100-jiccb", // 测试环境
        // env: "cloud-app-ngreg", // 上线环境
        traceUser: true,
      })
    }

    wx.cloud.callFunction({
      name: 'getOpenId',
      complete: res => {
        // console.log(res)
        this.globalData.openid = res.result.openId
        console.log("appjs, open id " + this.globalData.openid)
      }
    })
  },

  globalData: {
    openid: ''
  }
})