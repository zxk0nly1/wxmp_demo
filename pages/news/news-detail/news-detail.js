var newsData=require("../../data/newsdata.js");

Page({
  data:{

  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数

   this.setData(newsData.initData[options.newsid]);
   this.setData({
     newsid:options.newsid
   })
   //测试本地存储 设置 获取
   //wx.setStorageSync('key', 'value')
  //console.log(wx.getStorageSync('key')); 
  //wx.removeStorageSync('key');
  //wx.clearStorageSync();
  //收藏存储数据格式
  /**
   * 
   * var newsCollect ={
   * 0:true,
   * 1:false,
   * 2:true
   * }
   */

  //第一次进入的时候判断收藏的状态
  var newsCollect=wx.getStorageSync('newsCollect');
  //若newsCollect存在，则代表收藏过或取消过收藏
  if(newsCollect){
    var newCollect =newsCollect[options.newsid]
    this.setData({
      collected:newCollect
    })
  }
  //不存在数据
  else{
    var newsCollect={};
    //当前唯一id赋值到newsCollect对象中,然后默认指定false
    newsCollect[options.newsid]=false;
    //赋值到本地存储中
    wx.setStorageSync('newsCollect', newsCollect);
  }
  },
  collectTap:function(event){
    //注意：newsCollect所有数据的集合
    var newsCollect= wx.getStorageSync('newsCollect');

    //注意：newCollect是一条数据
    var newCollect=newsCollect[this.data.newsid]
    //点击时候，若收藏则取消，若未收藏则收藏
    newCollect=!newCollect;

    //更新到本地存储中
    newsCollect[this.data.newsid]=newCollect;
    wx.setStorageSync('newsCollect', newsCollect);
    //更新视图
    this.setData({
      collected:newsCollect[this.data.newsid]
    })

    wx.showToast({
      title:newsCollect[this.data.newsid]?"收藏成功":"取消收藏",
      icon:'success',
      duration:800,
      mask:true
    })
    
    },

    /**
     * 
     *
     onShowTap:function(event){
      wx.showModal({
        title:'提示',
        content:'这是模态窗',
        success:function(res){
          if(res.confirm){
            console.log('确定')
          }
        }
     * 
     *
     * 
     * 
     */

     


//         wx.showActionSheet({
//           itemList:['分享到微信','分享到微博','分享到QQ'],
//           success:function(res){
//             console.log(res.tapIndex)
//           },
//           fail:function(res){
//             console.log(res.errMsg)
//           }
//         })
// },
//       onShareAppMessage:function(){
//         return{
//           title:'newsData.initData[options.newsid].title',
//           path:''
//         }
//       }

      
})
