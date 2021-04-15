let table_content = document.getElementById("tbody");

let loading = document.getElementsByClassName("loading")[0];
loading.style.display = "none";

let pages = document.getElementsByClassName("page-item")[0];
let file_input = document.getElementById("file-input");
const pageid = document.getElementById('pageid');
let data_count = document.getElementById("data_count");
let data_page = document.getElementById("data_page");
let data_nowpage = document.getElementById("data_nowpage");


let content = document.getElementById('content');
let pagePrev = document.getElementById("previous");
let pageNext = document.getElementById("next");

let datas = []; // 儲存log的陣列
let pageSize = 15; // 每一頁顯示10筆資料
let currentPage = 1; // 當前頁次

let pageTotal; // 總頁數

//
file_input.addEventListener("change", function (e) {

    var file = e.target.files[0];
    if (!file) {
        return;
    }

    table_content.innerHTML = ""; // 清空

    // 創建FileReader對象
    var reader = new FileReader();


    // load 回調
    reader.onload = function (e) {

        let contents = e.target.result;

        datas = contents.split("\n");

        //資料總筆數
        let totalRows = datas.length;

        if (datas.length === 0) {
            return alert('沒有資料');
        }

        //總頁數
        pageTotal = Math.ceil(totalRows / pageSize); //每頁10筆
        console.log('pageTotal ' + pageTotal);

        data_count.innerHTML = totalRows;
        data_page.innerHTML = pageTotal;
        data_nowpage.innerHTML = currentPage;

        Pagecontent(currentPage);
        loading.style.display = "none";
    };
    // 讀取文件
    reader.readAsText(file, "utf-8");
    loading.style.display = "none";
});

//分頁內容
let Pagecontent = function (pageIndex) {

    if (pageIndex < 1) {
        pageIndex = 1;
    }

    if (pageIndex > pageTotal) {
        pageIndex = pageTotal;
    }

    currentPage = pageIndex;

	
    let minData = (pageIndex - 1) * pageSize; //最小筆數
    let maxData = pageIndex * pageSize - 1; //最大筆數


	if(minData < 0) {
		minData = 0;
	}

	if(maxData >= datas.length){
		maxData = datas.length - 1;
	}

    var str = "";
    let arrayCol = "";
    for (let index = minData; index <= maxData; index++) {

        //let arrayCol = datas[index].split(" ");
        if (datas[index] != undefined) {
            arrayCol = datas[index].split(" ");
            // console.log("datas[index]");
            // console.log(datas[index]);
        }

        let maxLength = 0;

        if (arrayCol.length > maxLength) {
            maxLength = arrayCol.length;
			
		    str += `<tr>`;
            for (let i = 0; i < arrayCol.length; i++) {
                // console.log(datas[index]);
                let number = i % 6;
                if (number === 0) {
                  
                    str += `<td class="text-center">${index+1}</td>`;
                    str += `<td class="text-center">${arrayCol[i]}</td>`;
                } else if (number === 3) {
                    str += `<td class="url_">${arrayCol[i]}</td>`;

                } else if (number === 5) {
                    str += `<td class="">${arrayCol[i]}</td>`;
                   
                } else {
                    if (i === 4) {
                        str += `<td class="text-end">${arrayCol[i]}</td>`;
                    } else {
                        str += `<td class="text-center">${arrayCol[i]}</td>`;
                    }
                }
            }
			str += `</tr>`;
        }
    }
	


//分頁頁碼
	
    var str1 = '';
    let next_control = "";
    let previous_control = "";

    if (currentPage == 1) {
        next_control = true;
        console.log("i=> " + currentPage + " 下一頁");
        console.log("pageTotal=" + pageTotal);
        str1 += `<li class="page-item active"><a class="page-link" aria-current="page" href="#" data-page="${currentPage}">${currentPage}</a></li>`;
        str1 += `<li class="page-item"><a class="page-link page_current" href="#" data-page="${currentPage+1}">${currentPage+1}</a></li>`;
        str1 += `<li class="page-item"><a class="page-link page_current" href="#" data-page="${currentPage+2}">${currentPage+2}</a></li>`;
        str1 += `<li class="page-item"><a class="page-link page_current" href="#" data-page="${currentPage+3}">${currentPage+3}</a></li>`;
        str1 += `<li class="page-item"><a class="page-link page_current" href="#" data-page="${currentPage+4}">${currentPage+4}</a></li>`;
        str1 += `<li class="page-item"><a class="page-link" href="#" id="next">Next</a></li>`;
    } else if (currentPage == pageTotal) {
        previous_control = true;
        console.log("上一頁 " + " i=> " + currentPage);
        console.log("pageTotal=" + pageTotal);
        str1 += `<li class="page-item active"><a class="page-link" href="#" id="previous">Previous</a></li>`;
        str1 += `<li class="page-item"><a class="page-link page_current" href="#" data-page="${currentPage-4}">${currentPage-1}</a></li>`;
        str1 += `<li class="page-item"><a class="page-link page_current" href="#" data-page="${currentPage-3}">${currentPage-2}</a></li>`;
        str1 += `<li class="page-item"><a class="page-link page_current" href="#" data-page="${currentPage-2}">${currentPage-3}</a></li>`;
        str1 += `<li class="page-item"><a class="page-link page_current" href="#" data-page="${currentPage-1}">${currentPage-4}</a></li>`;
        str1 += `<li class="page-item"><a class="page-link" href="#" data-page="${currentPage}">${currentPage}</a></li>`;
    } else if (currentPage < pageTotal) {
        // if (currentPage >= (pageTotal-4)) {
        next_control = true;
        previous_control = true;
        console.log("上一頁 " + " i=> " + currentPage + " 下一頁 ");
        console.log("pageTotal=" + pageTotal);
        str1 += `<li class="page-item"><a class="page-link" href="#" id="previous">Previous</a></li>`;
        str1 += `<li class="page-item active"><a class="page-link" href="#" data-page="${currentPage}">${currentPage}</a></li>`;
        str1 += `<li class="page-item"><a class="page-link page_current" href="#" data-page="${currentPage+1}">${currentPage+1}</a></li>`;
        str1 += `<li class="page-item"><a class="page-link page_current" href="#" data-page="${currentPage+2}">${currentPage+2}</a></li>`;
        str1 += `<li class="page-item"><a class="page-link page_current" href="#" data-page="${currentPage+3}">${currentPage+3}</a></li>`;
        str1 += `<li class="page-item"><a class="page-link page_current" href="#" data-page="${currentPage+4}">${currentPage+4}</a></li>`;
        str1 += `<li class="page-item"><a class="page-link" href="#" id="next">Next</a></li>`;
        // }

    }else{
        currentPage = pageTotal;
        next_control = true;
        previous_control = true;
        console.log("上一頁 " + " i=> " + currentPage + " 下一頁 ");
        console.log("pageTotal=" + pageTotal);
        str1 += `<li class="page-item"><a class="page-link" href="#" id="previous">Previous</a></li>`;
        str1 += `<li class="page-item active"><a class="page-link" href="#" data-page="${currentPage}">${currentPage}</a></li>`;
        str1 += `<li class="page-item"><a class="page-link page_current" href="#" data-page="${currentPage+1}">${currentPage+1}</a></li>`;
        str1 += `<li class="page-item"><a class="page-link page_current" href="#" data-page="${currentPage+2}">${currentPage+2}</a></li>`;
        str1 += `<li class="page-item"><a class="page-link page_current" href="#" data-page="${currentPage+3}">${currentPage+3}</a></li>`;
        str1 += `<li class="page-item"><a class="page-link page_current" href="#" data-page="${currentPage+4}">${currentPage+4}</a></li>`;
        str1 += `<li class="page-item"><a class="page-link" href="#" id="next">Next</a></li>`;
    }
    console.log("currentPage=>" + currentPage);
    pageid.innerHTML = str1;
    table_content.innerHTML = str;
    data_nowpage.innerHTML = currentPage;

    console.log("next_control=" + next_control);
    console.log("previous_control=" + previous_control);

    // console.log("currentPage="+currentPage);
    if (next_control) {
        let next = document.getElementById("next");
        next.addEventListener("click", function (e) {
            Pagecontent(currentPage + 1);
        })
    }

    if (previous_control) {
        let previous = document.getElementById("previous");
        previous.addEventListener("click", function (e) {
            Pagecontent(currentPage - 1);
        })
    }

    let page_current = document.getElementsByClassName("page_current");

    for (let i = 0; i < page_current.length; i++) {

        page_current[i].addEventListener("click", function (e) {
            str="";
            Pagecontent(currentPage + 1 + i );
            console.log("click");
        })
    }
}