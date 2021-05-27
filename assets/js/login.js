$(function() {
  $('.link_reg').on('click',function() {
    $('.login_box').hide()
    $('.reg_box').show()
  })
  $('.link_login').on('click',function() {
    $('.reg_box').hide()
    $('.login_box').show()
  })
})
var form = layui.form
var layer = layui.layer
form.verify({
  pwd:[
    /^[\S]{6,12}$/
    ,'密码必须6到12位，且不能出现空格'
  ],
  repwd:function(value) {
    if(value !== $('.first_pwd').val()) {
      return '两次密码不一致'
    }
  }
})
$('#form_reg').on('submit',function(e) {
  e.preventDefault()
  var data = {
    username:$('#form_reg [name=username]').val(),
    password:$('#form_reg [name=password]').val()
  }
  $.post('/api/reguser',data,function(res){
    if(res.status !== 0) {
      return layer.msg(res.message)
     
    } 
    layer.msg('注册成功')
    $('.link_login').click()
    
  })
})
$('#form_login').on('submit',function(e) {
  e.preventDefault()
  $.ajax({
    method:'post',
    url:'/api/login',
    data:$(this).serialize(),
    success:function(res) {
      if(res.status !== 0) {
        return layer.msg('登录失败')
      }
      layer.msg('登陆成功')
      localStorage.setItem('token',res.token)
      location.href = '/index.html'
    }
  })
})