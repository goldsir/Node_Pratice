//滑過_首頁遊戲選項列表_滑出滑入效果JS
$(function(){
	// 幫 #menu li 加上 hover 事件
	$('#menu>li').hover(function(){
		// 先找到 li 中的子選單
		var _this = $(this),
			_subnav = _this.children('ul');
		// 變更目前母選項的背景顏色，同時滑入子選單(如果有的話)
		_this.css('backgroundColor', '');
		_subnav.stop(true, true).slideDown(400);
	} , function(){
		// 變更目前母選項的背景顏色，同時滑出子選單(如果有的話)
		// 也可以把整句拆成上面的寫法
		$(this).css('backgroundColor', '').children('ul').stop(true, true).slideUp(400);
	});
	
	// 取消超連結的虛線框
	$('a').focus(function(){
		this.blur();
	});
});


//點擊_選項列表_滑出滑入效果JS
$(document).ready(function() {
    $(".top_menu").click(function() {
        $(this).toggleClass("active");
        $(".top_open").slideToggle();
    });
});