// pages/index/index.js
var call = require("../../utils/request.js")
const app = getApp()

Page({
  // * 页面的初始数据
  data: {
    userId: 0,
    userInfo: {
      avatarUrl: "/icons/default_avatar.png",
      nickName: "未登录用户",
      gender: 0,
      hasUserInfo: false,
    },
    canIUseGetUserProfile: false,
    logNum: "0",
    userRank: "9999+",
  },

  onLoad() {
    this.setData({
      userInfo: wx.getStorageSync('userInfo'),
      userId: wx.getStorageSync('userId')
    })
    console.log("index page, getStorageSync, userInfo =",this.data.userInfo)
    //获取用户当前打卡总记录和排行榜排名
    //call.require(url,this.data.userId,doSuccess,doFail)
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
  },

  getUserInfo(e) {
    var that=this;
    if(e.detail.errMsg == "getUserInfo:ok"){
      app.globalData.userInfo = e.detail.userInfo
      that.setData({
        'userInfo.avatarUrl':e.detail.userInfo.avatarUrl,
        'userInfo.nickName':e.detail.userInfo.nickName,
        'userInfo.gender':e.detail.userInfo.gender,
        'userInfo.hasUserInfo':true
      })
      wx.setStorageSync('userInfo', this.data.userInfo)
      console.log("getUserInfo and setStorageSync, userInfo =",this.data.userInfo)
      //call.request("/avatar",this.data.userInfo,this.uploadUserIndfoSuccess,this.fail)
      //call.request("/lognum",this.data.userInfo.code,getUserLogNumSuccess,this.fail)
    } else {
      console.log("getUserInfo fail", e.detail)
    }
  },
  getUserProfile(e) {
    var that=this;
    wx.getUserProfile({
      desc: '用于完善会员资料', 
      success: (res) => {
        that.setData({
          'userInfo.avatarUrl':res.userInfo.avatarUrl,
          'userInfo.nickName':res.userInfo.nickName,
          'userInfo.gender':res.userInfo.gender,
          'userInfo.hasUserInfo':true
        })
        wx.setStorageSync('userInfo', this.data.userInfo)
        console.log("getUserProfile and setStorageSync, userInfo =",this.data.userInfo)
        //call.request("/avatar",this.data.userInfo,this.uploadUserIndfoSuccess,this.fail)
        //call.request("/lognum",this.data.userInfo.code,getUserLogNumSuccess,this.fail)
      },
      fail: (res) =>{
        console.log("getUserProfile fail", res)
      }
    })  
  },

  setExerciseId(){
    wx.setStorageSync('exerciseId', 0)
    console.log("setStorageSync, exerciseId =", 0)
  },

  //分享
  onShareAppMessage(res) {
    return {
      //let gbid = res.target.dataset.info;
      title: '一起来做轻松颈椎操~',
      path: '/pages/exercise/exercise',
      success: function (res) {
      // 转发成功
        wx.showToast({
          title: "分享成功",
          icon: 'success',
          duration: 2000
        })
        console.log("onShareAppMessage success, path =", path)
      },
      fail: function (res) {
        console.log("onShareAppMessage fail")
      },
    }
  },
})