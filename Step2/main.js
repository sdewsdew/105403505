$(document).ready(function(){
    $("#courseTable").append("<tr><th>場次</th><th>時間</th><th>主題</th</tr>");
    
    var topicCount=topic.length;
    var dayUnit=24*60*60*1000;
    var interval=1; //相隔1天
    for(var x=0;x<topicCount;x++){
      $("#courseTable").append("<tr>");
      $("#courseTable").append("<td>"+(x+1)+"</td>");
    /*    
      $("#courseTable").append("<td>"+(startDate+7*x)+"</td>"); 
        //做運算 資料型態要一樣
        //否則會變字串+字串
    */    
      $("#courseTable").append("<td>"+
                               new Date(startDate.getTime()+interval*dayUnit*x).toLocaleDateString().slice(5)+"</td>");     
      $("#courseTable").append("<td>"+topic[x]+"</td>");
      $("#courseTable").append("</tr>");
    }
});




//getTime() 從1970年到現在的豪秒
/*toLocaleDateString() 傳回的日期字串值是配合主機環境目前的地區設定或指定的地區設定的時間格式 (Locale) 
   dateObj.toLocaleDateString( [locales][, options])*/ 
//new Date() new Date(arg)
//String.slice(start,'end')含頭不含尾
