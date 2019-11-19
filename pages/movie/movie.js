// pages/movie/movie.js

var app=getApp();

Page({
  data:{},
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var inTheaters=app.globalUrl.doubanUrl+"/v2/movie/in_theaters?start=0&count=3"
    var comingSoon=app.globalUrl.doubanUrl+"/v2/movie/coming_soon?start=0&count=3"
    var Top250=app.globalUrl.doubanUrl+"/v2/movie/top250?start=0&count=3"
    this.http(inTheaters,this.callback);
    this.http(comingSoon,this.callback);
    this.http(Top250,this.callback);
  },

    http:function(url,callback){
        wx.request({
          url: url,
          header: {
            'content-type': 'application/xml'
          }, // 设置请求的 header
          success: function(res){
            callback(res.data)
          }
       })
  },

  callback:function(res){
    //处理数据
    console.log(res.data)
  }
})