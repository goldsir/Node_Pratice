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
    let json = await response.json();

    if (!json.result) {
        alert('請登入系統。');
        location.href = '/login.html';
    }

})();