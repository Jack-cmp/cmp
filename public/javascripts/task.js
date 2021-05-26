document.getElementById("add_button").onclick = function(){
    window.location.href ='/table/addpage';
}

$(function(){


Array.from(document.getElementsByClassName("del_button")).forEach(i =>
  i.onclick = function(){
    // alert(1)
let ind= i.getAttribute("data-id");
$.ajax({
  url:'/table/del/'+ind,
  type:"delete",
  success:function(data){
    if(data == "删除成功"){
      // alert('失败')
      $(i).parent().parent().remove()
    }
  }
})
  });

  Array.from(document.getElementsByClassName("upd_button")).forEach(i =>
    i.onclick = function(){
  let ind= this.getAttribute("data-id");
  window.location.href = '/table/update/'+ind;
    });
  })
