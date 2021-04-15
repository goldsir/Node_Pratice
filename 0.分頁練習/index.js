// action 還是 onclick 去呼叫函式 (兩個都不可能)
// 還是 監聽input裡面有沒有東西 再去呼叫函式 
// onchange 跟 addEventListener 去呼叫函式 有差別嗎 (沒有,建議前後端分開工作 用後者做好自己的工作就好)

//mdn網站有很多js文件資源， 可以往那邊查資料

let fileInput = document.getElementById('file-input');
let tbody = document.getElementById('tbody');
let contentData = [];
let currentPage = 1;
let pageSize = 15;
let loading = document.querySelector('.loading');
loading.style.display = 'none';

function getPagination(totalRows, pageSize, currentPage, listSize) {

    let totalPages = 0; //總頁數
    let startPage = 0;
    let endPage = 0;


    //計算總頁數
    if (totalRows === 0) {
        totalPages = 1;
    } else if (totalRows % pageSize == 0) {
        totalPages = totalRows / pageSize;
    } else {
        /*取地板值*/
        totalPages = Math.floor(totalRows / pageSize) + 1; //Math.floor() 回傳小於等於所給數字的最大整數
    }

    //防呆: 當前頁次超出總頁數
    if (currentPage > totalPages) {
        currentPage = totalPages;
    }

    if (totalPages <= listSize) {
        startPage = 1;
        endPage = totalPages;
    } else {

        startPage = currentPage - (listSize / 2) + 1;
        endPage = currentPage + (listSize / 2);

        if (startPage < 1) {
            startPage = 1;
            endPage = listSize;
        }

        if (endPage > totalPages) {
            endPage = totalPages;
            startPage = totalPages - (listSize - 1);
        }
    }

    let prePage = currentPage - 1 <= 0 ? 1 : currentPage - 1;
    let nextPage = currentPage + 1 > totalPages ? totalPages : currentPage + 1;

    return {
        currentPage
        , startPage
        , endPage
        , prePage
        , nextPage
    };
    
}

function printPagenum(pageIndex){

    currentPage = pageIndex;
    let totalRows = contentData.length;
    let listSize = 4;
    let pageInfo = getPagination(totalRows, pageSize, currentPage, listSize);

    let pageid = document.getElementById('pageid');
    let page_num = "";
    for (var p=pageInfo.startPage; p<=pageInfo.endPage; p++){
        if(p===pageInfo.currentPage){
            page_num += `<li onclick="changePage(${p})" class="selected">${p}</li>`; 
        }
        else{
            page_num += `<li onclick="changePage(${p})">${p}</li>`; 
        }
    }
    pageid.innerHTML = `
		<li onclick="changePage(${pageInfo.prePage})">上一頁</li>
			${page_num}
		<li onclick="changePage(${pageInfo.nextPage})">下一頁</li>
    `; 
}



function changePage(pageIndex){

    currentPage = pageIndex;

    tbody.innerHTML ='';
    let trStr = '';
    let startRow = pageSize*(currentPage-1);
    let endRow = (pageSize-1)+pageSize*(currentPage-1);

    if (startRow < 0){
        startRow = 0;
    }

    if (endRow >= contentData.length){
        endRow = contentData.length-1;
    }

    for (var a = startRow; a <= endRow; a++){

        let rowData = contentData[a].split(/[\s]/);
        let rowData_html = "";

        for (var i=0; i < rowData.length; i++){

            rowData_html += (`<td>${rowData[i]}</td>`);
        } 

        trStr += `<tr><td>${a+1}</td>${rowData_html}</tr>`;     
    }
    tbody.innerHTML = trStr;
    printPagenum(currentPage);
}

fileInput.addEventListener('change', function(e){

    let file = e.target.files[0];
    let reader = new FileReader();
    reader.readAsText(file,'utf-8');
    currentPage = 1;
    loading.style.display = 'block'; 

    reader.onload = function(e){

        let content = e.target.result;
        contentData = content.split(/[\n]/);
        document.getElementById('data_count').innerHTML = contentData.length;
        
        changePage(currentPage);
        printPagenum(currentPage);

        loading.style.display = 'none';
    }
})

    



//這樣東西讀進來了嗎
//讀進來了 還沒讓它顯示(有一個檔案 檔案裏面有什麼不知道)? 
// e.target.files[0] 針對事件目標file 參考層層解析
// https://www.cnblogs.com/lwwen/p/6210126.html

// FileReader 以非同步讀取用戶端檔案
// FileReader.onload 事件處理器於讀取完成時觸發
// FileReader.readAsText 編碼格式轉成字符串
// e.target.result 事件.目標.結果

//輸出表格
//先變成陣列? content.split(/[\n]/); 換行

//然後..... for迴圈打印陣列?
// 取得陣列長度 再用for迴圈
// for (var i=0; i<=array.長度-1; i++)
// array[i].split(/[\s]/)
// <td> i+1 </td>
// 再一個for迴圈打印每列資料 ?

// .innerHTML += 要"+"


// 每頁30筆資料 let pageSize = 30 
// 頁數:總筆數/30 餘數不是0 頁數+1 Math.ceil(總數/30)
// for a=0-29 30-59 ... +30*頁數-1 
// ↑用變數下去寫 別人讀程式比較好懂
// 數字直接寫在for裡面會變成 神秘數字

// 建議把顯示表格的畫面另外寫成一個函式
// 寫程式的時候可以優先把程式中具有高度共用性的部分抽取出來做一個獨立的function
// 降低整個程式碼的複雜度跟之後維護的痛苦程度


//return是跳出整個function
//break是跳出迴圈