(async function () {

    // Base64
    // atob() converts binary to ASCII
    // btoa() converts ASCII to binary

    const loginPage = '/member_login.html';
    const checkLoginAPI = '/member/checkLogin';

    let token = localStorage.getItem('token') || '';

    if (token === '') {
        alert('請登入系統。');
        location.href = loginPage;
        return;
    }

    let requestHeaders = {
        'token': token
    };

    let fetchOptions = {
        method: 'GET',
        headers: new Headers(requestHeaders)
    };

    let response = await fetch(checkLoginAPI, fetchOptions);
    let json = await response.json();

    if (json.result === false) {
        alert('請登入系統。');
        window.location.href = 'loginPage';
    }

})();

function getTokenPayLoad() {

    let token = localStorage.getItem('token');
    let payLoad = token.split('.')[1];
    return atob(payLoad)
}


export {
    getTokenPayLoad
}