var select=[null,null];
var index_genr = -1, index_type = -1, index_poster = -1;
$(document).ready(()=>{
    $("#block_1, #block_2, #block_3").fadeOut();
    $("#head #button,#box1 .reset").click(()=>{
        $("#block_1").fadeIn(1500);
        chooseGenrType();
    });
    $("#box1 .next, #box2 .reset").click(()=>{
        $("#block_2").fadeIn(1500);
        chooseType();
    });
    $("#box2 .next").click(()=>{
        $("#block_3").fadeIn(1500);
        showResult();
    });
    
});

function randomGenerator(listNum, preval){
    console.log(preval)
    var g=Math.floor(Math.random()*100);
    var newval = g % listNum;
    while(newval == preval){
         g = Math.floor(Math.random()*100);
         newval = g % listNum;
    }
    return newval;
}
function chooseGenrType(){
    index_genr = randomGenerator(generalType.length, index_genr);
    var item_genr = generalType[index_genr];
    $("#box1 span").html("<br>"+item_genr.name);
    select[1] = item_genr.name;
    $("#box1 .info").empty();
    $("#poster").click(()=>{
        index_poster = randomGenerator(item_genr.img.length, index_poster);
        $("#box1 .info").empty();
        $("#box1 .info").append(`<img src=${item_genr.img[index_poster]}></img>`);
    });
}
function chooseType(){
    index_type = randomGenerator(type.length, index_type);
    $("#box2 .info").empty();
    $(type).each((i,ele)=>{
        $("#box2 .info").append(`<div>${ele}</div>`);
    });
    item_type = $("#box2 .info div").eq(index_type);
    item_type.css({
        "backgroundColor":"#1E90FF",
        "color":"white"
    });
    select[0]=item_type.text();
}
function showResult(){
    if(select[0] !=null && select[1] != null){
        $("#box3 .info").text("今天來看個"+select[0]+select[1]+"吧!");
    }   
}
