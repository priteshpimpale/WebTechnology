/*jshint browser:true */
/*globals $*/
"use strict";

function createActorDiv(actor){
    var div = "<div class=\"mdl-list__item\">"+
            "<span class=\"mdl-list__item-primary-content\">"+
            "<i class=\"material-icons mdl-list__item-avatar\">person</i>"+
            "<span id=\""+ actor.id +"\">"+ actor.name +"</span>"+
            "</span>"+
            "<a class=\"mdl-list__item-secondary-action\">";
            
            if(actor.starred){
                div+="<i class=\"material-icons star\">star</i></a>";
            }else{
                div+="<i class=\"material-icons star\">star_border</i></a>";
            }
            div+="</div>";
    return div;
}

var addActor = function(){
    var actor = $("#actorName")[0].value;
    if(actor !== "" ){
        $.ajax({
            url:"http://localhost:3000/actors",
            type:"post",
            data: JSON.stringify({ name : actor , starred : false }),
            contentType:"application/json",
            dataType:"JSON",
            success : function(data){
                var div = createActorDiv(data);
                    $("#actors").append(div);
                    $("#actorName")[0].value = "";
                    $('#actor').removeClass('is-dirty');
            },
            error : function(error){
                window.alert(error);
            }
        });    
    }else{
        window.alert("PLease enter actor name");
    }
};


function getActorsInfo() {
    $.ajax({
       url:"http://localhost:3000/actors",
       type:"get",
       dataType:"JSON",
       success:function(data){
           $("#actors").innerHTML="";
           $.each(data,function(i,item){
               var div = createActorDiv(item);
                    $("#actors").append(div);
           });
       },
       error:function(xhr,status){
           window.alert(xhr + status);
       }
    });
}

var toggleStar = function(){
    
    var star = $(this)[0].innerHTML;
    var actorName = $(this)[0].parentNode.parentNode.children[0].children[1].innerHTML;
    var actorId = $(this)[0].parentNode.parentNode.children[0].children[1].id; 
    var starred;
    if(star === "star"){
        starred = false;
    }else if (star === "star_border"){
        starred = true;
    }
    
    $.ajax({
        url:"http://localhost:3000/actors/" + actorId,
        type:"PUT",
        data : { "name" : actorName,"starred" : starred },
        contenType : "JSON",
        dataType : "JSON",
        success : function(data){
            if(data.starred){
                $("#"+data.id)[0].parentNode.parentNode.children[1].children[0].innerHTML = "star";
            } else {
                $("#"+data.id)[0].parentNode.parentNode.children[1].children[0].innerHTML = "star_border";
            }
        },
        error: function(xhr,status){
            window.alert("Error :" + xhr + status);
        }
    });
};

$(document).ready(function(){
    getActorsInfo();
    $("#addActor").on("click",addActor);
    $(".demo-list-action").on("click","a i.star",toggleStar);
});