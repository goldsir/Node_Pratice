// 优惠_伸縮廣告顯示
jQuery(function($){
    $("div.ad_title").css({cursor:"pointer"}).click(function(){
    $(this).next().toggle("normal");
    });
});

// 最新消息_下拉選單顯示
jQuery(function($){
	$("div.popnews_list").css({cursor:"pointer"}).click(function(){
	$(this).next().toggle("bold");
	});
});

// 平台轉帳_下拉選單顯示
jQuery(function($){
	$("div.select_text").css({cursor:"pointer"}).click(function(){
	$(this).next().toggle("normal");
	});
});

// 個人訊息_下拉選單顯示
jQuery(function($){
	$("div.msg_list").css({cursor:"pointer"}).click(function(){
	$(this).next().toggle("bold");
	});
});

// 會員互轉_下拉選單顯示
jQuery(function($){
	$("div.mc_select").css({cursor:"pointer"}).click(function(){
	$(this).next().toggle("bold");
	});
});