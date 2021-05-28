$(function() {
  getuserinfo()
})
function getuserinfo() {
  $.ajax({
    type:'get',
    url:'/my/userinfo',
    headers: {
      Authorization:localStorage.getItem('token')
    },
    success:function(res){
      if(res.status !== 0) {
        return layui.layer.msg('获取用户信息失败！')
      }
      setAvatar(res.data)
    },
    
  })
}
function setAvatar(user) {
  var name = user.nickname || user.username
  $('.welcome').html('欢迎&nbsp;&nbsp;'+name)
  if(user.user_pic !== null) {
    $('.layui-nav-img').img.attr('src',user.user_pic).show()
    $('.text-avatar').hide()
  } else {
    $('.layui-nav-img').hide()
    var first = name[0].toUpperCase()
    $('.text-avatar').html(name).show()
  }
}
var layer = layui.layer
$('#indexout').on('click',function() {
  layer.confirm('确认退出登录?', {icon: 3, title:'提示'}, function(index){
    //do something
    localStorage.removeItem('token')
    location.href = '/login.html'
    layer.close(index);
  });
  
})