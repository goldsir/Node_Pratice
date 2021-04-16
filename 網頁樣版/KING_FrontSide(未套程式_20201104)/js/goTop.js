// 點下按鈕後，會以動態效果讓捲軸捲到網頁最頂端，500為速度
$(document).ready(function() {
    $(".go_top").click(function() {
        $("html, body").animate({
            scrollTop: 0
        }, 500);
    });
});
// 目前的位置距離網頁頂端，大於350px就顯示按鈕，小於就隱藏
$(window).scroll(function() {
    if ( $(this).scrollTop() > 350){
        $(".go_top").fadeIn("fast");
    } else {
        $(".go_top").stop().fadeOut("fast");
    }
});