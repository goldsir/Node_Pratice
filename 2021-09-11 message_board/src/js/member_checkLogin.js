(async function () {

    let token = localStorage.getItem('token') || '';

    if (token === '') {
        alert('請登入系統。');
        location.href = '/member_login.html';
        return;
    }

    let url = '/member/checkLogin';

    let requestHeaders = {
        'token': token
    };

    let fetchOptions = {
        method: 'GET',
        headers: new Headers(requestHeaders)
    };

    let response = await fetch(url, fetchOptions);
    let json = await response.json();

    if (json.result === false) {
        alert('請登入系統。');
        location.href = '/member_login.html';
    }

})();