(async function () {

    let url = '/checkLogin';

    let token = localStorage.getItem('token') || '';

    let requestHeaders = {
        'token': token
    };

    let fetchOptions = {
        method: 'POST',
        headers: new Headers(requestHeaders)
    };

    let response = await fetch(url, fetchOptions);
    let result = await response.json();

    if (!result.isLogin) {
        alert('請登入系統。');
        location.href = '/login.html';
    }

    // 要不要同步執行呢??
})();