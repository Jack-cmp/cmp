document.getElementById("add_button").onclick = function(){
    window.location.href ='/table/addpage';
}

$(function(){

//删除
Array.from(document.getElementsByClassName("del_button")).forEach(i =>
  i.onclick = function(){
let ind= i.getAttribute("data-id");
$.ajax({
  url:'/table/del/'+ind,
  type:"delete",
  success:function(data){
    if(data == "删除成功"){
      $(i).parent().parent().remove()
    }
  }
})
  });

  //修改
  Array.from(document.getElementsByClassName("upd_button")).forEach(i =>
    i.onclick = function(){
  let ind= this.getAttribute("data-id");
  window.location.href = '/table/add2/'+ind;
    });
  })
