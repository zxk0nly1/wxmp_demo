// pages/movie/movie.js

var app=getApp();

Page({
  data:{
    comingSoon:[],
    inTheaters:[],
    Top250:[]
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var inTheaters=app.globalUrl.doubanUrl+"/v2/movie/in_theaters?start=0&count=3"
    var comingSoon=app.globalUrl.doubanUrl+"/v2/movie/coming_soon?start=0&count=3"
    var Top250=app.globalUrl.doubanUrl+"/v2/movie/top250?start=0&count=3"
    this.http(inTheaters,this.callback,"inTheaters","即将上映");
    this.http(comingSoon,this.callback,"comingSoon","正在热映");
    this.http(Top250,this.callback,"Top250","排行榜");
  },

    http:function(url,callback,category,categoryName){
        wx.request({
          url: url,
          header: {
            'content-type': 'application/xml'
          }, // 设置请求的 header
          success: function(res){
            callback(res.data,category,categoryName)
          }
       })
  },

  callback:function(res,category,categoryName){
    //console.log(res);
    //处理数据
    /**
     * 1. 大图
     * 2. 标题
     * 3. 星型
     * 4. 评分
     * 5. id
     * 
     * 评星 10 20 30 40 50
     */
    var moives=[];
    for(var idx in res.subjects){
      var subject=res.subjects[idx];
      var title=subject.title;
      //名字过长，截取处理（0-6个）
      if(title.length>=6){
        title=title.substring(0,6)+"...";
      }
      var temp={
        title:title,
        coverageUrl:subject.images.large,
        star:"",
        average:subject.rating.average,
        movieid=subject.id
      }
      movies.push(temp);
      console.log(movies);
    }
    console.log(movies);
    //类型不同
    var readyData={};
    readyData[category]={
      categoryName:categoryName,
      movies:movies
    }
    this.setData(readyData);
  }
})