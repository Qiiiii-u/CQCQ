// pages/email_verify/email_verify.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    email:"",
    num:""
  },

  emailInput: function (e) {
    this.data.email = e.detail.value
  },

  numInput: function (e) {
    this.data.num = e.detail.value
  },

  //填写邮箱及验证码
  onInput: function (e) {
    var that = this;
    console.log(that.data.email)
    var myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
    if (that.data.email == "") {
      wx.showModal({
        title: '提示',
        content: '请输入邮箱',
        showCancel: false
      })
    }
    else if (!myreg.test(that.data.email)) {
      wx.showModal({
        title: '提示！',
        content: '请输入正确的邮箱！',
        showCancel: false,
        success(res) {}
      })
    } 
    else if (that.data.num == "") {
      wx.showModal({
        title: '提示',
        content: '请输入验证码',
        showCancel: false
      })
    }
    else{
      console.log(that.data.num)
      wx.request({
        url: getApp().globalData.server + '/cqcq/public/index.php/index/forget/verifyEmail',
        data: {
          email:that.data.email,
          captcha:that.data.num
        },
        method: "POST",
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        success: function (res) {
          console.log(res.data)
          if (res.data.error_code == 1) {
            wx.showModal({
              title: '提示！',
              showCancel: false,
              content: res.data.msg,
              success: function (res) { }
            })
          }
          else if (res.data.error_code == 2) {
            wx.showModal({
              title: '提示！',
              showCancel: false,
              content: res.data.msg,
              success: function (res) { }
            })
          }
          else if (res.data.error_code != 0) {
            wx.showModal({
              title: '哎呀～',
              content: '出错了呢！' + res.data.msg,
              success: function (res) {
                if (res.confirm) {
                  console.log('用户点击确定')
                } else if (res.cancel) {
                  console.log('用户点击取消')
                }
              }
            })
          }
          else if (res.data.error_code == 0) {
            wx.showModal({
              title: '恭喜！',
              showCancel: false,
              content: '下一步',
              success: function (res) {
                if (res.confirm) {
                  console.log('用户点击确定')
                } else if (res.cancel) {
                  console.log('用户点击取消')
                }
              },
              complete: function(res){
                  wx.reLaunch({
                    url: "../change_passwd/change_passwd?email="+that.data.email
                  })
              }  
            })
          }
        },
        fail: function (res) {
          wx.showModal({
            title: '哎呀～',
            content: '网络不在状态呢！',
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确定')
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
        }
      })
    }
  },

  //获取验证码
  onClick:function(e){
    var that = this;
    if (that.data.email == "") {
      wx.showModal({
        title: '提示',
        content: '请输入邮箱',
        showCancel: false
      })
    }
    else{
      console.log("success")
       wx.request({
        url: getApp().globalData.server + '/cqcq/public/index.php/index/forget/sendMailCaptcha',
        data: {
          email:that.data.email
        },
        method: "POST",
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        success: function (res) {
          console.log(res.data)
          if (res.data.error_code == 1) {
            wx.showModal({
              title: '提示！',
              showCancel: false,
              content: res.data.msg,
              success: function (res) { }
            })
          }
          else if (res.data.error_code == 2) {
            wx.showModal({
              title: '提示！',
              showCancel: false,
              content: res.data.msg,
              success: function (res) { }
            })
          }
          else if (res.data.error_code != 0) {
            wx.showModal({
              title: '哎呀～',
              content: '出错了呢！' + res.data.msg,
              success: function (res) {
                if (res.confirm) {
                  console.log('用户点击确定')
                } else if (res.cancel) {
                  console.log('用户点击取消')
                }
              }
            })
          }
          else if (res.data.error_code == 0) {
            wx.showModal({
              title: '恭喜！',
              showCancel: false,
              content: '发送成功',
              success: function (res) {
                if (res.confirm) {
                  console.log('用户点击确定')
                } else if (res.cancel) {
                  console.log('用户点击取消')
                }
              }
                })
              }
          },
          fail: function (res) {
            wx.showModal({
              title: '哎呀～',
              content: '网络不在状态呢！',
              success: function (res) {
                if (res.confirm) {
                  console.log('用户点击确定')
                } else if (res.cancel) {
                  console.log('用户点击取消')
                }
              }
            })
          }
      })
    }
  }
})