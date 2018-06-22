var mapArray, ctx, currentImgMainX, currentImgMainY;
var imgMountain, imgMain, imgEnemy, imgDes,key;
var targetBlock=-1;
//mapArray為地圖中每個格子元素
//ctx:HTML5 Canvas用

//character
var mainW=250, mainH=328, baseLen=75, bgLen=600, n=8;

//status
var keyNum=5, treaNum=0;
$(document).ready(function(){
     
    
    //設定地形
    //0:可走、1:障礙、2:終點、3:敵人 4:key
    mapArray=[0,0,0,0,0,4,3,0,
              0,0,3,1,0,0,0,0,
              0,0,0,0,1,0,1,4,
              1,3,1,0,4,0,0,0,
              0,1,0,0,0,3,0,0,
              0,1,0,3,0,0,4,0,
              0,4,3,0,0,0,0,1,
              1,0,0,0,0,3,0,2];//canvas分成nxn的九宮格
    ctx=$("#myCanvas")[0].getContext("2d");
    
    imgMain=new Image();
    imgMain.src="Step4/new_img/shin_main.png";
    currentImgMainX=0;
    currentImgMainY=0;
    imgMain.onload=function(){
        ctx.drawImage(imgMain,0,0,mainW,mainH,currentImgMainX,currentImgMainY,baseLen,baseLen);
    }
    
    imgMountain=new Image();
    imgMountain.src="Step4/new_img/box.png";
    imgEnemy=new Image();
    imgEnemy.src="Step4/new_img/siro.png";
    imgDes=new Image();
    imgDes.src="Step4/new_img/final.png";
    
    imgMountain.onload=function(){
        imgEnemy.onload=function(){
            for(var x in mapArray){
                if(mapArray[x]==1 || mapArray[x]==4){
                    //120,0,150,200 for open
                 ctx.drawImage(imgMountain,0,0,115,120,x%n*baseLen,Math.floor(x/n)*baseLen,baseLen,baseLen);
                }
                else if(mapArray[x]==3){
                    ctx.drawImage(imgEnemy,0,0,410,360,x%n*baseLen,Math.floor(x/n)*baseLen,baseLen,baseLen);
                }
            }
        }
    }
    
    imgDes.onload = function(){
        ctx.drawImage(imgDes,0,0,1024,1024,bgLen-baseLen,bgLen-baseLen,baseLen,baseLen);
    }
    
    key=$("<img src='Step4/new_img/key.png' id='key'>");
    key.css({"width":baseLen+50,"height":baseLen+50});
    $("body").append(key);
    
    $("#fin_yes").click(()=>{
        $("#dialogFin").hide();
        $("#gameOver").text("YOU WIN");
        $("#gameOver").animate({top:'250px'},1500);
        $("#gameOver").fadeTo(3000,0.8);
    }); 
    $("#fin_no").click(()=>{
        $("#dialogFin").hide();
        $("#gameOver").text("YOU LOSE");
        $("#gameOver").animate({top:'250px'},1500);
        $("#gameOver").fadeTo(3000,0.8);
    });
    
});


$(document).keydown(function(event){
    var targetImgMainX, targetImgMainY,cutImggePositionX;
    event.preventDefault();
    //避免點擊鍵盤出現瀏覽器其他行為，例如捲動、放大、換頁...
    
    switch(event.which){
            case 37://left
                targetImgMainX=currentImgMainX-baseLen;
                targetImgMainY=currentImgMainY;
                break;
            case 38://up
                targetImgMainX=currentImgMainX;
                targetImgMainY=currentImgMainY-baseLen;
                break;
            case 39://right
                targetImgMainX=currentImgMainX+baseLen;
                targetImgMainY=currentImgMainY;
                break;
            case 40://down
                targetImgMainX=currentImgMainX;
                targetImgMainY=currentImgMainY+baseLen;
                break;
             case 90:
                if(mapArray[targetBlock] == 4 || mapArray[targetBlock] == 1){
                    openBox();
                    mapArray[targetBlock] = 3;
                }    
                break;
        default:
            return;
    }
    
    if(targetImgMainX<=bgLen-baseLen && targetImgMainX>=0 && targetImgMainY<=bgLen-baseLen && targetImgMainY>=0){
            targetBlock=targetImgMainX/baseLen+targetImgMainY/baseLen*n;
    }
    else{
        targetBlock=-1;
    }
    
    ctx.clearRect(currentImgMainX, currentImgMainY, baseLen, baseLen);//清除主角原本位置
//-------------------------------------------------------------------------------------    
   /* if(targetBlock==-1 || mapArray[targetBlock]==1 || mapArray[targetBlock]==3){
        //不能移動 但會轉動
        if(mapArray[targetBlock] == 1){
            alert("box");
            ctx.clearRect(targetBlock%n*baseLen,Math.floor(targetBlock/n)*baseLen, baseLen, baseLen)
            ctx.drawImage(imgMountain,120,0,150,200,targetBlock%n*baseLen,Math.floor(targetBlock/n)*baseLen,baseLen,baseLen);
        }
    }
    else{
        $("talkBox").text("");
        currentImgMainX=targetImgMainX;
        currentImgMainY=targetImgMainY;
    }*/
//-------------------------------------------------------------------------------------
    
    switch(mapArray[targetBlock]){
        case 1:
        break;
        case 4:
        break;    
        case 3:
        break;
        case 2:
            if(treaNum >= 3){
                $("#dialogFin").show();
            }
        break;    
        case undefined:
        break;
        default:
            $("talkBox").text("");
            currentImgMainX=targetImgMainX;
            currentImgMainY=targetImgMainY;
    }
    ctx.drawImage(imgMain,0,0,mainW,mainH,currentImgMainX,currentImgMainY,baseLen,baseLen);
    
   /* switch(mapArray[targetBlock]){
        case undefined://牆壁
            $("#talkBox").text("邊界");
        break;
        case 1:
            $("#talkBox").text("有山");
        break;
        case 2:
            $("#talkBox").text("抵達終點!");
        break;
        case 3:
            $("#talkBox").text("嗨~");
        break;    
    }*/
});

function openBox(){
    ctx.clearRect(targetBlock%n*baseLen,Math.floor(targetBlock/n)*baseLen, baseLen, baseLen);
        ctx.drawImage(imgMountain,120,0,150,200,targetBlock%n*baseLen,Math.floor(targetBlock/n)*baseLen,baseLen,baseLen);
        $("#dialog").hide();
        
        keyNum--;
        if(keyNum >= 0){
            $("#status span").eq(0).text("X"+keyNum);
            if(mapArray[targetBlock] == 1){
                $("#line").append("箱子是空的QQ<br>");
            }
            else{
                $("#key").show();
                $("#key").animate({top:'300px'},1500);
                $("#key").fadeOut(1000);
                $("#key").animate({top:'-100px'},1);
                $("#line").append("獲得小餅乾!<br>");
                treaNum++;
                $("#status span").eq(1).text("X"+treaNum);
            }
        }
        else{
            $("#gameOver").text("YOU LOSE");
            $("#gameOver").animate({top:'250px'},1500);
            $("#gameOver").fadeTo(3000,0.8);
        }
}
 
