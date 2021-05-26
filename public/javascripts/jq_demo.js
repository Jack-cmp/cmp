
$(function(){
    $("#nextPage").click(function(){
       
        $.ajax({
            type:"post",
            url:"/table/nextpage",
            success:function(data){
                document.getElementById("showdata").innerHTML = data.map((i,ind) =>
                 ` <tr>
                <td>${i.name}</td>
                <td>${i.s1}</td>
                <td>${i.s2}</td>
                <td>${i.s3}</td>
                <td>${i.s1+i.s2+i.s3}</td>
                <td>
                     <input type="button" value="删除" class="del_button" data-id=${ind}/>
                
                     <input type="button" value="修改" class="upd_button" data-id=${ind}/>
                </td>
                </tr>
                `).join("");
            }
        })
    })
});