// 手風琴伸縮下拉選單
$(function() {
    //設置DIV的高度跟隨屏幕變化而變化，類似於自適應
    //$(".inside").height(document.body.scrollHeight);

    //隱藏inside下所有class為sidebar_list2元件
    $(".inside .sidebar_list2").hide();

    //bind()為.inside li的li生成點擊事件
    $(".inside li").bind("click", function() {
        /** .netx() 括號內無代入任何元件(要縮回去則輸入ul)，所以無法獲取點擊縮回去的頁面資料
        slideToggle(300) 括號內為展開/關閉當前被點擊的ul元件速度，可輸入數字如"300"(數字越大越慢)，或"slow"、"normal"、"fast" **/
        $(this).next().slideToggle("300");
    })

})