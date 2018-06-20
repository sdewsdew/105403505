var topic=[
    "The Walking Dead",
    "Agents of shield",
    "Gotham",
    "Lost Girl",
    "The Handmaid's Tale",
    "West World",
    "Breaking Bad",
    "The Strain"
];

var startDate=new Date();//取得當下時間

function setMonthAndDay(startMonth,starDay){
    startDate.setMonth(startMonth);
    startDate.setDate(starDay);
    startDate.setHours(0);
    startDate.setMinutes(0);
    startDate.setSeconds(0);
}

setMonthAndDay(new Date().getMonth(),new Date().getDate());