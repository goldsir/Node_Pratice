//回到頂端按鈕

$(function(){
    // 點下按鈕之後，會以animate動態效果讓捲軸捲到網頁最頂端
    $("#btn_goTop").click(function(){
        jQuery("html,body").animate({
            scrollTop:0
        },500);
    });

    // 目前的位置距離網頁頂端，大於200px就顯示按鈕，小於就隱藏
    $(window).scroll(function() {
        if ( $(this).scrollTop() > 500){
            $('#btn_goTop').fadeIn("fast");
        } else {
            $('#btn_goTop').stop().fadeOut("fast");
        }
    });
});